import { EventName, ImageHistogramPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { Extension, NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type TabBarChartWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager, refreshChart } from '../utils/common';

const NAME = NodeName.imageHistogram;

export const imageHistogramFactory = {
  eventHandler: (
    event: CustomEvent<ImageHistogramPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.tabBarChart>,
  ) => {
    const name = EventName.imageHistogram;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const triggerNode = getApiRoutes().getNodeById(payload.id);
    const nodes = triggerNode?.graph?._nodes || [];
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (node?.comfyClass === NAME) {
        const widget = getCustomWidget(node, CustomWidgetName.tabBarChart, addW);
        widget.options.setValue(JSON.stringify(payload.datasets));
        getApiRoutes().redraw();
      }
    }
  },
  register: (
    setW: TabBarChartWidgetSetter,
    addW: BaseWidgetCallback<CustomWidgetName.tabBarChart>,
  ) => {
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
