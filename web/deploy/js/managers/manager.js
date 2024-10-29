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
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';
import { LFEndpoints, LogSeverity, } from '../types/manager.js';
import { EventName, } from '../types/events.js';
import { LFTooltip } from './tooltip.js';
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
                        const response = await api.fetchApi(LFEndpoints.ClearAnalytics, {
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
                        const response = await api.fetchApi(LFEndpoints.GetAnalytics, {
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
                        const response = await api.fetchApi(LFEndpoints.NewBackup, { body, method: 'POST' });
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
                        const response = await api.fetchApi(LFEndpoints.ClearMetadata, {
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
                        const response = await api.fetchApi(LFEndpoints.SaveMetadata, {
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
                        const response = await api.fetchApi(LFEndpoints.UpdateMetadataCover, {
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
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes = new LFNodes();
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
    getManagers() {
        return __classPrivateFieldGet(this, _LFManager_MANAGERS, "f");
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
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_BlurImages(widgets.setters.KUL_MASONRY, widgets.adders.KUL_MASONRY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.blurImages, (e) => {
            nodes.eventHandlers.LF_BlurImages(e, widgets.adders.KUL_MASONRY);
        });
        /*-------------------------------------------------------------------*/
        /*                      I n i t   B o o l e a n                      */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Boolean(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.boolean, (e) => {
            nodes.eventHandlers.LF_Boolean(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*         I n i t   C h a r a c t e r I m p e r s o n a t o r       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_CharacterImpersonator(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.characterImpersonator, (e) => {
            nodes.eventHandlers.LF_CharacterImpersonator(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*            I n i t   C h e c k p o i n t S e l e c t o r          */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_CheckpointSelector(widgets.setters.KUL_CARD, widgets.adders.KUL_CARD);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.checkpointSelector, (e) => {
            nodes.eventHandlers.LF_CheckpointSelector(e, widgets.adders.KUL_CARD);
        });
        /*-------------------------------------------------------------------*/
        /*         I n i t   C i v i t A I M e t a d a t a S e t u p         */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_CivitAIMetadataSetup(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.civitAIMetadataSetup, (e) => {
            nodes.eventHandlers.LF_CivitAIMetadataSetup(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   C l a r i t y E f f e c t                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ClarityEffect(widgets.setters.KUL_COMPARE, widgets.adders.KUL_COMPARE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.clarityEffect, (e) => {
            nodes.eventHandlers.LF_ClarityEffect(e, widgets.adders.KUL_COMPARE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   C o m p a r e I m a g e s                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_CompareImages(widgets.setters.KUL_COMPARE, widgets.adders.KUL_COMPARE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.compareImages, (e) => {
            nodes.eventHandlers.LF_CompareImages(e, widgets.adders.KUL_COMPARE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   C o n t r o l   P a n e l                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ControlPanel(widgets.setters.KUL_CONTROL_PANEL, widgets.adders.KUL_CONTROL_PANEL);
        /*-------------------------------------------------------------------*/
        /*               I n i t   D i s p l a y B o o l e a n               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayBoolean(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayBoolean, (e) => {
            nodes.eventHandlers.LF_DisplayBoolean(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   D i s p l a y F l o a t                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayFloat(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayFloat, (e) => {
            nodes.eventHandlers.LF_DisplayFloat(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   D i s p l a y I n t e g e r              */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayInteger(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayInteger, (e) => {
            nodes.eventHandlers.LF_DisplayInteger(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                  I n i t   D i s p l a y J S O N                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayJSON(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayJson, (e) => {
            nodes.eventHandlers.LF_DisplayJSON(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*       I n i t   D i s p l a y P r i m i t i v e A s J S O N       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayPrimitiveAsJSON(widgets.setters.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayPrimitiveAsJson, (e) => {
            nodes.eventHandlers.LF_DisplayPrimitiveAsJSON(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   D i s p l a y S t r i n g                */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_DisplayString(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.displayString, (e) => {
            nodes.eventHandlers.LF_DisplayString(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*             I n i t   E m b e d d i n g S e l e c t o r           */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_EmbeddingSelector(widgets.setters.KUL_CARD, widgets.adders.KUL_CARD);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.embeddingSelector, (e) => {
            nodes.eventHandlers.LF_EmbeddingSelector(e, widgets.adders.KUL_CARD);
        });
        /*-------------------------------------------------------------------*/
        /*                     I n i t   E x t r a c t o r                   */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Extractor(widgets.setters.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.extractor, (e) => {
            nodes.eventHandlers.LF_Extractor(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                        I n i t   F l o a t                        */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Float(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.float, (e) => {
            nodes.eventHandlers.LF_Float(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   I m a g e C l a s s i f i e r             */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ImageClassifier(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.imageClassifier, (e) => {
            nodes.eventHandlers.LF_ImageClassifier(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*            I n i t   I m a g e L i s t F r o m J S O N            */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ImageListFromJSON(widgets.setters.KUL_MASONRY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.imageListFromJSON, (e) => {
            nodes.eventHandlers.LF_ImageListFromJSON(e, widgets.adders.KUL_MASONRY);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   I m a g e H i s t o g r a m               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ImageHistogram(widgets.setters.KUL_TAB_BAR_CHART, widgets.adders.KUL_TAB_BAR_CHART);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.imageHistogram, (e) => {
            nodes.eventHandlers.LF_ImageHistogram(e, widgets.adders.KUL_TAB_BAR_CHART);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   I m a g e s L o a d e r                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoadImages(widgets.setters.KUL_MASONRY, widgets.adders.KUL_MASONRY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loadImages, (e) => {
            nodes.eventHandlers.LF_LoadImages(e, widgets.adders.KUL_MASONRY);
        });
        /*-------------------------------------------------------------------*/
        /*                      I n i t   I n t e g e r                      */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Integer(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.integer, (e) => {
            nodes.eventHandlers.LF_Integer(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*                   I n i t   I s L a n d s c a p e                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_IsLandscape(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.isLandscape, (e) => {
            nodes.eventHandlers.LF_IsLandscape(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   K e y w o r d C o u n t e r               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_KeywordCounter(widgets.setters.KUL_COUNT_BAR_CHART, widgets.adders.KUL_COUNT_BAR_CHART);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.keywordCounter, (e) => {
            nodes.eventHandlers.LF_KeywordCounter(e, widgets.adders.KUL_COUNT_BAR_CHART);
        });
        /*-------------------------------------------------------------------*/
        /*        I n i t   K e y w o r d T o g g l e F r o m J S O N        */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_KeywordToggleFromJSON(widgets.setters.KUL_CHIP);
        /*-------------------------------------------------------------------*/
        /*                     I n i t   L L M C h a t                       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LLMChat(widgets.setters.KUL_CHAT, widgets.adders.KUL_CHAT);
        /*-------------------------------------------------------------------*/
        /*                I n i t   L L M M e s s e n g e r                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LLMMessenger(widgets.setters.KUL_MESSENGER);
        /*-------------------------------------------------------------------*/
        /*                I n i t   L o a d F i l e O n c e                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoadFileOnce(widgets.setters.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loadFileOnce, (e) => {
            nodes.eventHandlers.LF_LoadFileOnce(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   L o a d L o r a T a g s                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoadLoraTags(widgets.setters.KUL_CARDS_WITH_CHIP, widgets.adders.KUL_CARDS_WITH_CHIP);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loadLoraTags, (e) => {
            nodes.eventHandlers.LF_LoadLoraTags(e, widgets.adders.KUL_CARDS_WITH_CHIP);
        });
        /*-------------------------------------------------------------------*/
        /*                I n i t   L o a d M e t a d a t a                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoadMetadata(widgets.setters.KUL_UPLOAD);
        /*-------------------------------------------------------------------*/
        /*                I n i t   L o r a S e l e c t o r                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoraSelector(widgets.setters.KUL_CARD, widgets.adders.KUL_CARD);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loraSelector, (e) => {
            nodes.eventHandlers.LF_LoraSelector(e, widgets.adders.KUL_CARD);
        });
        /*-------------------------------------------------------------------*/
        /*     I n i t   L o r a A n d E m b e d d i n g S e l e c t o r     */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoraAndEmbeddingSelector(widgets.setters.KUL_CARD, widgets.adders.KUL_CARD);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loraAndEmbeddingSelector, (e) => {
            nodes.eventHandlers.LF_LoraAndEmbeddingSelector(e, widgets.adders.KUL_CARD);
        });
        /*-------------------------------------------------------------------*/
        /*                  I n i t   L o r a 2 P r o m p t                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Lora2Prompt(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.lora2Prompt, (e) => {
            nodes.eventHandlers.LF_Lora2Prompt(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*              I n i t   L o r a T a g 2 P r o m p t                */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_LoraTag2Prompt(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.loraTag2Prompt, (e) => {
            nodes.eventHandlers.LF_LoraTag2Prompt(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   M a t h O p e r a t i o n                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_MathOperation(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.mathOperation, (e) => {
            nodes.eventHandlers.LF_MathOperation(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                       I n i t   N o t i f y                       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Notify();
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.notify, (e) => {
            nodes.eventHandlers.LF_Notify(e);
        });
        /*-------------------------------------------------------------------*/
        /*     I n i t   M u l t i p l e   R e s i z e   F o r   W e b       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_MultipleImageResizeForWeb(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.multipleImageResizeForWeb, (e) => {
            nodes.eventHandlers.LF_MultipleImageResizeForWeb(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   R a n d o m   B o o l e a n               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_RandomBoolean(widgets.setters.KUL_ROLL_VIEWER, widgets.adders.KUL_ROLL_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.randomBoolean, (e) => {
            nodes.eventHandlers.LF_RandomBoolean(e, widgets.adders.KUL_ROLL_VIEWER);
        });
        /*-------------------------------------------------------------------*/
        /*            I n i t   R e s i z e I m a g e B y E d g e            */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ResizeImageByEdge(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.resizeimageByEdge, (e) => {
            nodes.eventHandlers.LF_ResizeImageByEdge(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*       I n i t   R e s i z e I m a g e T o D i m e n s i o n       */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ResizeImageToDimension(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.resizeimageToDimension, (e) => {
            nodes.eventHandlers.LF_ResizeImageToDimension(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*          I n i t   R e s i z e I m a g e T o S q u a r e          */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ResizeImageToSquare(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.resizeimageToSquare, (e) => {
            nodes.eventHandlers.LF_ResizeImageToSquare(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*           I n i t   R e s o l u t i o n S w i t c h e r           */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ResolutionSwitcher(widgets.setters.KUL_ROLL_VIEWER, widgets.adders.KUL_ROLL_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.resolutionSwitcher, (e) => {
            nodes.eventHandlers.LF_ResolutionSwitcher(e, widgets.adders.KUL_ROLL_VIEWER);
        });
        /*-------------------------------------------------------------------*/
        /*               I n i t   S a m p l e r S e l e c t o r             */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SamplerSelector(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.samplerSelector, (e) => {
            nodes.eventHandlers.LF_SamplerSelector(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*          I n i t   S a v e I m a g e F o r C i v i t A I          */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SaveImageForCivitAI(widgets.setters.KUL_MASONRY, widgets.adders.KUL_MASONRY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.saveImageForCivitAI, (e) => {
            nodes.eventHandlers.LF_SaveImageForCivitAI(e, widgets.adders.KUL_MASONRY);
        });
        /*-------------------------------------------------------------------*/
        /*                    I n i t   S a v e J S O N                      */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SaveJSON(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.saveJson, (e) => {
            nodes.eventHandlers.LF_SaveJSON(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*           I n i t   S c h e d u l e r S e l e c t o r             */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SchedulerSelector(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.schedulerSelector, (e) => {
            nodes.eventHandlers.LF_SchedulerSelector(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*     I n i t   S e q u e n t i a l S e e d s G e n e r a t o r     */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SequentialSeedsGenerator(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.sequentialSeedsGenerator, (e) => {
            nodes.eventHandlers.LF_SequentialSeedsGenerator(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*              I n i t   S h u f f l e J S O N K e y s              */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_ShuffleJSONKeys(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.shuffleJsonKeys, (e) => {
            nodes.eventHandlers.LF_ShuffleJSONKeys(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*             I n i t   S o m e t h i n g 2 N u m b e r             */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Something2Number(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.something2Number, (e) => {
            nodes.eventHandlers.LF_Something2Number(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*             I n i t   S o m e t h i n g 2 S t r i n g             */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_Something2String(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.something2String, (e) => {
            nodes.eventHandlers.LF_Something2String(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                 I n i t   S o r t J S O N K e y s                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SortJSONKeys(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.sortJsonKeys, (e) => {
            nodes.eventHandlers.LF_SortJSONKeys(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*                      I n i t   S t r i n g                        */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_String(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.string, (e) => {
            nodes.eventHandlers.LF_String(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*                 I n i t   S w i t c h   F l o a t                 */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_SwitchFloat(widgets.setters.KUL_BOOLEAN_VIEWER, widgets.adders.KUL_BOOLEAN_VIEWER);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.switchFloat, (e) => {
            nodes.eventHandlers.LF_SwitchFloat(e, widgets.adders.KUL_BOOLEAN_VIEWER);
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
        /*       I n i t   U p d a t e U s a g e S t a t i s t i c s         */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_UpdateUsageStatistics(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.updateUsageStatistics, (e) => {
            nodes.eventHandlers.LF_UpdateUsageStatistics(e, widgets.adders.KUL_CODE);
        });
        /*-------------------------------------------------------------------*/
        /*         I n i t   U p s c a l e M o d e l S e l e c t o r         */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_UpscaleModelSelector(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.upscaleModelSelector, (e) => {
            nodes.eventHandlers.LF_UpscaleModelSelector(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*      I n i t   U r a n d o m   S e e d   G e n e r a t o r        */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_UrandomSeedGenerator(widgets.setters.KUL_TREE, widgets.adders.KUL_TREE);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.urandomSeedGenerator, (e) => {
            nodes.eventHandlers.LF_UrandomSeedGenerator(e, widgets.adders.KUL_TREE);
        });
        /*-------------------------------------------------------------------*/
        /*             I n i t   U s a g e S t a t i s t i c s               */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_UsageStatistics(widgets.setters.KUL_TAB_BAR_CHART, widgets.adders.KUL_TAB_BAR_CHART);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.updateUsageStatistics, (e) => {
            nodes.eventHandlers.LF_UsageStatistics(e, widgets.adders.KUL_TAB_BAR_CHART);
        });
        /*-------------------------------------------------------------------*/
        /*                  I n i t   V A E S e l e c t o r                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_VAESelector(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.vaeSelector, (e) => {
            nodes.eventHandlers.LF_VAESelector(e, widgets.adders.KUL_HISTORY);
        });
        /*-------------------------------------------------------------------*/
        /*                    I n i t   W r i t e   J S O N                  */
        /*-------------------------------------------------------------------*/
        __classPrivateFieldGet(this, _LFManager_MANAGERS, "f").nodes.register.LF_WriteJSON(widgets.setters.KUL_JSON_INPUT);
        __classPrivateFieldGet(this, _LFManager_APIS, "f").event(EventName.writeJson, (e) => {
            nodes.eventHandlers.LF_WriteJSON(e, widgets.adders.KUL_JSON_INPUT);
        });
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
        console.log(`${colorCode}${dot} ${message} ${resetColorCode}`, args);
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
