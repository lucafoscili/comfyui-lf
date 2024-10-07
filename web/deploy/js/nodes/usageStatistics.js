import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager, refreshChart } from '../utils/common.js';
const NAME = NodeName.usageStatistics;
export const usageStatisticsFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.updateUsageStatistics;
        getLFManager().log(`Event '${name}' received (UsageStatistics mirror)`, { event }, LogSeverity.Info);
        const payload = event.detail;
        const triggerNode = getApiRoutes().getNodeById(payload.id);
        const nodes = triggerNode?.graph?._nodes || [];
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            if (node?.comfyClass === NAME) {
                const widget = getCustomWidget(node, CustomWidgetName.tabBarChart, addW);
                widget.options.refresh(widget.element);
                getApiRoutes().redraw();
            }
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
                        addW(node, CustomWidgetName.tabBarChart);
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
