import { EventName, KeywordCounterPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { Extension, NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type CountBarChartWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager, refreshChart } from '../utils/common';

const NAME = NodeName.keywordCounter;

export const keywordCounterFactory = {
  eventHandler: (
    event: CustomEvent<KeywordCounterPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.countBarChart>,
  ) => {
    const name = EventName.keywordCounter;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.countBarChart, addW);
      widget.options.setValue(JSON.stringify(event.detail));
      getApiRoutes().redraw();
    }
  },
  register: (
    setW: CountBarChartWidgetSetter,
    addW: BaseWidgetCallback<CustomWidgetName.countBarChart>,
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
