import type { KulDom } from '../types/ketchup-lite/managers/kul-manager/kul-manager-declarations';
import type { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
import { defineCustomElements } from '../ketchup-lite/loader.js';
import { getKulManager } from '../utils/common.js';
import { LFNodes } from './nodes.js';
import { LFWidgets } from './widgets.js';
import { ComfyAPIs, LogSeverity } from '../types/manager.js';
import { Extension } from '../types/nodes.js';
import {
  BlurImagesPayload,
  BooleanPayload,
  CivitAIMetadataSetupPayload,
  DisplayJSONPayload,
  EventName,
  FloatPayload,
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
  SwitchImagePayload,
  SwitchIntegerPayload,
  SwitchJSONPayload,
  SwitchStringPayload,
  UrandomSeedGeneratorPayload,
  WriteJSONPayload,
} from '../types/events.js';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export interface LFWindow extends Window {
  lfManager: LFManager;
}

export class LFManager {
  #APIS: ComfyAPIs = {
    event: (name, callback) => {
      api.addEventListener(name, callback);
    },
    fetch: async (body) => {
      return await api.fetchApi('/upload/image', {
        method: 'POST',
        body,
      });
    },
    getNodeById: (id: string) => {
      return app.graph.getNodeById(+(id || app.runningNodeId));
    },
    redraw: () => {
      app.graph.setDirtyCanvas(true, false);
    },
    register: (extension: Extension) => {
      app.registerExtension(extension);
    },
  };
  #DEBUG = false;
  #DOM = document.documentElement as KulDom;
  #INITIALIZED = false;
  #MANAGERS: {
    ketchupLite?: KulManager;
    nodes?: LFNodes;
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
    this.#MANAGERS.widgets = new LFWidgets();
  }

  getApiRoutes(): ComfyAPIs {
    return this.#APIS;
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
    /*                  I n i t   D i s p l a y J S O N                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_DisplayJSON(widgets.setters.KUL_CODE, widgets.adders.KUL_CODE);
    this.#APIS.event(EventName.displayJson, (e: CustomEvent<DisplayJSONPayload>) => {
      nodes.eventHandlers.LF_DisplayJSON(e, widgets.adders.KUL_CODE);
    });
    /*-------------------------------------------------------------------*/
    /*                        I n i t   F l o a t                        */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_Float(widgets.setters.KUL_HISTORY, widgets.adders.KUL_HISTORY);
    this.#APIS.event(EventName.float, (e: CustomEvent<FloatPayload>) => {
      nodes.eventHandlers.LF_Float(e, widgets.adders.KUL_HISTORY);
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
    /*                     I n i t   L L M C h a t                       */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LLMChat(widgets.setters.KUL_CHAT, widgets.adders.KUL_CHAT);
    /*-------------------------------------------------------------------*/
    /*                I n i t   L o a d M e t a d a t a                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_LoadMetadata(widgets.setters.KUL_UPLOAD);
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
    /*                    I n i t   W r i t e   J S O N                  */
    /*-------------------------------------------------------------------*/
    this.#MANAGERS.nodes.register.LF_WriteJSON(widgets.setters.KUL_JSON_INPUT);
    this.#APIS.event(EventName.writeJson, (e: CustomEvent<WriteJSONPayload>) => {
      nodes.eventHandlers.LF_WriteJSON(e, widgets.adders.KUL_JSON_INPUT);
    });

    this.#INITIALIZED = true;
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

    console.log(`${colorCode}${dot} ${message} ${resetColorCode}`, args);
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
