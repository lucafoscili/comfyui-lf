import { LFWidgets } from './widgets.js';
import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { DisplayJSONAdapter } from '../helpers/displayJson.js';
import { ImageHistogramAdapter } from '../helpers/imageHistogram.js';
import { LoadImagesAdapter } from '../helpers/loadImages.js';
import { SwitchImageAdapter } from '../helpers/switchImage.js';
import { SwitchIntegerAdapter } from '../helpers/switchInteger.js';
import { SwitchJSONAdapter } from '../helpers/switchJson.js';
import { SwitchStringAdapter } from '../helpers/switchString.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/utils.js';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export interface LFWindow extends Window {
  lfManager: LFManager;
}

export class LFManager {
  #CSS_EMBEDDED: Set<string>;
  #DEBUG = false;
  #DOM = document.documentElement as KulDom;
  #EXT_PREFIX = 'LFExtension_';
  #MANAGERS: {
    ketchupLite?: KulManager;
    widgets?: LFWidgets;
  } = {};
  #NODES_DICT: NodeDictionary = {
    controlPanel: null,
    displayJson: DisplayJSONAdapter(),
    imageHistogram: ImageHistogramAdapter(),
    loadImages: LoadImagesAdapter(),
    switchImage: SwitchImageAdapter(),
    switchInteger: SwitchIntegerAdapter(),
    switchJson: SwitchJSONAdapter(),
    switchString: SwitchStringAdapter(),
  };

  CONTROL_PANEL: ControlPanelDictionary;

  constructor() {
    const managerCb = () => {
      this.#MANAGERS.ketchupLite = getKulManager();
      this.log('KulManager ready', { kulManager: this.#MANAGERS.ketchupLite }, 'success');
      document.removeEventListener('kul-manager-ready', managerCb);
    };
    this.#DOM.ketchupLiteInit = {
      assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
    };
    document.addEventListener('kul-manager-ready', managerCb);
    defineCustomElements(window);

    this.#CSS_EMBEDDED = new Set();
    this.#MANAGERS.widgets = new LFWidgets();
    this.CONTROL_PANEL = {
      cssName: 'controlPanel',
      eventName: 'lf-controlpanel',
      nodeName: 'LF_ControlPanel',
      widgetName: 'KUL_CONTROL_PANEL',
    };

    for (const key in this.#NODES_DICT) {
      if (Object.prototype.hasOwnProperty.call(this.#NODES_DICT, key)) {
        const node = this.#NODES_DICT[key];
        switch (key) {
          case 'controlPanel':
            this.#embedCss(key);
            this.#registerControlPanel();
            break;
          default:
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
            break;
        }
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

  #registerControlPanel() {
    const self = this;

    const extension: ControlPanelExtension = {
      name: this.#EXT_PREFIX + this.CONTROL_PANEL.nodeName,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === this.CONTROL_PANEL.nodeName) {
          nodeType.prototype.flags = nodeType.prototype.flags || {};
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            self.#MANAGERS.widgets.create.controlPanel(node);
            return r;
          };
        }
      },
      getCustomWidgets: () => {
        return this.#MANAGERS.widgets.get.controlPanel();
      },
    };

    app.registerExtension(extension);
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

  toggleDebug(value?: boolean) {
    if (value === false || value === true) {
      this.#DEBUG = value;
    } else {
      this.#DEBUG = !this.#DEBUG;
    }
    this.log(`Debug active: '${this.#DEBUG}'`, {}, 'warning');

    return this.#DEBUG;
  }
}

const WINDOW = window as unknown as LFWindow;

if (!WINDOW.lfManager) {
  WINDOW.lfManager = new LFManager();
  WINDOW.lfManager.log('LFManager ready', { lfManager: WINDOW.lfManager }, 'success');
}
