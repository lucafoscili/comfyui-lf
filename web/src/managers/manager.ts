import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/utils.js';
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export interface LFWindow extends Window {
  lfManager: LFManager;
}

export class LFManager {
  #CSS_EMBEDS: Set<string>;
  #DEBUG = false;
  #DOM = document.documentElement as KulDom;
  #MANAGERS: {
    ketchupLite?: KulManager;
    nodes?: LFNodes;
    widgets?: LFWidgets;
  } = {};

  APIS: {
    event: (name: EventNames, callback: (event: CustomEvent<BaseEventPayload>) => void) => void;
    redraw: () => void;
    register: (extension: Extension) => void;
  } = {
    event: (name, callback) => {
      api.addEventListener(name, callback);
    },
    redraw: () => {
      app.graph.setDirtyCanvas(true, false);
    },
    register: (extension: Extension) => {
      app.registerExtension(extension);
    },
  };
  CONTROL_PANEL: ControlPanelDictionary;

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

    this.#CSS_EMBEDS = new Set(['controlPanel', 'displayJson', 'imageHistogram', 'loadImages']);
    this.#MANAGERS.nodes = new LFNodes();
    this.#MANAGERS.widgets = new LFWidgets();
    this.#embedCss();
  }

  #embedCss() {
    const cssFiles = Array.from(this.#CSS_EMBEDS);

    for (const cssFileName of cssFiles) {
      const link = document.createElement('link');
      link.dataset.filename = cssFileName;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `extensions/comfyui-lf/css/${cssFileName}.css`;
      document.head.appendChild(link);
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

  initialize() {
    const widgets = {
      controlPanel: {
        add: this.#MANAGERS.widgets.add.controlPanel,
        set: this.#MANAGERS.widgets.set.controlPanel,
      },
    };
    this.#MANAGERS.nodes.register.controlPanel(widgets.controlPanel.set, widgets.controlPanel.add);
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
  WINDOW.lfManager.initialize();
}
