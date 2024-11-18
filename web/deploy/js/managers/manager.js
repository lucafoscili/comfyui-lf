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
var _LFManager_APIS, _LFManager_AUTOMATIC_BACKUP, _LFManager_CACHED_DATASETS, _LFManager_DEBUG, _LFManager_DEBUG_ARTICLE, _LFManager_DEBUG_DATASET, _LFManager_DOM, _LFManager_INITIALIZED, _LFManager_MANAGERS;
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFWidgets } from './widgets.js';
import { NodeName } from '../types/nodes.js';
import { LFTooltip } from './tooltip.js';
import { CustomWidgetName } from '../types/widgets.js';
import { NODE_WIDGET_MAP, onConnectionsChange, onDrawBackground, onNodeCreated, } from '../helpers/manager.js';
import { APIEndpoints, } from '../types/api/api.js';
import { LogSeverity } from '../types/manager/manager.js';
const LOG_STYLE = {
    fontFamily: 'var(--kul-font-family-monospace)',
    margin: '0',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '4px 8px',
    textOverflow: 'ellipsis',
};
export class LFManager {
    constructor() {
        _LFManager_APIS.set(this, {
            analytics: {
                clear: async (type) => {
                    const payload = {
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('type', type);
                        const response = await api.fetchApi(APIEndpoints.ClearAnalytics, {
                            body,
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
                                if (p.status === 'success') {
                                    payload.message = p.message;
                                    payload.status = LogSeverity.Error;
                                    __classPrivateFieldGet(this, _LFManager_CACHED_DATASETS, "f").usage = {};
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
                get: async (directory, type) => {
                    const payload = {
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
                        const response = await api.fetchApi(APIEndpoints.GetAnalytics, {
                            body,
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
                                if (p.status === 'success') {
                                    payload.data = p.data;
                                    payload.message = 'Analytics data fetched successfully.';
                                    payload.status = LogSeverity.Success;
                                    this.log(payload.message, { payload }, payload.status);
                                    __classPrivateFieldGet(this, _LFManager_CACHED_DATASETS, "f").usage = payload.data;
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
            },
            backup: {
                new: async (backupType = 'automatic') => {
                    const payload = {
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('backup_type', backupType);
                        const response = await api.fetchApi(APIEndpoints.NewBackup, { body, method: 'POST' });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
            },
            image: {
                get: async (directory) => {
                    const payload = {
                        data: {},
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('directory', directory);
                        const response = await api.fetchApi(APIEndpoints.GetImage, {
                            body,
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
                                if (p.status === 'success') {
                                    payload.data = p.data;
                                    payload.message = 'Analytics data fetched successfully.';
                                    payload.status = LogSeverity.Success;
                                    this.log(payload.message, { payload }, payload.status);
                                    __classPrivateFieldGet(this, _LFManager_CACHED_DATASETS, "f").usage = payload.data;
                                }
                                break;
                            default:
                                payload.message = `Unexpected response from the get-image API: ${response.text}`;
                                payload.status = LogSeverity.Error;
                                break;
                        }
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
                process: async (url, type, settings) => {
                    const payload = {
                        data: '',
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('url', url);
                        body.append('type', type);
                        body.append('settings', JSON.stringify(settings));
                        const response = await api.fetchApi(APIEndpoints.ProcessImage, {
                            body,
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
                                if (p.status === 'success') {
                                    payload.data = p.data;
                                    payload.message = 'Image processed successfully.';
                                    payload.status = LogSeverity.Success;
                                    this.log(payload.message, { payload }, payload.status);
                                }
                                break;
                            default:
                                payload.message = `Unexpected response from the process-image API: ${response.text}`;
                                payload.status = LogSeverity.Error;
                                break;
                        }
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
            },
            json: {
                get: async (filePath) => {
                    const payload = {
                        data: {},
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('file_path', filePath);
                        const response = await api.fetchApi(APIEndpoints.GetJson, {
                            body,
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
                                if (p.status === 'success') {
                                    payload.data = p.data;
                                    payload.message = 'JSON data fetched successfully.';
                                    payload.status = LogSeverity.Success;
                                    this.log(payload.message, { payload }, payload.status);
                                    __classPrivateFieldGet(this, _LFManager_CACHED_DATASETS, "f").usage = payload.data;
                                }
                                break;
                            default:
                                payload.message = `Unexpected response from the get-json API: ${await response.text()}`;
                                payload.status = LogSeverity.Error;
                                break;
                        }
                    }
                    catch (error) {
                        payload.message = error.toString();
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
                update: async (filePath, dataset) => {
                    const payload = {
                        message: '',
                        status: LogSeverity.Info,
                    };
                    const body = new FormData();
                    body.append('file_path', filePath);
                    body.append('dataset', JSON.stringify(dataset));
                    try {
                        const response = await api.fetchApi(APIEndpoints.UpdateJson, {
                            body,
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
            },
            metadata: {
                clear: async () => {
                    const payload = {
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const response = await api.fetchApi(APIEndpoints.ClearMetadata, {
                            method: 'POST',
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
                get: async (hash) => {
                    const payload = {
                        data: null,
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const response = await fetch(`https://civitai.com/api/v1/model-versions/by-hash/${hash}`);
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
                save: async (modelPath, dataset, forcedSave = false) => {
                    const payload = {
                        data: null,
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('model_path', modelPath);
                        body.append('metadata', JSON.stringify(dataset));
                        body.append('forced_save', String(forcedSave).valueOf());
                        const response = await api.fetchApi(APIEndpoints.SaveMetadata, {
                            method: 'POST',
                            body,
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
                updateCover: async (modelPath, b64image) => {
                    const payload = {
                        message: '',
                        status: LogSeverity.Info,
                    };
                    try {
                        const body = new FormData();
                        body.append('model_path', modelPath);
                        body.append('base64_image', b64image);
                        const response = await api.fetchApi(APIEndpoints.UpdateMetadataCover, {
                            method: 'POST',
                            body,
                        });
                        const code = response.status;
                        switch (code) {
                            case 200:
                                const p = await response.json();
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
                    }
                    catch (error) {
                        payload.message = error;
                        payload.status = LogSeverity.Error;
                    }
                    this.log(payload.message, { payload }, payload.status);
                    return payload;
                },
            },
            comfyUi: () => window.comfyAPI,
            event: (name, callback) => {
                api.addEventListener(name, callback);
            },
            fetch: async (body) => {
                return await api.fetchApi('/upload/image', {
                    method: 'POST',
                    body,
                });
            },
            getLinkById: (id) => {
                return app.graph.links[String(id).valueOf()];
            },
            getNodeById: (id) => {
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
            register: (extension) => {
                app.registerExtension(extension);
            },
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
    getManagers() {
        return __classPrivateFieldGet(this, _LFManager_MANAGERS, "f");
    }
    initialize() {
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
                this.getApiRoutes().register(extension);
                __classPrivateFieldGet(this, _LFManager_APIS, "f").event(eventName, (e) => {
                    __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").widgets.onEvent(name, e, widgets);
                });
            }
        }
        __classPrivateFieldSet(this, _LFManager_INITIALIZED, true, "f");
    }
    isBackupEnabled() {
        return __classPrivateFieldGet(this, _LFManager_AUTOMATIC_BACKUP, "f");
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
                cssStyle: LOG_STYLE,
                id,
                tagName: 'pre',
                value: icon + message,
            });
            __classPrivateFieldGet(this, _LFManager_DEBUG_ARTICLE, "f").refresh();
        }
        console.log(`${colorCode}${boldCode}${dot}${resetColorCode}${italicCode} ${message} ${resetColorCode}`, args);
    }
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
_LFManager_APIS = new WeakMap(), _LFManager_AUTOMATIC_BACKUP = new WeakMap(), _LFManager_CACHED_DATASETS = new WeakMap(), _LFManager_DEBUG = new WeakMap(), _LFManager_DEBUG_ARTICLE = new WeakMap(), _LFManager_DEBUG_DATASET = new WeakMap(), _LFManager_DOM = new WeakMap(), _LFManager_INITIALIZED = new WeakMap(), _LFManager_MANAGERS = new WeakMap();
const WINDOW = window;
if (!WINDOW.lfManager) {
    WINDOW.lfManager = new LFManager();
    WINDOW.lfManager.log('LFManager ready', { LFManager: WINDOW.lfManager }, LogSeverity.Success);
    WINDOW.lfManager.initialize();
}
