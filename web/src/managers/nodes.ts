import { getApiRoutes } from '../utils/utils';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  #EXT_PREFIX = 'LFExtension_';
  #NAMES: { [index: string]: NodeNames } = {
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

  #getExtName(name: NodeNames) {
    return this.#EXT_PREFIX + name;
  }

  register = {
    controlPanel: (setW: ControlPanelWidgetsSetter, addW: WidgetCallback) => {
      const name = this.#NAMES.controlPanel;
      const extension: ControlPanelExtension = {
        name: this.#getExtName(name),
        beforeRegisterNodeDef: async (nodeType) => {
          if (nodeType.comfyClass === name) {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
              const r = onNodeCreated?.apply(this, arguments);
              const node = this;
              addW(node, name);
              return r;
            };
          }
        },
        getCustomWidgets: setW,
      };
      getApiRoutes().register(extension);
    },
    displayJson: (setW: DisplayJSONWidgetsSetter, addW: WidgetCallback) => {
      const name = this.#NAMES.displayJson;
      const extension: Extension = {
        name: this.#getExtName(name),
        beforeRegisterNodeDef: async (nodeType) => {
          if (nodeType.comfyClass === name) {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
              const r = onNodeCreated?.apply(this, arguments);
              const node = this;
              addW(node, name);
              return r;
            };
          }
        },
        getCustomWidgets: setW,
      };
      getApiRoutes().register(extension);
    },
  };
}
