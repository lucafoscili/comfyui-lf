import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { ControlPanelAdapter } from '../helpers/controlPanel.js';
import { DisplayJSONAdapter } from '../helpers/displayJson.js';
import { ImageHistogramAdapter } from '../helpers/imageHistogram.js';
import { LoadImagesAdapter } from '../helpers/loadImages.js';
import { SwitchImageAdapter } from '../helpers/switchImage.js';
import { SwitchIntegerAdapter } from '../helpers/switchInteger.js';
import { SwitchJSONAdapter } from '../helpers/switchJson.js';
import { SwitchStringAdapter } from '../helpers/switchString.js';
import { defineCustomElements } from '../ketchup-lite/loader';
import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { getKulManager } from '../utils/utils.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

class LFManager {
  #CSS_EMBEDDED: Set<string>;
  #DEBUG = false;
  #DOM = document.documentElement as KulDom;
  #EXT_PREFIX = 'LFExtension_';
  #KUL_MANAGER: KulManager;
  #NODES_DICT: NodeDictionary = {
    controlPanel: ControlPanelAdapter(),
    displayJson: DisplayJSONAdapter(),
    imageHistogram: ImageHistogramAdapter(),
    loadImages: LoadImagesAdapter(),
    switchImage: SwitchImageAdapter(),
    switchInteger: SwitchIntegerAdapter(),
    switchJson: SwitchJSONAdapter(),
    switchString: SwitchStringAdapter(),
  };

  constructor() {
    const managerCb = () => {
      this.#KUL_MANAGER = getKulManager();
      this.log('KulManager ready', { kulManager: this.#KUL_MANAGER }, 'success');
      document.removeEventListener('kul-manager-ready', managerCb);
    };
    this.#DOM.ketchupLiteInit = {
      assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
    };
    document.addEventListener('kul-manager-ready', managerCb);
    defineCustomElements(window);
    this.#CSS_EMBEDDED = new Set();

    for (const key in this.#NODES_DICT) {
      if (Object.prototype.hasOwnProperty.call(this.#NODES_DICT, key)) {
        const node = this.#NODES_DICT[key];
        const hasbeforeRegisterNodeDef = !!node.beforeRegisterNodeDef;
        const hasCustomWidgets = !!node.getCustomWidgets;
        const extension: Extension = {
          name: this.#EXT_PREFIX + key,
        };
        if (hasbeforeRegisterNodeDef) {
          extension.beforeRegisterNodeDef = node.beforeRegisterNodeDef;
        }
        if (hasCustomWidgets) {
          extension.getCustomWidgets = node.getCustomWidgets;
          this.#embedCss(key);
        }
        app.registerExtension(extension);
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

  isDebug() {
    return this.#DEBUG;
  }

  log(message: string, args?: Record<string, unknown>, severity: LogSeverity = 'info') {
    if (!this.#DEBUG) {
      return;
    }
    let colorCode = '';

    switch (severity) {
      case 'success':
        colorCode = '\x1b[32m'; // Green
        break;
      case 'warning':
        colorCode = '\x1b[33m'; // Yellow
        break;
      case 'error':
        colorCode = '\x1b[31m'; // Red
        break;
      default:
        colorCode = '\x1b[0m'; // Reset to default
        break;
    }

    const resetColorCode = '\x1b[0m';
    const dot = '•';

    console.log(`${colorCode}${dot} ${message} ${resetColorCode}`, args);
  }

  toggleDebug() {
    this.#DEBUG = !this.#DEBUG;
    return this.#DEBUG;
  }
}

if (!window.lfManager) {
  window.lfManager = new LFManager();
  window.lfManager.log('LFManager ready', { lfManager: window.lfManager }, 'success');
}
