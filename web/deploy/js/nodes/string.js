import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.string;
export const stringFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.string;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const list = getCustomWidget(node, CustomWidgetName.history, addW);
            if (list) {
                const value = payload.value;
                const comp = list.options.getComp();
                const dataset = comp.kulData;
                if (value) {
                    const newNode = {
                        icon: 'history',
                        id: value,
                        description: 'Execution date: ' + new Date().toLocaleString() + '.',
                        value,
                    };
                    if (dataset) {
                        const existingNode = dataset?.nodes?.find((n) => n.id === value);
                        if (existingNode) {
                            existingNode.description = newNode.description;
                            comp.refresh();
                        }
                        else {
                            comp.kulData = { columns: dataset.columns, nodes: [...dataset.nodes, newNode] };
                        }
                    }
                    else {
                        comp.kulData = { nodes: [newNode] };
                    }
                }
            }
            getApiRoutes().redraw();
        }
    },
    register: (setW, addW) => {
        const extension = {
            name: 'LFExt_' + NAME,
            beforeRegisterNodeDef: async (nodeType) => {
                if (nodeType.comfyClass === NAME) {
                    const onNodeCreated = nodeType.prototype.onNodeCreated;
                    nodeType.prototype.onNodeCreated = function () {
                        const r = onNodeCreated?.apply(this, arguments);
                        const node = this;
                        addW(node, CustomWidgetName.history);
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
