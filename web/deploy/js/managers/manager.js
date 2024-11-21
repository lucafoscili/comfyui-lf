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
var _LFManager_APIS, _LFManager_AUTOMATIC_BACKUP, _LFManager_CACHED_DATASETS, _LFManager_DEBUG, _LFManager_DEBUG_ARTICLE, _LFManager_DEBUG_DATASET, _LFManager_DOM, _LFManager_INITIALIZED, _LFManager_LATEST_RELEASE, _LFManager_MANAGERS;
import { ANALYTICS_API } from '../api/analytics.js';
import { BACKUP_API } from '../api/backup.js';
import { COMFY_API } from '../api/comfy.js';
import { IMAGE_API } from '../api/image.js';
import { JSON_API } from '../api/json.js';
import { METADATA_API } from '../api/metadata.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFTooltip } from './tooltip.js';
import { LFWidgets } from './widgets.js';
import { CustomWidgetName, NodeName } from '../types/widgets/_common.js';
import { getLogStyle, NODE_WIDGET_MAP, onConnectionsChange, onDrawBackground, onNodeCreated, } from '../helpers/manager.js';
import { LogSeverity, } from '../types/manager/manager.js';
import { GITHUB_API } from '../api/github.js';
export class LFManager {
    constructor() {
        _LFManager_APIS.set(this, {
            analytics: ANALYTICS_API,
            backup: BACKUP_API,
            comfy: COMFY_API,
            github: GITHUB_API,
            image: IMAGE_API,
            json: JSON_API,
            metadata: METADATA_API,
        });
        _LFManager_AUTOMATIC_BACKUP.set(this, true);
        _LFManager_CACHED_DATASETS.set(this, {
            usage: null,
        });
        _LFManager_DEBUG.set(this, false);
        _LFManager_DEBUG_ARTICLE.set(this, void 0);
        _LFManager_DEBUG_DATASET.set(this, void 0);
        _LFManager_DOM.set(this, document.documentElement);
        _LFManager_INITIALIZED.set(this, false);
        _LFManager_LATEST_RELEASE.set(this, void 0);
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
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").tooltip = new LFTooltip();
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets = new LFWidgets();
    }
    //#region Initialize
    initialize() {
        __classPrivateFieldGet(this, _LFManager_APIS, "f").github.getLatestRelease().then((r) => (__classPrivateFieldSet(this, _LFManager_LATEST_RELEASE, r?.data || null, "f")));
        if (__classPrivateFieldGet(this, _LFManager_INITIALIZED, "f")) {
            this.log('Attempt to initialize LFManager when already ready!', { LFManager: this }, LogSeverity.Warning);
            return;
        }
        for (const key in NodeName) {
            if (Object.prototype.hasOwnProperty.call(NodeName, key)) {
                const name = NodeName[key];
                const eventName = this.getEventName(name);
                const widgets = NODE_WIDGET_MAP[name];
                const customWidgets = {};
                const callbacks = [];
                if (widgets.includes(CustomWidgetName.countBarChart) ||
                    widgets.includes(CustomWidgetName.tabBarChart)) {
                    callbacks.push(onDrawBackground);
                }
                if (widgets.includes(CustomWidgetName.chip)) {
                    callbacks.push(onConnectionsChange);
                }
                callbacks.push(onNodeCreated);
                const extension = {
                    name: 'LFExt_' + name,
                    async beforeRegisterNodeDef(node) {
                        if (node.comfyClass === name) {
                            callbacks.forEach((c) => c(node));
                        }
                    },
                    getCustomWidgets: () => widgets.reduce((acc, widget) => {
                        return {
                            ...acc,
                            [widget]: __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets.set[widget],
                        };
                    }, customWidgets),
                };
                __classPrivateFieldGet(this, _LFManager_APIS, "f").comfy.register(extension);
                __classPrivateFieldGet(this, _LFManager_APIS, "f").comfy.event(eventName, (e) => {
                    __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets.onEvent(name, e, widgets);
                });
            }
        }
        __classPrivateFieldSet(this, _LFManager_INITIALIZED, true, "f");
    }
    //#endregion
    //#region Getters
    getApiRoutes() {
        return __classPrivateFieldGet(this, _LFManager_APIS, "f");
    }
    getCachedDatasets() {
        return __classPrivateFieldGet(this, _LFManager_CACHED_DATASETS, "f");
    }
    getDebugDataset() {
        return { article: __classPrivateFieldGet(this, _LFManager_DEBUG_ARTICLE, "f"), dataset: __classPrivateFieldGet(this, _LFManager_DEBUG_DATASET, "f") };
    }
    getEventName(node) {
        return node.toLowerCase().replace('_', '-');
    }
    getLatestRelease() {
        return __classPrivateFieldGet(this, _LFManager_LATEST_RELEASE, "f");
    }
    getManagers() {
        return __classPrivateFieldGet(this, _LFManager_MANAGERS, "f");
    }
    isBackupEnabled() {
        return __classPrivateFieldGet(this, _LFManager_AUTOMATIC_BACKUP, "f");
    }
    isDebug() {
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
    //#endregion
    //#region Log
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
        const italicCode = '\x1b[3m';
        const boldCode = '\x1b[1m';
        const resetColorCode = '\x1b[0m';
        const dot = '• LF Nodes •';
        if (__classPrivateFieldGet(this, _LFManager_DEBUG_DATASET, "f") && __classPrivateFieldGet(this, _LFManager_DEBUG_ARTICLE, "f")?.isConnected && severity !== LogSeverity.Info) {
            const id = String(performance.now()).valueOf();
            const icon = severity === LogSeverity.Error
                ? '🔴 '
                : severity === LogSeverity.Success
                    ? '🟢 '
                    : severity === LogSeverity.Warning
                        ? '🟠 '
                        : '🔵 ';
            __classPrivateFieldGet(this, _LFManager_DEBUG_DATASET, "f").unshift({
                cssStyle: getLogStyle(),
                id,
                tagName: 'pre',
                value: icon + message,
            });
            __classPrivateFieldGet(this, _LFManager_DEBUG_ARTICLE, "f").refresh();
        }
        console.log(`${colorCode}${boldCode}${dot}${resetColorCode}${italicCode} ${message} ${resetColorCode}`, args);
    }
    //#endregion
    //#region Setters
    setDebugDataset(article, dataset) {
        __classPrivateFieldSet(this, _LFManager_DEBUG_ARTICLE, article, "f");
        __classPrivateFieldSet(this, _LFManager_DEBUG_DATASET, dataset, "f");
    }
    toggleBackup(value) {
        if (value === false || value === true) {
            __classPrivateFieldSet(this, _LFManager_AUTOMATIC_BACKUP, value, "f");
        }
        else {
            __classPrivateFieldSet(this, _LFManager_AUTOMATIC_BACKUP, !__classPrivateFieldGet(this, _LFManager_AUTOMATIC_BACKUP, "f"), "f");
        }
        this.log(`Automatic backup active: '${__classPrivateFieldGet(this, _LFManager_DEBUG, "f")}'`, { value }, LogSeverity.Warning);
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
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
_LFManager_APIS = new WeakMap(), _LFManager_AUTOMATIC_BACKUP = new WeakMap(), _LFManager_CACHED_DATASETS = new WeakMap(), _LFManager_DEBUG = new WeakMap(), _LFManager_DEBUG_ARTICLE = new WeakMap(), _LFManager_DEBUG_DATASET = new WeakMap(), _LFManager_DOM = new WeakMap(), _LFManager_INITIALIZED = new WeakMap(), _LFManager_LATEST_RELEASE = new WeakMap(), _LFManager_MANAGERS = new WeakMap();
const WINDOW = window;
if (!WINDOW.lfManager) {
    WINDOW.lfManager = new LFManager();
    WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, LogSeverity.Success);
    WINDOW.lfManager.initialize();
}
