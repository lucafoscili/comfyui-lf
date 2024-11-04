import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFWidgets } from './widgets.js';
import {
  BaseAPIPayload,
  ComfyAPIs,
  ExtensionCallback,
  GetAnalyticsAPIPayload,
  GetMetadataAPIPayload,
  LFEndpoints,
  LogSeverity,
} from '../types/manager.js';
import { CustomWidgetGetter, Extension, NodeName } from '../types/nodes.js';
import { EventName } from '../types/events.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { LFTooltip } from './tooltip';
import { KulDataDataset } from '../types/ketchup-lite/components.js';
import { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations.js';
import { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import {
  NODE_WIDGET_MAP,
  onConnectionsChange,
  onDrawBackground,
  onNodeCreated,
} from '../helpers/manager.js';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export interface LFWindow extends Window {
  comfyAPI: ComfyUI;
  lfManager: LFManager;
}

const LOG_STYLE = {
  fontFamily: 'var(--kul-font-family-monospace)',
  margin: '0',
  maxWidth: '100%',
  overflow: 'hidden',
  padding: '4px 8px',
  textOverflow: 'ellipsis',
};

export class LFManager {
  #APIS: ComfyAPIs = {
    analytics: {
      clear: async (type) => {
        const payload: BaseAPIPayload = {
          message: '',
          status: LogSeverity.Info,
        };

        try {
          const body = new FormData();
          body.append('type', type);

          const response: Response = await api.fetchApi(LFEndpoints.ClearAnalytics, {
            body,
            method: 'POST',
          });

          const code = response.status;

          switch (code) {
            case 200:
              const p: BaseAPIPayload = await response.json();
              if (p.status === 'success') {
                payload.message = p.message;
                payload.status = LogSeverity.Error;
                this.#CACHED_DATASETS.usage = {};
              }
              break;
            case 404:
              payload.message = `Analytics not found: ${type}. Skipping deletion.`;
              payload.status = LogSeverity.Info;
              break;
            default:
              payload.message = `Unexpected response from the clear-analytics ${type} API: ${p.message}`;
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
      get: async (directory, type) => {
        const payload: GetAnalyticsAPIPayload = {
          data: {},
          message: '',
          status: LogSeverity.Info,
        };

        if (!directory || !type) {
          payload.message = `Missing directory (received ${directory}) or  (received ${type}).`;
          payload.status = LogSeverity.Error;
          this.log(payload.message, { payload }, LogSeverity.Error);
          return payload;
        }

        try {
          const body = new FormData();
          body.append('directory', directory);
          body.append('type', type);

          const response = await api.fetchApi(LFEndpoints.GetAnalytics, {
            body,
            method: 'POST',
          });

          const code = response.status;

          switch (code) {
            case 200:
              const p: GetAnalyticsAPIPayload = await response.json();
              if (p.status === 'success') {
                payload.data = p.data;
                payload.message = 'Analytics data fetched successfully.';
                payload.status = LogSeverity.Success;
                this.log(payload.message, { payload }, payload.status);
                this.#CACHED_DATASETS.usage = payload.data;
              }
              break;
            case 404:
              payload.status = LogSeverity.Info;
              this.log(`${type} analytics file not found.`, { payload }, payload.status);
              break;
            default:
              payload.message = `Unexpected response from the get-analytics ${type} API: ${p.message}`;
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
    },
    backup: {
      new: async (backupType = 'automatic') => {
        const payload: BaseAPIPayload = {
          message: '',
          status: LogSeverity.Info,
        };

        try {
          const body = new FormData();
          body.append('backup_type', backupType);
          const response = await api.fetchApi(LFEndpoints.NewBackup, { body, method: 'POST' });

          const code = response.status;

          switch (code) {
            case 200:
              const p: BaseAPIPayload = await response.json();
              if (p.status === 'success') {
                payload.message = p.message;
                payload.status = LogSeverity.Success;
              }
              break;
            default:
              payload.message = 'Unexpected response from the API!';
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
    },
    metadata: {
      clear: async () => {
        const payload: BaseAPIPayload = {
          message: '',
          status: LogSeverity.Info,
        };

        try {
          const response = await api.fetchApi(LFEndpoints.ClearMetadata, {
            method: 'POST',
          });

          const code = response.status;

          switch (code) {
            case 200:
              const p: BaseAPIPayload = await response.json();
              if (p.status === 'success') {
                payload.message = p.message;
                payload.status = LogSeverity.Success;
              }
              break;
            default:
              payload.message = 'Unexpected response from the API!';
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
      get: async (hash) => {
        const payload: GetMetadataAPIPayload = {
          data: null,
          message: '',
          status: LogSeverity.Info,
        };

        try {
          const response = await fetch(`https://civitai.com/api/v1/model-versions/by-hash/${hash}`);

          const code = response.status;

          switch (code) {
            case 200:
              const p: GetMetadataAPIPayload['data'] = await response.json();
              payload.data = p;
              payload.message = 'Metadata succesfully fetched from CivitAI.';
              payload.status = LogSeverity.Success;
              break;
            case 404:
              payload.message = 'Model not found on CivitAI!';
              payload.status = LogSeverity.Info;
              break;
            default:
              payload.message = 'Unexpected response from the API!';
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
      save: async (modelPath, dataset, forcedSave = false) => {
        const payload: GetMetadataAPIPayload = {
          data: null,
          message: '',
          status: LogSeverity.Info,
        };

        try {
          const body = new FormData();
          body.append('model_path', modelPath);
          body.append('metadata', JSON.stringify(dataset));
          body.append('forced_save', String(forcedSave).valueOf());

          const response = await api.fetchApi(LFEndpoints.SaveMetadata, {
            method: 'POST',
            body,
          });

          const code = response.status;

          switch (code) {
            case 200:
              const p: BaseAPIPayload = await response.json();
              if (p.status === 'success') {
                payload.message = p.message;
                payload.status = LogSeverity.Success;
              }
              break;
            default:
              payload.message = 'Unexpected response from the API!';
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
      updateCover: async (modelPath, b64image) => {
        const payload: BaseAPIPayload = {
          message: '',
          status: LogSeverity.Info,
        };

        try {
          const body = new FormData();
          body.append('model_path', modelPath);
          body.append('base64_image', b64image);

          const response = await api.fetchApi(LFEndpoints.UpdateMetadataCover, {
            method: 'POST',
            body,
          });

          const code = response.status;

          switch (code) {
            case 200:
              const p: BaseAPIPayload = await response.json();
              if (p.status === 'success') {
                payload.message = p.message;
                payload.status = LogSeverity.Success;
              }
              break;
            default:
              payload.message = 'Unexpected response from the API!';
              payload.status = LogSeverity.Error;
              break;
          }
        } catch (error) {
          payload.message = error;
          payload.status = LogSeverity.Error;
        }

        this.log(payload.message, { payload }, payload.status);
        return payload;
      },
    },
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

  getApiRoutes(): ComfyAPIs {
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

  isBackupEnabled() {
    return this.#AUTOMATIC_BACKUP;
  }

  isDebug() {
    return this.#DEBUG;
  }

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
        cssStyle: LOG_STYLE,
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
}

const WINDOW = window as unknown as LFWindow;

if (!WINDOW.lfManager) {
  WINDOW.lfManager = new LFManager();
  WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, LogSeverity.Success);
  WINDOW.lfManager.initialize();
}
