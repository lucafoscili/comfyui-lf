import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { createContent } from '../helpers/controlPanel.js';
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
import { createDOMWidget } from '../helpers/common.js';
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
    displayJson: DisplayJSONAdapter(),
    imageHistogram: ImageHistogramAdapter(),
    loadImages: LoadImagesAdapter(),
    switchImage: SwitchImageAdapter(),
    switchInteger: SwitchIntegerAdapter(),
    switchJson: SwitchJSONAdapter(),
    switchString: SwitchStringAdapter(),
  };

  CONTROL_PANEL: {
    eventName: EventNames;
    isReady: boolean;
    nodeName: NodeNames;
    node?: NodeType;
    cssName: string;
    widgetName: string;
    widget?: DOMWidget;
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
    this.CONTROL_PANEL = {
      cssName: 'controlPanel',
      eventName: 'lf-controlpanel',
      isReady: false,
      nodeName: 'LF_ControlPanel',
      widgetName: 'KUL_MANAGER',
    };

    this.CONTROL_PANEL.node = LiteGraph.getNodeType(this.CONTROL_PANEL.nodeName);
    this.#registerControlPanel();
    this.#embedCss(this.CONTROL_PANEL.cssName);

    for (const key in this.#NODES_DICT) {
      if (Object.prototype.hasOwnProperty.call(this.#NODES_DICT, key)) {
        const node = this.#NODES_DICT[key];
        switch (key) {
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

    const panelWidgetCb = (node: NodeType, name: string) => {
      const widget = app.widgets.KUL_MANAGER(node, name).widget;
      widget.serializeValue = false;
    };

    const extension: ControlPanelDictionaryEntry = {
      name: this.#EXT_PREFIX + this.CONTROL_PANEL.nodeName,
      beforeRegisterNodeDef: async (node) => {
        if (node.comfyClass === this.CONTROL_PANEL.nodeName) {
          node.prototype.flags = node.prototype.flags || {};
          const onNodeCreated = node.prototype.onNodeCreated;
          node.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);

            if (self.CONTROL_PANEL.node && node === self.CONTROL_PANEL.node) {
              if (self.CONTROL_PANEL.widget) {
                self.log('Control panel widget already exists', { node }, 'warning');
              } else {
                panelWidgetCb(node, self.CONTROL_PANEL.widgetName);
              }
            } else if (self.CONTROL_PANEL.node) {
              self.log('Attempted creation of multiple control panels', { node }, 'warning');
            } else {
              self.CONTROL_PANEL.node = node;
              panelWidgetCb(node, self.CONTROL_PANEL.widgetName);
            }

            return r;
          };

          const onRemoved = node.prototype.onRemoved;
          node.prototype.onRemoved = function () {
            const r = onRemoved?.apply(this, arguments);
            if (self.CONTROL_PANEL.node) {
              self.CONTROL_PANEL.isReady = false;
              self.CONTROL_PANEL.node = LiteGraph.getNodeType(self.CONTROL_PANEL.nodeName);
            }
            return r;
          };
        }
      },
      getCustomWidgets: () => {
        return {
          KUL_MANAGER(node, name) {
            const existingDomWidget = self.CONTROL_PANEL.widget;
            if (existingDomWidget) {
              self.log(
                'Attempted creation of multiple manager widgets',
                { existingDomWidget },
                'warning',
              );
              return { widget: existingDomWidget };
            } else {
              const domWidget = document.createElement('div') as DOMWidget;
              self.CONTROL_PANEL.widget = domWidget;
              domWidget.refresh = () => {
                const content = createContent(self.CONTROL_PANEL.isReady);
                if (self.CONTROL_PANEL.isReady) {
                  domWidget.replaceChild(content, domWidget.firstChild);
                } else {
                  domWidget.appendChild(content);
                }
              };
              domWidget.dataset.isInVisibleNodes = 'true';
              const readyCb = () => {
                setTimeout(() => {
                  self.CONTROL_PANEL.isReady = true;
                  domWidget.refresh();
                  document.removeEventListener('kul-spinner-event', readyCb);
                }, 500);
              };
              document.addEventListener('kul-spinner-event', readyCb);
              const widget = createDOMWidget(name, self.CONTROL_PANEL.widgetName, domWidget, node);
              domWidget.refresh();
              domWidget.addEventListener('mousemove', (e: MouseEvent) => {
                node.prototype.pos = [e.clientX, e.clientY];
                node.prototype.size = [
                  self.CONTROL_PANEL.widget.clientWidth,
                  self.CONTROL_PANEL.widget.clientWidth,
                ];
              });
              return { widget };
            }
          },
        };
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

  toggleDebug() {
    this.#DEBUG = !this.#DEBUG;
    return this.#DEBUG;
  }
}

if (!window.lfManager) {
  window.lfManager = new LFManager();
  window.lfManager.log('LFManager ready', { lfManager: window.lfManager }, 'success');
}
