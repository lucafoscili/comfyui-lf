import { EventName, ImageHistogramPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { Extension, NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type HistogramWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager, refreshChart } from '../utils/common';

const NAME = NodeName.imageHistogram;

export const imageHistogramFactory = {
  eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.imageHistogram;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.histogram, addW);
      const comp = widget.options.getComp();
      comp.refresh();
      widget.options.setValue(JSON.stringify(event.detail.dataset));
      getApiRoutes().redraw();
    }
  },
  register: (setW: HistogramWidgetSetter, addW: BaseWidgetCallback) => {
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
            addW(node, CustomWidgetName.histogram);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
