import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/utils.js';
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';
import { LFEvents } from './events.js';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export interface LFWindow extends Window {
  lfManager: LFManager;
}

export class LFManager {
  #APIS: ComfyAPIs = {
    event: (name, callback) => {
      api.addEventListener(name, callback);
    },
    getNodeById: (id: string) => {
      return app.graph.getNodeById(+(id || app.runningNodeId));
    },
    redraw: () => {
      app.graph.setDirtyCanvas(true, false);
    },
    register: (extension: Extension) => {
      app.registerExtension(extension);
    },
  };
  #CSS_EMBEDS = ['controlPanel', 'displayJson', 'imageHistogram', 'loadImages'];
  #DEBUG = false;
  #DOM = document.documentElement as KulDom;
  #MANAGERS: {
    events?: LFEvents;
    ketchupLite?: KulManager;
    nodes?: LFNodes;
    widgets?: LFWidgets;
  } = {};

  constructor() {
    const managerCb = async () => {
      this.#MANAGERS.ketchupLite = getKulManager();
      this.log('KulManager ready', { kulManager: this.#MANAGERS.ketchupLite }, 'success');
      document.removeEventListener('kul-manager-ready', managerCb);
    };
    this.#DOM.ketchupLiteInit = {
      assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
    };
    document.addEventListener('kul-manager-ready', managerCb);
    defineCustomElements(window);

    this.#MANAGERS.nodes = new LFNodes();
    this.#MANAGERS.widgets = new LFWidgets();
    this.#MANAGERS.events = new LFEvents();

    for (let index = 0; index < this.#CSS_EMBEDS.length; index++) {
      const cssFileName = this.#CSS_EMBEDS[index];
      const link = document.createElement('link');
      link.dataset.filename = cssFileName.toString();
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `extensions/comfyui-lf/css/${cssFileName}.css`;
      document.head.appendChild(link);
    }
  }

  getApiRoutes(): ComfyAPIs {
    return this.#APIS;
  }

  initialize() {
    const events = this.#MANAGERS.events.get;
    const widgets = this.#MANAGERS.widgets.get;

    this.#MANAGERS.nodes.register.controlPanel(
      widgets.setters.controlPanel,
      widgets.adders.controlPanel,
    );

    this.#MANAGERS.nodes.register.displayJson(widgets.setters.code, widgets.adders.code);
    this.#APIS.event('lf-displayjson', (e: CustomEvent<DisplayJSONPayload>) => {
      events.eventHandlers.displayJson(e, widgets.adders.code);
    });
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
    const dot = '• LF Nodes •';

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
  WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, 'success');
  WINDOW.lfManager.initialize();
}
