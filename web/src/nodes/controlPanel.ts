import { NodeName, type Extension } from '../types/nodes';
import type { BaseWidgetCallback, ControlPanelWidgetsSetter } from '../types/widgets';
import { getApiRoutes } from '../utils/utils';

const NAME = NodeName.controlPanel;

export const controlPanelFactory = {
  register: (setW: ControlPanelWidgetsSetter, addW: BaseWidgetCallback) => {
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
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
