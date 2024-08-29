import type { Extension, NodeNames } from '../types/nodes';
import type { BaseWidgetCallback, ChartWidgetsSetter } from '../types/widgets';
import { getApiRoutes } from '../utils/utils';

const NAME: NodeNames = 'LF_ImageHistogram';

export const imageHistogramFactory = {
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
            addW(node, NAME);
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
