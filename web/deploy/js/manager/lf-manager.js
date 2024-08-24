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
var _LFManager_instances, _LFManager_CSS_EMBEDDED, _LFManager_DEBUG, _LFManager_DOM, _LFManager_EXT_PREFIX, _LFManager_KUL_MANAGER, _LFManager_NODES_DICT, _LFManager_embedCss;
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
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/utils.js';
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
            controlPanel: ControlPanelAdapter(),
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
        for (const key in __classPrivateFieldGet(this, _LFManager_NODES_DICT, "f")) {
            if (Object.prototype.hasOwnProperty.call(__classPrivateFieldGet(this, _LFManager_NODES_DICT, "f"), key)) {
                const node = __classPrivateFieldGet(this, _LFManager_NODES_DICT, "f")[key];
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
};
if (!window.lfManager) {
    window.lfManager = new LFManager();
    window.lfManager.log('LFManager ready', { lfManager: window.lfManager }, 'success');
}
