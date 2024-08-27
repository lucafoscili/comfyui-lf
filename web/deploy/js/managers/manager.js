var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LFManager_instances, _LFManager_APIS, _LFManager_CSS_EMBEDS, _LFManager_DEBUG, _LFManager_DOM, _LFManager_MANAGERS, _LFManager_embedCss;
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/utils.js';
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';
import { CSS_FILENAMES } from '../utils/constants.js';
export class LFManager {
    constructor() {
        _LFManager_instances.add(this);
        _LFManager_APIS.set(this, {
            event: (name, callback) => {
                api.addEventListener(name, callback);
            },
            redraw: () => {
                app.graph.setDirtyCanvas(true, false);
            },
            register: (extension) => {
                app.registerExtension(extension);
            },
        });
        _LFManager_CSS_EMBEDS.set(this, void 0);
        _LFManager_DEBUG.set(this, false);
        _LFManager_DOM.set(this, document.documentElement);
        _LFManager_MANAGERS.set(this, {});
        const managerCb = async () => {
            __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").ketchupLite = getKulManager();
            this.log('KulManager ready', { kulManager: __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").ketchupLite }, 'success');
            document.removeEventListener('kul-manager-ready', managerCb);
        };
        __classPrivateFieldGet(this, _LFManager_DOM, "f").ketchupLiteInit = {
            assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
        };
        document.addEventListener('kul-manager-ready', managerCb);
        defineCustomElements(window);
        __classPrivateFieldSet(this, _LFManager_CSS_EMBEDS, new Set(CSS_FILENAMES), "f");
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes = new LFNodes();
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets = new LFWidgets();
        __classPrivateFieldGet(this, _LFManager_instances, "m", _LFManager_embedCss).call(this);
    }
    getApiRoutes() {
        return __classPrivateFieldGet(this, _LFManager_APIS, "f");
    }
    initialize() {
        const widgets = __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets.get;
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.controlPanel(widgets.setters.controlPanel, widgets.adders.controlPanel);
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
    toggleDebug(value) {
        if (value === false || value === true) {
            __classPrivateFieldSet(this, _LFManager_DEBUG, value, "f");
        }
        else {
            __classPrivateFieldSet(this, _LFManager_DEBUG, !__classPrivateFieldGet(this, _LFManager_DEBUG, "f"), "f");
        }
        this.log(`Debug active: '${__classPrivateFieldGet(this, _LFManager_DEBUG, "f")}'`, {}, 'warning');
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
}
_LFManager_APIS = new WeakMap(), _LFManager_CSS_EMBEDS = new WeakMap(), _LFManager_DEBUG = new WeakMap(), _LFManager_DOM = new WeakMap(), _LFManager_MANAGERS = new WeakMap(), _LFManager_instances = new WeakSet(), _LFManager_embedCss = function _LFManager_embedCss() {
    const cssFiles = Array.from(__classPrivateFieldGet(this, _LFManager_CSS_EMBEDS, "f"));
    for (const cssFileName of cssFiles) {
        const link = document.createElement('link');
        link.dataset.filename = cssFileName.toString();
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `extensions/comfyui-lf/css/${cssFileName}.css`;
        document.head.appendChild(link);
    }
};
const WINDOW = window;
if (!WINDOW.lfManager) {
    WINDOW.lfManager = new LFManager();
    WINDOW.lfManager.log('LFManager ready', { lfManager: WINDOW.lfManager }, 'success');
    WINDOW.lfManager.initialize();
}
