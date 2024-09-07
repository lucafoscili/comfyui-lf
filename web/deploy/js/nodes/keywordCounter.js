import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager, refreshChart } from '../utils/common.js';
const NAME = NodeName.keywordCounter;
export const keywordCounterFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.keywordCounter;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const widget = getCustomWidget(node, CustomWidgetName.countBarChart, addW);
            const comp = widget.options.getComp();
            comp.refresh();
            widget.options.setValue(event.detail.dataset);
            getApiRoutes().redraw();
        }
    },
    register: (setW, addW) => {
        const extension = {
            name: 'LFExt_' + NAME,
            beforeRegisterNodeDef: async (nodeType) => {
                if (nodeType.comfyClass === NAME) {
                    const onDrawBackground = nodeType.prototype.onDrawBackground;
                    nodeType.prototype.onDrawBackground = function () {
                        const r = onDrawBackground?.apply(this, arguments);
                        const node = this;
                        refreshChart(node);
                        return r;
                    };
                    const onNodeCreated = nodeType.prototype.onNodeCreated;
                    nodeType.prototype.onNodeCreated = function () {
                        const r = onNodeCreated?.apply(this, arguments);
                        const node = this;
                        addW(node, CustomWidgetName.countBarChart);
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
