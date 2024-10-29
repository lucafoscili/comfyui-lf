import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.sequentialSeedsGenerator;
export const sequentialSeedsGeneratorFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.sequentialSeedsGenerator;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);
        const payload = event.detail;
        const isHistoryEnabled = payload.isHistoryEnabled;
        const node = getApiRoutes().getNodeById(payload.id);
        if (isHistoryEnabled && node) {
            const list = getCustomWidget(node, CustomWidgetName.history, addW);
            if (list) {
                const value = payload.value;
                const strValue = String(value).valueOf();
                const comp = list.options.getComp();
                const dataset = comp.kulData;
                if (strValue) {
                    const newNode = {
                        icon: 'history',
                        id: strValue,
                        description: 'Execution date: ' + new Date().toLocaleString() + '.',
                        value,
                    };
                    if (dataset) {
                        const existingNode = dataset?.nodes?.find((n) => n.id === strValue);
                        if (existingNode) {
                            existingNode.description = newNode.description;
                            comp.refresh();
                        }
                        else {
                            comp.kulData = {
                                columns: dataset.columns,
                                nodes: dataset?.nodes ? [...dataset?.nodes, newNode] : [newNode],
                            };
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
