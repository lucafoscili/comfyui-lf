import { EventName, UpdateUsageStatisticsPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  TabBarChartWidgetSetter,
  type BaseWidgetCallback,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager, refreshChart } from '../utils/common';

const NAME = NodeName.usageStatistics;

export const usageStatisticsFactory = {
  eventHandler: (event: CustomEvent<UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.updateUsageStatistics;
    getLFManager().log(
      `Event '${name}' received (UsageStatistics mirror)`,
      { event },
      LogSeverity.Info,
    );

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
  register: (setW: TabBarChartWidgetSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
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
