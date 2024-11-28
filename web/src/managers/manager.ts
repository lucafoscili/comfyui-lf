import { ANALYTICS_API } from '../api/analytics.js';
import { BACKUP_API } from '../api/backup.js';
import { COMFY_API } from '../api/comfy.js';
import { GITHUB_API } from '../api/github.js';
import { IMAGE_API } from '../api/image.js';
import { JSON_API } from '../api/json.js';
import { METADATA_API } from '../api/metadata.js';
import {
  getLogStyle,
  NODE_WIDGET_MAP,
  onConnectionsChange,
  onDrawBackground,
  onNodeCreated,
} from '../helpers/manager.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { APIRoutes } from '../types/api/api.js';
import { EventName } from '../types/events/events.js';
import { KulDataDataset } from '../types/ketchup-lite/components.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations.js';
import { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import {
  CustomWidgetGetter,
  Extension,
  ExtensionCallback,
  LogSeverity,
} from '../types/manager/manager.js';
import { CustomWidgetName, NodeName } from '../types/widgets/widgets.js';
import { getKulManager } from '../utils/common.js';
import { LFTooltip } from './tooltip.js';
import { LFWidgets } from './widgets.js';

export interface LFWindow extends Window {
  comfyAPI: ComfyUI;
  lfManager: LFManager;
}

export class LFManager {
  #APIS: APIRoutes = {
    analytics: ANALYTICS_API,
    backup: BACKUP_API,
    comfy: COMFY_API,
    github: GITHUB_API,
    image: IMAGE_API,
    json: JSON_API,
    metadata: METADATA_API,
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
  #LATEST_RELEASE: GitHubRelease;
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

    const link = document.createElement('link');
    link.dataset.filename = '_index';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `extensions/comfyui-lf/css/_index.css`;
    document.head.appendChild(link);

    this.#MANAGERS.tooltip = new LFTooltip();
    this.#MANAGERS.widgets = new LFWidgets();
  }
  //#region Initialize
  initialize() {
    this.#APIS.github.getLatestRelease().then((r) => (this.#LATEST_RELEASE = r?.data || null));

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
        const name: NodeName = NodeName[key as keyof typeof NodeName];
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

        if (
          widgets.includes(CustomWidgetName.chip) ||
          widgets.includes(CustomWidgetName.messenger)
        ) {
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
                [widget]: this.#MANAGERS.widgets.render(widget),
              };
            }, customWidgets),
        };

        this.#APIS.comfy.register(extension);

        this.#APIS.comfy.event(eventName, (e) => {
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
  getLatestRelease() {
    return this.#LATEST_RELEASE;
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
