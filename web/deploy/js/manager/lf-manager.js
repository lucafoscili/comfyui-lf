var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFManager_instances, _LFManager_CSS_EMBEDDED, _LFManager_DEBUG, _LFManager_DOM, _LFManager_EXT_PREFIX, _LFManager_KUL_MANAGER, _LFManager_NODES_DICT, _LFManager_embedCss, _LFManager_registerControlPanel;
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
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/utils.js';
import { createDOMWidget } from '../helpers/common.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
class LFManager {
    constructor() {
        _LFManager_instances.add(this);
        _LFManager_CSS_EMBEDDED.set(this, void 0);
        _LFManager_DEBUG.set(this, false);
        _LFManager_DOM.set(this, document.documentElement);
        _LFManager_EXT_PREFIX.set(this, 'LFExtension_');
        _LFManager_KUL_MANAGER.set(this, void 0);
        _LFManager_NODES_DICT.set(this, {
            displayJson: DisplayJSONAdapter(),
            imageHistogram: ImageHistogramAdapter(),
            loadImages: LoadImagesAdapter(),
            switchImage: SwitchImageAdapter(),
            switchInteger: SwitchIntegerAdapter(),
            switchJson: SwitchJSONAdapter(),
            switchString: SwitchStringAdapter(),
        });
        const managerCb = () => {
            __classPrivateFieldSet(this, _LFManager_KUL_MANAGER, getKulManager(), "f");
            this.log('KulManager ready', { kulManager: __classPrivateFieldGet(this, _LFManager_KUL_MANAGER, "f") }, 'success');
            document.removeEventListener('kul-manager-ready', managerCb);
        };
        __classPrivateFieldGet(this, _LFManager_DOM, "f").ketchupLiteInit = {
            assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
        };
        document.addEventListener('kul-manager-ready', managerCb);
        defineCustomElements(window);
        __classPrivateFieldSet(this, _LFManager_CSS_EMBEDDED, new Set(), "f");
        this.CONTROL_PANEL = {
            cssName: 'controlPanel',
            eventName: 'lf-controlpanel',
            isReady: false,
            nodeName: 'LF_ControlPanel',
            widgetName: 'KUL_MANAGER',
        };
        this.CONTROL_PANEL.node = LiteGraph.getNodeType(this.CONTROL_PANEL.nodeName);
        __classPrivateFieldGet(this, _LFManager_instances, "m", _LFManager_registerControlPanel).call(this);
        __classPrivateFieldGet(this, _LFManager_instances, "m", _LFManager_embedCss).call(this, this.CONTROL_PANEL.cssName);
        for (const key in __classPrivateFieldGet(this, _LFManager_NODES_DICT, "f")) {
            if (Object.prototype.hasOwnProperty.call(__classPrivateFieldGet(this, _LFManager_NODES_DICT, "f"), key)) {
                const node = __classPrivateFieldGet(this, _LFManager_NODES_DICT, "f")[key];
                switch (key) {
                    default:
                        const hasbeforeRegisterNodeDef = !!node.beforeRegisterNodeDef;
                        const hasCustomWidgets = !!node.getCustomWidgets;
                        const extension = {
                            name: __classPrivateFieldGet(this, _LFManager_EXT_PREFIX, "f") + key,
                        };
                        if (hasbeforeRegisterNodeDef) {
                            extension.beforeRegisterNodeDef = node.beforeRegisterNodeDef;
                        }
                        if (hasCustomWidgets) {
                            extension.getCustomWidgets = node.getCustomWidgets;
                            __classPrivateFieldGet(this, _LFManager_instances, "m", _LFManager_embedCss).call(this, key);
                        }
                        app.registerExtension(extension);
                        api.addEventListener(node.eventName, node.eventCb);
                        break;
                }
            }
        }
    }
    isDebug() {
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
    log(message, args, severity = 'info') {
        if (!__classPrivateFieldGet(this, _LFManager_DEBUG, "f")) {
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
        __classPrivateFieldSet(this, _LFManager_DEBUG, !__classPrivateFieldGet(this, _LFManager_DEBUG, "f"), "f");
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
}
_LFManager_CSS_EMBEDDED = new WeakMap(), _LFManager_DEBUG = new WeakMap(), _LFManager_DOM = new WeakMap(), _LFManager_EXT_PREFIX = new WeakMap(), _LFManager_KUL_MANAGER = new WeakMap(), _LFManager_NODES_DICT = new WeakMap(), _LFManager_instances = new WeakSet(), _LFManager_embedCss = function _LFManager_embedCss(filename) {
    if (!__classPrivateFieldGet(this, _LFManager_CSS_EMBEDDED, "f").has(filename)) {
        const link = document.createElement('link');
        link.dataset.filename = 'filename';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'extensions/comfyui-lf/css/' + filename + '.css';
        document.head.appendChild(link);
        __classPrivateFieldGet(this, _LFManager_CSS_EMBEDDED, "f").add(filename);
    }
}, _LFManager_registerControlPanel = function _LFManager_registerControlPanel() {
    const self = this;
    const panelWidgetCb = (node, name) => {
        const widget = app.widgets.KUL_MANAGER(node, name).widget;
        widget.serializeValue = false;
    };
    const extension = {
        name: __classPrivateFieldGet(this, _LFManager_EXT_PREFIX, "f") + this.CONTROL_PANEL.nodeName,
        beforeRegisterNodeDef: async (node) => {
            if (node.comfyClass === this.CONTROL_PANEL.nodeName) {
                node.prototype.flags = node.prototype.flags || {};
                const onNodeCreated = node.prototype.onNodeCreated;
                node.prototype.onNodeCreated = function () {
                    const r = onNodeCreated?.apply(this, arguments);
                    if (self.CONTROL_PANEL.node && node === self.CONTROL_PANEL.node) {
                        if (self.CONTROL_PANEL.widget) {
                            self.log('Control panel widget already exists', { node }, 'warning');
                        }
                        else {
                            panelWidgetCb(node, self.CONTROL_PANEL.widgetName);
                        }
                    }
                    else if (self.CONTROL_PANEL.node) {
                        self.log('Attempted creation of multiple control panels', { node }, 'warning');
                    }
                    else {
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
                        self.log('Attempted creation of multiple manager widgets', { existingDomWidget }, 'warning');
                        return { widget: existingDomWidget };
                    }
                    else {
                        const domWidget = document.createElement('div');
                        self.CONTROL_PANEL.widget = domWidget;
                        domWidget.refresh = () => {
                            const content = createContent(self.CONTROL_PANEL.isReady);
                            if (self.CONTROL_PANEL.isReady) {
                                domWidget.replaceChild(content, domWidget.firstChild);
                            }
                            else {
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
                        domWidget.addEventListener('mousemove', (e) => {
                            node.prototype.pos = [e.clientX, e.clientY];
                            node.prototype.size = [
                                self.CONTROL_PANEL.widget.clientWidth,
                                self.CONTROL_PANEL.widget.clientWidth,
                            ];
                            console.log(node.prototype.pos, node.prototype.size);
                        });
                        return { widget };
                    }
                },
            };
        },
    };
    app.registerExtension(extension);
};
if (!window.lfManager) {
    window.lfManager = new LFManager();
    window.lfManager.log('LFManager ready', { lfManager: window.lfManager }, 'success');
}
