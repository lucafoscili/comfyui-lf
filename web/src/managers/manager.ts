import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFWidgets } from './widgets.js';
import { EventName } from '../types/events/events.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { LFTooltip } from './tooltip';
import { KulDataDataset } from '../types/ketchup-lite/components.js';
import { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { CustomWidgetName, NodeName } from '../types/widgets/_common.js';
import {
  getLogStyle,
  NODE_WIDGET_MAP,
  onConnectionsChange,
  onDrawBackground,
  onNodeCreated,
} from '../helpers/manager.js';
import { APIRoutes } from '../types/api/api.js';
import {
  CustomWidgetGetter,
  Extension,
  ExtensionCallback,
  LogSeverity,
} from '../types/manager/manager.js';
import { ANALYTICS_API } from '../api/analytics.js';
import { BACKUP_API } from '../api/backup.js';
import { IMAGE_API } from '../api/image.js';
import { JSON_API } from '../api/json.js';
import { METADATA_API } from '../api/metadata.js';

export interface LFWindow extends Window {
  comfyAPI: ComfyUI;
  lfManager: LFManager;
}

export class LFManager {
  #APIS: APIRoutes = {
    analytics: ANALYTICS_API,
    backup: BACKUP_API,
    image: IMAGE_API,
    json: JSON_API,
    metadata: METADATA_API,
    comfyUi: () => (window as unknown as LFWindow).comfyAPI,
    event: (name, callback) => {
      api.addEventListener(name, callback);
    },
    fetch: async (body) => {
      return await api.fetchApi('/upload/image', {
        method: 'POST',
        body,
      });
    },
    getLinkById: (id: string) => {
      return app.graph.links[String(id).valueOf()];
    },
    getNodeById: (id: string) => {
      return app.graph.getNodeById(+(id || app.runningNodeId));
    },
    getResourceUrl: (subfolder, filename, type = 'output') => {
      const params = [
        'filename=' + encodeURIComponent(filename),
        'type=' + type,
        'subfolder=' + subfolder,
        app.getRandParam().substring(1),
      ].join('&');
      return `/view?${params}`;
    },
    interrupt: () => {
      return api.interrupt();
    },
    queuePrompt: async () => {
      app.queuePrompt(0);
    },
    redraw: () => {
      app.graph.setDirtyCanvas(true, false);
    },
    register: (extension: Extension) => {
      app.registerExtension(extension);
    },
  };
  #AUTOMATIC_BACKUP = true;
  #CACHED_DATASETS: { usage: KulDataDataset } = {
    usage: null,
  };
  #DEBUG = false;
  #DEBUG_ARTICLE: HTMLKulArticleElement;
  #DEBUG_DATASET: KulArticleNode[];
  #DOM = document.documentElement as KulDom;
  #INITIALIZED = false;
  #MANAGERS: {
    ketchupLite?: KulManager;
    tooltip?: LFTooltip;
    widgets?: LFWidgets;
  } = {};

  constructor() {
    const managerCb = async () => {
      this.#MANAGERS.ketchupLite = getKulManager();
      this.log('KulManager ready', { kulManager: this.#MANAGERS.ketchupLite }, LogSeverity.Success);
      document.removeEventListener('kul-manager-ready', managerCb);
    };
    this.#DOM.ketchupLiteInit = {
      assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
    };
    document.addEventListener('kul-manager-ready', managerCb);
    defineCustomElements(window);

    this.#MANAGERS.tooltip = new LFTooltip();
    this.#MANAGERS.widgets = new LFWidgets();
  }
  //#region Initialize
  initialize() {
    if (this.#INITIALIZED) {
      this.log(
        'Attempt to initialize LFManager when already ready!',
        { LFManager: this },
        LogSeverity.Warning,
      );
      return;
    }

    for (const key in NodeName) {
      if (Object.prototype.hasOwnProperty.call(NodeName, key)) {
        const name: NodeName = NodeName[key];
        const eventName = this.getEventName(name);
        const widgets = NODE_WIDGET_MAP[name];
        const customWidgets: Partial<CustomWidgetGetter> = {};
        const callbacks: ExtensionCallback[] = [];

        if (
          widgets.includes(CustomWidgetName.countBarChart) ||
          widgets.includes(CustomWidgetName.tabBarChart)
        ) {
          callbacks.push(onDrawBackground);
        }

        if (widgets.includes(CustomWidgetName.chip)) {
          callbacks.push(onConnectionsChange);
        }

        callbacks.push(onNodeCreated);

        const extension: Extension = {
          name: 'LFExt_' + name,
          async beforeRegisterNodeDef(node) {
            if (node.comfyClass === name) {
              callbacks.forEach((c) => c(node));
            }
          },
          getCustomWidgets: () =>
            widgets.reduce((acc, widget) => {
              return {
                ...acc,
                [widget]: this.#MANAGERS.widgets.set[widget],
              };
            }, customWidgets),
        };

        this.getApiRoutes().register(extension);

        this.#APIS.event(eventName, (e) => {
          this.#MANAGERS.widgets.onEvent(name, e, widgets as CustomWidgetName[]);
        });
      }
    }

    this.#INITIALIZED = true;
  }
  //#endregion
  //#region Getters
  getApiRoutes(): APIRoutes {
    return this.#APIS;
  }

  getCachedDatasets() {
    return this.#CACHED_DATASETS;
  }

  getDebugDataset() {
    return { article: this.#DEBUG_ARTICLE, dataset: this.#DEBUG_DATASET };
  }

  getEventName(node: NodeName) {
    return node.toLowerCase().replace('_', '-') as EventName;
  }

  getManagers() {
    return this.#MANAGERS;
  }
  isBackupEnabled() {
    return this.#AUTOMATIC_BACKUP;
  }

  isDebug() {
    return this.#DEBUG;
  }
  //#endregion
  //#region Log
  log(message: string, args?: Record<string, unknown>, severity = LogSeverity.Info) {
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

    const italicCode = '\x1b[3m';
    const boldCode = '\x1b[1m';
    const resetColorCode = '\x1b[0m';
    const dot = '• LF Nodes •';

    if (this.#DEBUG_DATASET && this.#DEBUG_ARTICLE?.isConnected && severity !== LogSeverity.Info) {
      const id = String(performance.now()).valueOf();
      const icon =
        severity === LogSeverity.Error
          ? '🔴 '
          : severity === LogSeverity.Success
          ? '🟢 '
          : severity === LogSeverity.Warning
          ? '🟠 '
          : '🔵 ';
      this.#DEBUG_DATASET.unshift({
        cssStyle: getLogStyle(),
        id,
        tagName: 'pre',
        value: icon + message,
      });
      this.#DEBUG_ARTICLE.refresh();
    }

    console.log(
      `${colorCode}${boldCode}${dot}${resetColorCode}${italicCode} ${message} ${resetColorCode}`,
      args,
    );
  }
  //#endregion
  //#region Setters
  setDebugDataset(article: HTMLKulArticleElement, dataset: KulArticleNode[]) {
    this.#DEBUG_ARTICLE = article;
    this.#DEBUG_DATASET = dataset;
  }

  toggleBackup(value?: boolean) {
    if (value === false || value === true) {
      this.#AUTOMATIC_BACKUP = value;
    } else {
      this.#AUTOMATIC_BACKUP = !this.#AUTOMATIC_BACKUP;
    }
    this.log(`Automatic backup active: '${this.#DEBUG}'`, { value }, LogSeverity.Warning);

    return this.#DEBUG;
  }

  toggleDebug(value?: boolean) {
    if (value === false || value === true) {
      this.#DEBUG = value;
    } else {
      this.#DEBUG = !this.#DEBUG;
    }
    this.log(`Debug active: '${this.#DEBUG}'`, { value }, LogSeverity.Warning);

    return this.#DEBUG;
  }
  //#endregion
}

const WINDOW = window as unknown as LFWindow;

if (!WINDOW.lfManager) {
  WINDOW.lfManager = new LFManager();
  WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, LogSeverity.Success);
  WINDOW.lfManager.initialize();
}
