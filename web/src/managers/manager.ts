import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';
import {
  BaseAPIPayload,
  ComfyAPIs,
  GetAnalyticsAPIPayload,
  GetMetadataAPIPayload,
  LFEndpoints,
  LogSeverity,
} from '../types/manager.js';
import { Extension } from '../types/nodes.js';
import {
  BlurImagesPayload,
  BooleanPayload,
  CivitAIMetadataSetupPayload,
  DisplayJSONPayload,
  DisplayPrimitiveAsJSONPayload,
  EventName,
  FloatPayload,
  ImageListFromJSONPayload,
  ImageHistogramPayload,
  IntegerPayload,
  KeywordCounterPayload,
  LoadImagesPayload,
  MultipleImageResizeForWebPayload,
  RandomBooleanPayload,
  ResizeImageByEdgePayload,
  ResizeImageToSquarePayload,
  SaveImageForCivitAIPayload,
  StringPayload,
  SwitchFloatPayload,
  SwitchImagePayload,
  SwitchIntegerPayload,
  SwitchJSONPayload,
  SwitchStringPayload,
  UrandomSeedGeneratorPayload,
  WriteJSONPayload,
  LoadFileOncePayload,
  ExtractorPayload,
  ResolutionSwitcherPayload,
  DisplayBooleanPayload,
  DisplayFloatPayload,
  DisplayIntegerPayload,
  DisplayStringPayload,
  CheckpointSelectorPayload,
  LoraSelectorPayload,
  EmbeddingSelectorPayload,
  LoraAndEmbeddingSelectorPayload,
  LoadLoraTagsPayload,
  SamplerSelectorPayload,
  SchedulerSelectorPayload,
  NotifyPayload,
  UpscaleModelSelectorPayload,
  VAESelectorPayload,
  UpdateUsageStatisticsPayload,
  ResizeImageToDimensionPayload,
  MathOperationPayload,
  SortJSONKeysPayload,
  ShuffleJSONKeysPayload,
} from '../types/events.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { KulDataDataset } from '../types/ketchup-lite/components';
import { LFTooltip } from './tooltip';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export interface LFWindow extends Window {
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
    nodes?: LFNodes;
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

    this.#MANAGERS.nodes = new LFNodes();
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
    const nodes = this.#MANAGERS.nodes.get;
    const widgets = this.#MANAGERS.widgets.get;

    /*-------------------------------------------------------------------*/
    /*                    I n i t   B l u r I m a g e s                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_BlurImages(
      widgets.setters.KUL_IMAGE_PREVIEW_B64,
      widgets.adders.KUL_IMAGE_PREVIEW_B64,
    );
    this.#APIS.event(EventName.blurImages, (e: CustomEvent<BlurImagesPayload>) => {
      nodes.eventHandlers.LF_BlurImages(e, widgets.adders.KUL_IMAGE_PREVIEW_B64);
    });
    /*-------------------------------------------------------------------*/
    /*                      I n i t   B o o l e a n                      */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_Boolean(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(EventName.boolean, (e: CustomEvent<BooleanPayload>) => {
      nodes.eventHandlers.LF_Boolean(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*            I n i t   C h e c k p o i n t S e l e c t o r          */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_CheckpointSelector(
      widgets.setters.KUL_CARD,
      widgets.adders.KUL_CARD,
    );
    this.#APIS.event(EventName.checkpointSelector, (e: CustomEvent<CheckpointSelectorPayload>) => {
      nodes.eventHandlers.LF_CheckpointSelector(e, widgets.adders.KUL_CARD);
    });
    /*-------------------------------------------------------------------*/
    /*         I n i t   C i v i t A I M e t a d a t a S e t u p         */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_CivitAIMetadataSetup(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(
      EventName.civitAIMetadataSetup,
      (e: CustomEvent<CivitAIMetadataSetupPayload>) => {
        nodes.eventHandlers.LF_CivitAIMetadataSetup(e, widgets.adders.KUL_CODE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*               I n i t   C o n t r o l   P a n e l                 */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ControlPanel(
      widgets.setters.KUL_CONTROL_PANEL,
      widgets.adders.KUL_CONTROL_PANEL,
    );
    /*-------------------------------------------------------------------*/
    /*               I n i t   D i s p l a y B o o l e a n               */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayBoolean(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.displayBoolean, (e: CustomEvent<DisplayBooleanPayload>) => {
      nodes.eventHandlers.LF_DisplayBoolean(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   D i s p l a y F l o a t                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayFloat(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.displayFloat, (e: CustomEvent<DisplayFloatPayload>) => {
      nodes.eventHandlers.LF_DisplayFloat(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   D i s p l a y I n t e g e r              */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayInteger(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.displayInteger, (e: CustomEvent<DisplayIntegerPayload>) => {
      nodes.eventHandlers.LF_DisplayInteger(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                  I n i t   D i s p l a y J S O N                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayJSON(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
    this.#APIS.event(EventName.displayJson, (e: CustomEvent<DisplayJSONPayload>) => {
      nodes.eventHandlers.LF_DisplayJSON(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*       I n i t   D i s p l a y P r i m i t i v e A s J S O N       */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayPrimitiveAsJSON(widgets.setters.KUL_CODE);
    this.#APIS.event(
      EventName.displayPrimitiveAsJson,
      (e: CustomEvent<DisplayPrimitiveAsJSONPayload>) => {
        nodes.eventHandlers.LF_DisplayPrimitiveAsJSON(e, widgets.adders.KUL_CODE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*                I n i t   D i s p l a y S t r i n g                */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayString(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.displayString, (e: CustomEvent<DisplayStringPayload>) => {
      nodes.eventHandlers.LF_DisplayString(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*             I n i t   E m b e d d i n g S e l e c t o r           */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_EmbeddingSelector(
      widgets.setters.KUL_CARD,
      widgets.adders.KUL_CARD,
    );
    this.#APIS.event(EventName.embeddingSelector, (e: CustomEvent<EmbeddingSelectorPayload>) => {
      nodes.eventHandlers.LF_EmbeddingSelector(e, widgets.adders.KUL_CARD);
    });
    /*-------------------------------------------------------------------*/
    /*                     I n i t   E x t r a c t o r                   */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_Extractor(widgets.setters.KUL_CODE);
    this.#APIS.event(EventName.extractor, (e: CustomEvent<ExtractorPayload>) => {
      nodes.eventHandlers.LF_Extractor(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                        I n i t   F l o a t                        */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_Float(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
    this.#APIS.event(EventName.float, (e: CustomEvent<FloatPayload>) => {
      nodes.eventHandlers.LF_Float(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*            I n i t   I m a g e L i s t F r o m J S O N            */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ImageListFromJSON(widgets.setters.KUL_IMAGE_PREVIEW_B64);
    this.#APIS.event(EventName.imageListFromJSON, (e: CustomEvent<ImageListFromJSONPayload>) => {
      nodes.eventHandlers.LF_ImageListFromJSON(e, widgets.adders.KUL_IMAGE_PREVIEW_B64);
    });
    /*-------------------------------------------------------------------*/
    /*               I n i t   I m a g e H i s t o g r a m               */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ImageHistogram(
      widgets.setters.KUL_HISTOGRAM,
      widgets.adders.KUL_HISTOGRAM,
    );
    this.#APIS.event(EventName.imageHistogram, (e: CustomEvent<ImageHistogramPayload>) => {
      nodes.eventHandlers.LF_ImageHistogram(e, widgets.adders.KUL_HISTOGRAM);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   I m a g e s L o a d e r                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoadImages(
      widgets.setters.KUL_IMAGE_PREVIEW_B64,
      widgets.adders.KUL_IMAGE_PREVIEW_B64,
    );
    this.#APIS.event(EventName.loadImages, (e: CustomEvent<LoadImagesPayload>) => {
      nodes.eventHandlers.LF_LoadImages(e, widgets.adders.KUL_IMAGE_PREVIEW_B64);
    });
    /*-------------------------------------------------------------------*/
    /*                      I n i t   I n t e g e r                      */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_Integer(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(EventName.integer, (e: CustomEvent<IntegerPayload>) => {
      nodes.eventHandlers.LF_Integer(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*               I n i t   K e y w o r d C o u n t e r               */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_KeywordCounter(
      widgets.setters.KUL_COUNT_BAR_CHART,
      widgets.adders.KUL_COUNT_BAR_CHART,
    );
    this.#APIS.event(EventName.keywordCounter, (e: CustomEvent<KeywordCounterPayload>) => {
      nodes.eventHandlers.LF_KeywordCounter(e, widgets.adders.KUL_COUNT_BAR_CHART);
    });
    /*-------------------------------------------------------------------*/
    /*        I n i t   K e y w o r d T o g g l e F r o m J S O N        */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_KeywordToggleFromJSON(widgets.setters.KUL_CHIP);
    /*-------------------------------------------------------------------*/
    /*                     I n i t   L L M C h a t                       */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LLMChat(widgets.setters.KUL_CHAT, widgets.adders.KUL_CHAT);
    /*-------------------------------------------------------------------*/
    /*                I n i t   L L M M e s s e n g e r                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LLMMessenger(widgets.setters.KUL_MESSENGER);
    /*-------------------------------------------------------------------*/
    /*                I n i t   L o a d F i l e O n c e                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoadFileOnce(widgets.setters.KUL_HISTORY);
    this.#APIS.event(EventName.loadFileOnce, (e: CustomEvent<LoadFileOncePayload>) => {
      nodes.eventHandlers.LF_LoadFileOnce(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   L o a d L o r a T a g s                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoadLoraTags(
      widgets.setters.KUL_CARDS_WITH_CHIP,
      widgets.adders.KUL_CARDS_WITH_CHIP,
    );
    this.#APIS.event(EventName.loadLoraTags, (e: CustomEvent<LoadLoraTagsPayload>) => {
      nodes.eventHandlers.LF_LoadLoraTags(e, widgets.adders.KUL_CARDS_WITH_CHIP);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   L o a d M e t a d a t a                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoadMetadata(widgets.setters.KUL_UPLOAD);
    /*-------------------------------------------------------------------*/
    /*                I n i t   L o r a S e l e c t o r                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoraSelector(
      widgets.setters.KUL_CARD,
      widgets.adders.KUL_CARD,
    );
    this.#APIS.event(EventName.loraSelector, (e: CustomEvent<LoraSelectorPayload>) => {
      nodes.eventHandlers.LF_LoraSelector(e, widgets.adders.KUL_CARD);
    });
    /*-------------------------------------------------------------------*/
    /*     I n i t   L o r a A n d E m b e d d i n g S e l e c t o r     */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoraAndEmbeddingSelector(
      widgets.setters.KUL_CARD,
      widgets.adders.KUL_CARD,
    );
    this.#APIS.event(
      EventName.loraAndEmbeddingSelector,
      (e: CustomEvent<LoraAndEmbeddingSelectorPayload>) => {
        nodes.eventHandlers.LF_LoraAndEmbeddingSelector(e, widgets.adders.KUL_CARD);
      },
    );
    /*-------------------------------------------------------------------*/
    /*               I n i t   M a t h O p e r a t i o n                 */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_MathOperation(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.mathOperation, (e: CustomEvent<MathOperationPayload>) => {
      nodes.eventHandlers.LF_MathOperation(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                       I n i t   N o t i f y                       */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_Notify();
    this.#APIS.event(EventName.notify, (e: CustomEvent<NotifyPayload>) => {
      nodes.eventHandlers.LF_Notify(e);
    });
    /*-------------------------------------------------------------------*/
    /*     I n i t   M u l t i p l e   R e s i z e   F o r   W e b       */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_MultipleImageResizeForWeb(
      widgets.setters.KUL_TREE,
      widgets.adders.KUL_TREE,
    );
    this.#APIS.event(
      EventName.multipleImageResizeForWeb,
      (e: CustomEvent<MultipleImageResizeForWebPayload>) => {
        nodes.eventHandlers.LF_MultipleImageResizeForWeb(e, widgets.adders.KUL_TREE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*               I n i t   R a n d o m   B o o l e a n               */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_RandomBoolean(
      widgets.setters.KUL_ROLL_VIEWER,
      widgets.adders.KUL_ROLL_VIEWER,
    );
    this.#APIS.event(EventName.randomBoolean, (e: CustomEvent<RandomBooleanPayload>) => {
      nodes.eventHandlers.LF_RandomBoolean(e, widgets.adders.KUL_ROLL_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*            I n i t   R e s i z e I m a g e B y E d g e            */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ResizeImageByEdge(
      widgets.setters.KUL_TREE,
      widgets.adders.KUL_TREE,
    );
    this.#APIS.event(EventName.resizeimageByEdge, (e: CustomEvent<ResizeImageByEdgePayload>) => {
      nodes.eventHandlers.LF_ResizeImageByEdge(e, widgets.adders.KUL_TREE);
    });
    /*-------------------------------------------------------------------*/
    /*       I n i t   R e s i z e I m a g e T o D i m e n s i o n       */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ResizeImageToDimension(
      widgets.setters.KUL_TREE,
      widgets.adders.KUL_TREE,
    );
    this.#APIS.event(
      EventName.resizeimageToDimension,
      (e: CustomEvent<ResizeImageToDimensionPayload>) => {
        nodes.eventHandlers.LF_ResizeImageToDimension(e, widgets.adders.KUL_TREE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*          I n i t   R e s i z e I m a g e T o S q u a r e          */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ResizeImageToSquare(
      widgets.setters.KUL_TREE,
      widgets.adders.KUL_TREE,
    );
    this.#APIS.event(
      EventName.resizeimageToSquare,
      (e: CustomEvent<ResizeImageToSquarePayload>) => {
        nodes.eventHandlers.LF_ResizeImageToSquare(e, widgets.adders.KUL_TREE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*           I n i t   R e s o l u t i o n S w i t c h e r           */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ResolutionSwitcher(
      widgets.setters.KUL_ROLL_VIEWER,
      widgets.adders.KUL_ROLL_VIEWER,
    );
    this.#APIS.event(EventName.resolutionSwitcher, (e: CustomEvent<ResolutionSwitcherPayload>) => {
      nodes.eventHandlers.LF_ResolutionSwitcher(e, widgets.adders.KUL_ROLL_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*               I n i t   S a m p l e r S e l e c t o r             */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SamplerSelector(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(EventName.samplerSelector, (e: CustomEvent<SamplerSelectorPayload>) => {
      nodes.eventHandlers.LF_SamplerSelector(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*          I n i t   S a v e I m a g e F o r C i v i t A I          */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SaveImageForCivitAI(
      widgets.setters.KUL_IMAGE_PREVIEW_B64,
      widgets.adders.KUL_IMAGE_PREVIEW_B64,
    );
    this.#APIS.event(
      EventName.saveImageForCivitAI,
      (e: CustomEvent<SaveImageForCivitAIPayload>) => {
        nodes.eventHandlers.LF_SaveImageForCivitAI(e, widgets.adders.KUL_IMAGE_PREVIEW_B64);
      },
    );
    /*-------------------------------------------------------------------*/
    /*           I n i t   S c h e d u l e r S e l e c t o r             */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SchedulerSelector(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(EventName.schedulerSelector, (e: CustomEvent<SchedulerSelectorPayload>) => {
      nodes.eventHandlers.LF_SchedulerSelector(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*              I n i t   S h u f f l e J S O N K e y s              */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_ShuffleJSONKeys(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.shuffleJsonKeys, (e: CustomEvent<ShuffleJSONKeysPayload>) => {
      nodes.eventHandlers.LF_ShuffleJSONKeys(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                 I n i t   S o r t J S O N K e y s                 */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SortJSONKeys(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(EventName.sortJsonKeys, (e: CustomEvent<SortJSONKeysPayload>) => {
      nodes.eventHandlers.LF_SortJSONKeys(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                      I n i t   S t r i n g                        */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_String(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(EventName.string, (e: CustomEvent<StringPayload>) => {
      nodes.eventHandlers.LF_String(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*                 I n i t   S w i t c h   F l o a t                 */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SwitchFloat(
      widgets.setters.KUL_BOOLEAN_VIEWER,
      widgets.adders.KUL_BOOLEAN_VIEWER,
    );
    this.#APIS.event(EventName.switchFloat, (e: CustomEvent<SwitchFloatPayload>) => {
      nodes.eventHandlers.LF_SwitchFloat(e, widgets.adders.KUL_BOOLEAN_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*                 I n i t   S w i t c h   I m a g e                 */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SwitchImage(
      widgets.setters.KUL_BOOLEAN_VIEWER,
      widgets.adders.KUL_BOOLEAN_VIEWER,
    );
    this.#APIS.event(EventName.switchImage, (e: CustomEvent<SwitchImagePayload>) => {
      nodes.eventHandlers.LF_SwitchImage(e, widgets.adders.KUL_BOOLEAN_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   S w i t c h   I n t e g e r              */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SwitchInteger(
      widgets.setters.KUL_BOOLEAN_VIEWER,
      widgets.adders.KUL_BOOLEAN_VIEWER,
    );
    this.#APIS.event(EventName.switchInteger, (e: CustomEvent<SwitchIntegerPayload>) => {
      nodes.eventHandlers.LF_SwitchInteger(e, widgets.adders.KUL_BOOLEAN_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*                  I n i t   S w i t c h   J S O N                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SwitchJSON(
      widgets.setters.KUL_BOOLEAN_VIEWER,
      widgets.adders.KUL_BOOLEAN_VIEWER,
    );
    this.#APIS.event(EventName.switchJson, (e: CustomEvent<SwitchJSONPayload>) => {
      nodes.eventHandlers.LF_SwitchJSON(e, widgets.adders.KUL_BOOLEAN_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*                I n i t   S w i t c h   S t r i n g                */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_SwitchString(
      widgets.setters.KUL_BOOLEAN_VIEWER,
      widgets.adders.KUL_BOOLEAN_VIEWER,
    );
    this.#APIS.event(EventName.switchString, (e: CustomEvent<SwitchStringPayload>) => {
      nodes.eventHandlers.LF_SwitchString(e, widgets.adders.KUL_BOOLEAN_VIEWER);
    });
    /*-------------------------------------------------------------------*/
    /*       I n i t   U p d a t e U s a g e S t a t i s t i c s         */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_UpdateUsageStatistics(
      widgets.setters.KUL_CODE,
      widgets.adders.KUL_CODE,
    );
    this.#APIS.event(
      EventName.updateUsageStatistics,
      (e: CustomEvent<UpdateUsageStatisticsPayload>) => {
        nodes.eventHandlers.LF_UpdateUsageStatistics(e, widgets.adders.KUL_CODE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*         I n i t   U p s c a l e M o d e l S e l e c t o r         */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_UpscaleModelSelector(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(
      EventName.upscaleModelSelector,
      (e: CustomEvent<UpscaleModelSelectorPayload>) => {
        nodes.eventHandlers.LF_UpscaleModelSelector(e, widgets.adders.KUL_HISTORY);
      },
    );
    /*-------------------------------------------------------------------*/
    /*      I n i t   U r a n d o m   S e e d   G e n e r a t o r        */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_UrandomSeedGenerator(
      widgets.setters.KUL_TREE,
      widgets.adders.KUL_TREE,
    );
    this.#APIS.event(
      EventName.urandomSeedGenerator,
      (e: CustomEvent<UrandomSeedGeneratorPayload>) => {
        nodes.eventHandlers.LF_UrandomSeedGenerator(e, widgets.adders.KUL_TREE);
      },
    );
    /*-------------------------------------------------------------------*/
    /*             I n i t   U s a g e S t a t i s t i c s               */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_UsageStatistics(
      widgets.setters.KUL_TAB_BAR_CHART,
      widgets.adders.KUL_TAB_BAR_CHART,
    );
    this.#APIS.event(
      EventName.updateUsageStatistics,
      (e: CustomEvent<UpdateUsageStatisticsPayload>) => {
        nodes.eventHandlers.LF_UsageStatistics(e, widgets.adders.KUL_TAB_BAR_CHART);
      },
    );
    /*-------------------------------------------------------------------*/
    /*                  I n i t   V A E S e l e c t o r                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_VAESelector(
      widgets.setters.KUL_HISTORY,
      widgets.adders.KUL_HISTORY,
    );
    this.#APIS.event(EventName.vaeSelector, (e: CustomEvent<VAESelectorPayload>) => {
      nodes.eventHandlers.LF_VAESelector(e, widgets.adders.KUL_HISTORY);
    });
    /*-------------------------------------------------------------------*/
    /*                    I n i t   W r i t e   J S O N                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_WriteJSON(widgets.setters.KUL_JSON_INPUT);
    this.#APIS.event(EventName.writeJson, (e: CustomEvent<WriteJSONPayload>) => {
      nodes.eventHandlers.LF_WriteJSON(e, widgets.adders.KUL_JSON_INPUT);
    });

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

    console.log(`${colorCode}${dot} ${message} ${resetColorCode}`, args);
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
