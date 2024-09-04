import { EventName, ImageHistogramPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { Extension, NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type ChartWidgetsSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.imageHistogram;

export const imageHistogramFactory = {
  eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.imageHistogram;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.chart, addW);
      const comp = widget.options.getComp();
      comp.refresh();
      widget.options.setValue(event.detail.dataset);
      getApiRoutes().redraw();
    }
  },
  register: (
    setW: ChartWidgetsSetter,
    addW: BaseWidgetCallback,
    resizeHandlerW: (node: NodeType) => void,
  ) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.chart);
            return r;
          };
          const onResize = nodeType.prototype.onResize;
          nodeType.prototype.onResize = function () {
            const r = onResize?.apply(this, arguments);
            const node = this;
            resizeHandlerW(node);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
