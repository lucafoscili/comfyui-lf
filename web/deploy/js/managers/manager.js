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
var _LFManager_APIS, _LFManager_DEBUG, _LFManager_DOM, _LFManager_INITIALIZED, _LFManager_MANAGERS;
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
        _LFManager_INITIALIZED.set(this, false);
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
        if (__classPrivateFieldGet(this, _LFManager_INITIALIZED, "f")) {
            this.log('Attempt to initialize LFManager when already ready!', { LFManager: this }, LogSeverity.Warning);
            return;
        }
        const nodes = __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.get;
        const widgets = __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets.get;
        /*-------------------------------------------------------------------*/
        /*                    I n i t   B l u r I m a g e s                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_BlurImages(widgets.setters.IMAGE_PREVIEW_B64, widgets.adders.IMAGE_PREVIEW_B64);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.blurImages, (e) => {
            nodes.eventHandlers.LF_BlurImages(e, widgets.adders.IMAGE_PREVIEW_B64);
        });
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
        /*                        I n i t   F l o a t                        */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Float(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.float, (e) => {
            nodes.eventHandlers.LF_Float(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   I m a g e H i s t o g r a m               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ImageHistogram(widgets.setters.KUL_CHART, widgets.adders.KUL_CHART, widgets.resizerHandlers.KUL_CHART);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.imageHistogram, (e) => {
            nodes.eventHandlers.LF_ImageHistogram(e, widgets.adders.KUL_CHART);
        });
        /*-------------------------------------------------------------------*/
        /*            I n i t   I m a g e R e s i z e B y E d g e            */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ImageResizeByEdge(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.imageResizeByEdge, (e) => {
            nodes.eventHandlers.LF_ImageResizeByEdge(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   I m a g e s L o a d e r                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoadImages(widgets.setters.IMAGE_PREVIEW_B64, widgets.adders.IMAGE_PREVIEW_B64);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loadImages, (e) => {
            nodes.eventHandlers.LF_LoadImages(e, widgets.adders.IMAGE_PREVIEW_B64);
        });
        /*-------------------------------------------------------------------*/
        /*                      I n i t   I n t e g e r                      */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Integer(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.integer, (e) => {
            nodes.eventHandlers.LF_Integer(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*                     I n i t   L L M C h a t                       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LLMChat(widgets.setters.KUL_CHAT, widgets.adders.KUL_CHAT);
        /*-------------------------------------------------------------------*/
        /*                      I n i t   S t r i n g                        */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_String(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.string, (e) => {
            nodes.eventHandlers.LF_String(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*     I n i t   M u l t i p l e   R e s i z e   F o r   W e b       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_MultipleImageResizeForWeb(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.multipleImageResizeForWeb, (e) => {
            nodes.eventHandlers.LF_MultipleImageResizeForWeb(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*                 I n i t   S w i t c h   I m a g e                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SwitchImage(widgets.setters.KUL_BOOLEAN_VIEWER, widgets.adders.KUL_BOOLEAN_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.switchImage, (e) => {
            nodes.eventHandlers.LF_SwitchImage(e, widgets.adders.KUL_BOOLEAN_VIEWER);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   S w i t c h   I n t e g e r              */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SwitchInteger(widgets.setters.KUL_BOOLEAN_VIEWER, widgets.adders.KUL_BOOLEAN_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.switchInteger, (e) => {
            nodes.eventHandlers.LF_SwitchInteger(e, widgets.adders.KUL_BOOLEAN_VIEWER);
        });
        /*-------------------------------------------------------------------*/
        /*                  I n i t   S w i t c h   J S O N                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SwitchJSON(widgets.setters.KUL_BOOLEAN_VIEWER, widgets.adders.KUL_BOOLEAN_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.switchJson, (e) => {
            nodes.eventHandlers.LF_SwitchJSON(e, widgets.adders.KUL_BOOLEAN_VIEWER);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   S w i t c h   S t r i n g                */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SwitchString(widgets.setters.KUL_BOOLEAN_VIEWER, widgets.adders.KUL_BOOLEAN_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.switchString, (e) => {
            nodes.eventHandlers.LF_SwitchString(e, widgets.adders.KUL_BOOLEAN_VIEWER);
        });
        /*-------------------------------------------------------------------*/
        /*                       W r i t e   J S O N                         */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_WriteJSON(widgets.setters.KUL_JSON_INPUT);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.writeJson, (e) => {
            nodes.eventHandlers.LF_WriteJSON(e, widgets.adders.KUL_JSON_INPUT);
        });
        __classPrivateFieldSet(this, _LFManager_INITIALIZED, true, "f");
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
_LFManager_APIS = new WeakMap(), _LFManager_DEBUG = new WeakMap(), _LFManager_DOM = new WeakMap(), _LFManager_INITIALIZED = new WeakMap(), _LFManager_MANAGERS = new WeakMap();
const WINDOW = window;
if (!WINDOW.lfManager) {
    WINDOW.lfManager = new LFManager();
    WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, LogSeverity.Success);
    WINDOW.lfManager.initialize();
}
