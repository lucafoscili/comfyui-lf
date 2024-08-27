import { getLFManager } from '../utils/utils';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  #EXT_PREFIX = 'LFExtension_';
  NAMES = {
    controlPanel: 'LF_ControlPanel',
    displayJson: 'LF_DisplayJSON',
    imageHistogram: 'LF_ImageHistogram',
    loadImages: 'LF_LoadImages',
    switchImage: 'LF_SwitchImage',
    switchInteger: 'LF_SwitchInteger',
    switchJSON: 'LF_SwitchJSON',
    switchString: 'LF_SwitchString',
  };

  constructor() {}

  register = {
    controlPanel: (set_w: ControlPanelWidgetsSetter, add_w: ControlPanelWidgetCallback) => {
      const name = this.#EXT_PREFIX + this.NAMES.controlPanel;
      const extension: ControlPanelExtension = {
        name: this.#EXT_PREFIX + this.NAMES.controlPanel,
        beforeRegisterNodeDef: async (nodeType) => {
          if (nodeType.comfyClass === this.NAMES.controlPanel) {
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
      getLFManager().APIS.register(extension);
    },
  };
}
