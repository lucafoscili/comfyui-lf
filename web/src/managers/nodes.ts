import { NODE_NAMES_MAP } from '../utils/constants';
import { getApiRoutes } from '../utils/utils';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  #EXT_PREFIX = 'LFExtension_';
  #NAMES: NodeNamesMap;

  constructor() {
    this.#NAMES = NODE_NAMES_MAP;
  }

  register = {
    controlPanel: (set_w: ControlPanelWidgetsSetter, add_w: ControlPanelWidgetCallback) => {
      const name = this.#EXT_PREFIX + this.#NAMES.controlPanel;
      const extension: ControlPanelExtension = {
        name: this.#EXT_PREFIX + this.#NAMES.controlPanel,
        beforeRegisterNodeDef: async (nodeType) => {
          if (nodeType.comfyClass === this.#NAMES.controlPanel) {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
              const r = onNodeCreated?.apply(this, arguments);
              const node = this;
              add_w(node, name);
              return r;
            };
          }
        },
        getCustomWidgets: set_w,
      };
      getApiRoutes().register(extension);
    },
  };
}
