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
var _LFManager_APIS, _LFManager_DEBUG, _LFManager_DOM, _LFManager_MANAGERS;
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';
import { LogSeverity } from '../types/manager.js';
import { EventName, } from '../types/events.js';
export class LFManager {
    constructor() {
        _LFManager_APIS.set(this, {
            event: (name, callback) => {
                api.addEventListener(name, callback);
            },
            getNodeById: (id) => {
                return app.graph.getNodeById(+(id || app.runningNodeId));
            },
            redraw: () => {
                app.graph.setDirtyCanvas(true, false);
            },
            register: (extension) => {
                app.registerExtension(extension);
            },
        });
        _LFManager_DEBUG.set(this, false);
        _LFManager_DOM.set(this, document.documentElement);
        _LFManager_MANAGERS.set(this, {});
        const managerCb = async () => {
            __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").ketchupLite = getKulManager();
            this.log('KulManager ready', { kulManager: __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").ketchupLite }, LogSeverity.Success);
            document.removeEventListener('kul-manager-ready', managerCb);
        };
        __classPrivateFieldGet(this, _LFManager_DOM, "f").ketchupLiteInit = {
            assetsPath: window.location.href + 'extensions/comfyui-lf/assets',
        };
        document.addEventListener('kul-manager-ready', managerCb);
        defineCustomElements(window);
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes = new LFNodes();
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets = new LFWidgets();
    }
    getApiRoutes() {
        return __classPrivateFieldGet(this, _LFManager_APIS, "f");
    }
    initialize() {
        const nodes = __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.get;
        const widgets = __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets.get;
        /*-------------------------------------------------------------------*/
        /*               I n i t   C o n t r o l   P a n e l                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ControlPanel(widgets.setters.KUL_CONTROL_PANEL, widgets.adders.KUL_CONTROL_PANEL);
        /*-------------------------------------------------------------------*/
        /*                  I n i t   D i s p l a y J S O N                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayJSON(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayJson, (e) => {
            nodes.eventHandlers.LF_DisplayJSON(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   I m a g e H i s t o g r a m               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ImageHistogram(widgets.setters.KUL_CHART, widgets.adders.KUL_CHART, widgets.resizerHandlers.KUL_CHART);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.imageHistogram, (e) => {
            nodes.eventHandlers.LF_ImageHistogram(e, widgets.adders.KUL_CHART);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   I m a g e s L o a d e r                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoadImages(widgets.setters.IMAGE_PREVIEW_B64, widgets.adders.IMAGE_PREVIEW_B64);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loadImages, (e) => {
            nodes.eventHandlers.LF_LoadImages(e, widgets.adders.IMAGE_PREVIEW_B64);
        });
    }
    isDebug() {
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
    log(message, args, severity = LogSeverity.Info) {
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
        const dot = '• LF Nodes •';
        console.log(`${colorCode}${dot} ${message} ${resetColorCode}`, args);
    }
    toggleDebug(value) {
        if (value === false || value === true) {
            __classPrivateFieldSet(this, _LFManager_DEBUG, value, "f");
        }
        else {
            __classPrivateFieldSet(this, _LFManager_DEBUG, !__classPrivateFieldGet(this, _LFManager_DEBUG, "f"), "f");
        }
        this.log(`Debug active: '${__classPrivateFieldGet(this, _LFManager_DEBUG, "f")}'`, { value }, LogSeverity.Warning);
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
}
_LFManager_APIS = new WeakMap(), _LFManager_DEBUG = new WeakMap(), _LFManager_DOM = new WeakMap(), _LFManager_MANAGERS = new WeakMap();
const WINDOW = window;
if (!WINDOW.lfManager) {
    WINDOW.lfManager = new LFManager();
    WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, LogSeverity.Success);
    WINDOW.lfManager.initialize();
}
