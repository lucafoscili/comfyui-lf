import { DisplayJSONAdapter } from '../helpers/displayJson';
import { LoadImagesAdapter } from '../helpers/loadImages';
import { SwitchImageAdapter } from '../helpers/switchImage';
import { SwitchIntegerAdapter } from '../helpers/switchInteger';
import { SwitchJSONAdapter } from '../helpers/switchJson';
import { SwitchStringAdapter } from '../helpers/switchString';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
class LFManager {
  #CSS_EMBEDDED: Set<string>;
  #DEBUG = false;
  #EXT_PREFIX = 'LFExtension_';
  #NODES_DICT: NodeDictionary = {
    displayJson: DisplayJSONAdapter(),
    loadImages: LoadImagesAdapter(),
    switchImage: SwitchImageAdapter(),
    switchInteger: SwitchIntegerAdapter(),
    switchJson: SwitchJSONAdapter(),
    switchString: SwitchStringAdapter(),
  };

  constructor() {
    this.#CSS_EMBEDDED = new Set();

    for (const key in this.#NODES_DICT) {
      if (Object.prototype.hasOwnProperty.call(this.#NODES_DICT, key)) {
        const node = this.#NODES_DICT[key];
        const name = this.#EXT_PREFIX + key;
        if (node.eventName === 'lf-loadimages') {
          this.#embedCss(key);
          app.registerExtension({
            name,
            getCustomWidgets: node.getCustomWidgets,
          });
        } else {
          app.registerExtension({
            name,
          });
        }
        api.addEventListener(node.eventName, node.eventCb);
      }
    }
  }

  #embedCss(filename: string) {
    if (!this.#CSS_EMBEDDED.has(filename)) {
      const link = document.createElement('link');
      link.dataset.filename = 'filename';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'extensions/comfyui-lf/css/' + filename + '.css';
      document.head.appendChild(link);
      this.#CSS_EMBEDDED.add(filename);
    }
  }

  getDebug() {
    return this.#DEBUG;
  }

  log(message: string) {
    if (this.#DEBUG) {
      console.log(message);
    }
  }

  toggleDebug() {
    this.#DEBUG = !this.#DEBUG;
    return this.#DEBUG;
  }
}

if (!window.lfManager) {
  window.lfManager = new LFManager();
}
