import { KulMessengerDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { NodeName, NodeWidgetMap } from '../types/nodes';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets';
import {
  areJSONEqual,
  getApiRoutes,
  getCustomWidget,
  getInput,
  getLFManager,
  isValidJSON,
  refreshChart,
  unescapeJson,
} from '../utils/common';
import { messengerFactory } from '../widgets/messenger';

export const NODE_WIDGET_MAP: NodeWidgetMap = {
  LF_BlurImages: [CustomWidgetName.masonry],
  LF_Boolean: [CustomWidgetName.history],
  LF_CharacterImpersonator: [CustomWidgetName.code],
  LF_CheckpointSelector: [CustomWidgetName.card],
  LF_CivitAIMetadataSetup: [CustomWidgetName.code],
  LF_ClarityEffect: [CustomWidgetName.compare],
  LF_ColorAnalysis: [CustomWidgetName.tabBarChart],
  LF_CompareImages: [CustomWidgetName.compare],
  LF_ControlPanel: [CustomWidgetName.controlPanel],
  LF_DisplayBoolean: [CustomWidgetName.code],
  LF_DisplayFloat: [CustomWidgetName.code],
  LF_DisplayInteger: [CustomWidgetName.code],
  LF_DisplayJSON: [CustomWidgetName.code],
  LF_DisplayPrimitiveAsJSON: [CustomWidgetName.code],
  LF_DisplayString: [CustomWidgetName.code],
  LF_EmbeddingSelector: [CustomWidgetName.card],
  LF_ExtractString: [CustomWidgetName.code],
  LF_ExtractPromptFromLoraTag: [CustomWidgetName.code],
  LF_Float: [CustomWidgetName.code],
  LF_GetRandomKeyFromJSON: [CustomWidgetName.code],
  LF_GetValueFromJSON: [CustomWidgetName.code],
  LF_ImageClassifier: [CustomWidgetName.code],
  LF_ImageHistogram: [CustomWidgetName.tabBarChart],
  LF_ImageListFromJSON: [CustomWidgetName.masonry],
  LF_ImagesSlideshow: [CustomWidgetName.carousel],
  LF_Integer: [CustomWidgetName.history],
  LF_IsLandscape: [CustomWidgetName.tree],
  LF_KeywordCounter: [CustomWidgetName.countBarChart],
  LF_KeywordToggleFromJSON: [CustomWidgetName.chip],
  LF_LLMChat: [CustomWidgetName.chat],
  LF_LLMMessenger: [CustomWidgetName.messenger],
  LF_LoadFileOnce: [CustomWidgetName.history],
  LF_LoadImages: [CustomWidgetName.masonry],
  LF_LoadLoraTags: [CustomWidgetName.cardsWithChip],
  LF_LoadMetadata: [CustomWidgetName.code, CustomWidgetName.upload],
  LF_LoraAndEmbeddingSelector: [CustomWidgetName.card],
  LF_LoraSelector: [CustomWidgetName.card],
  LF_LUTApplication: [CustomWidgetName.compare],
  LF_LUTGeneration: [CustomWidgetName.tabBarChart],
  LF_MarkdownDocGenerator: [CustomWidgetName.code],
  LF_MathOperation: [CustomWidgetName.code],
  LF_MultipleImageResizeForWeb: [CustomWidgetName.masonry],
  LF_Notify: [],
  LF_ParsePromptWithLoraTags: [CustomWidgetName.code],
  LF_RandomBoolean: [CustomWidgetName.progressbar],
  LF_RegionExtractor: [CustomWidgetName.code],
  LF_ResizeImageByEdge: [CustomWidgetName.tree],
  LF_ResizeImageToDimension: [CustomWidgetName.tree],
  LF_ResizeImageToSquare: [CustomWidgetName.tree],
  LF_ResolutionSwitcher: [CustomWidgetName.progressbar],
  LF_SamplerSelector: [CustomWidgetName.history],
  LF_SaveImageForCivitAI: [CustomWidgetName.masonry],
  LF_SaveJSON: [CustomWidgetName.tree],
  LF_SaveMarkdown: [CustomWidgetName.tree],
  LF_SchedulerSelector: [CustomWidgetName.history],
  LF_SequentialSeedsGenerator: [CustomWidgetName.history],
  LF_SetValueInJSON: [CustomWidgetName.code],
  LF_ShuffleJSONKeys: [CustomWidgetName.code],
  LF_Something2Number: [CustomWidgetName.code],
  LF_Something2String: [CustomWidgetName.code],
  LF_SortJSONKeys: [CustomWidgetName.code],
  LF_String: [CustomWidgetName.history],
  LF_StringToJSON: [CustomWidgetName.code],
  LF_SwitchFloat: [CustomWidgetName.progressbar],
  LF_SwitchImage: [CustomWidgetName.progressbar],
  LF_SwitchInteger: [CustomWidgetName.progressbar],
  LF_SwitchJSON: [CustomWidgetName.progressbar],
  LF_SwitchString: [CustomWidgetName.progressbar],
  LF_UpdateUsageStatistics: [CustomWidgetName.code],
  LF_UpscaleModelSelector: [CustomWidgetName.history],
  LF_UsageStatistics: [CustomWidgetName.tabBarChart],
  LF_UrandomSeedGenerator: [CustomWidgetName.tree],
  LF_VAESelector: [CustomWidgetName.history],
  LF_ViewImages: [CustomWidgetName.masonry],
  LF_WallOfText: [CustomWidgetName.code],
  LF_WriteJSON: [CustomWidgetName.textarea],
};

export const onConnectionsChange = async (nodeType: NodeType) => {
  const onConnectionsChange = nodeType.prototype.onConnectionsChange;
  nodeType.prototype.onConnectionsChange = function () {
    const r = onConnectionsChange?.apply(this, arguments);
    const node = this;

    switch (node.comfyClass) {
      case NodeName.keywordToggleFromJson:
        chipCb(node);
        break;

      case NodeName.llmMessenger:
        messengerCb(node);
        break;
    }

    return r;
  };
};

export const onDrawBackground = async (nodeType: NodeType) => {
  const onDrawBackground = nodeType.prototype.onDrawBackground;
  nodeType.prototype.onDrawBackground = function () {
    const r = onDrawBackground?.apply(this, arguments);
    const node = this;

    refreshChart(node);

    return r;
  };
};

export const onNodeCreated = async (nodeType: NodeType) => {
  const onNodeCreated = nodeType.prototype.onNodeCreated;

  nodeType.prototype.onNodeCreated = function () {
    const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : void 0;
    const node = this;

    for (let index = 0; index < node.widgets?.length; index++) {
      const w = node.widgets[index];

      switch (w.type.toUpperCase()) {
        case ComfyWidgetName.customtext:
        case ComfyWidgetName.string:
        case ComfyWidgetName.text:
          w.serializeValue = () => {
            const comfy = getApiRoutes().comfyUi();
            return comfy.utils.applyTextReplacements(comfy, w.value);
          };
          break;
      }
    }
    return r;
  };
};

const chipCb = (node: NodeType) => {
  const lfManager = getLFManager();
  const textarea = getInput(node, ComfyWidgetName.json);
  const linkInput = lfManager.getApiRoutes().getLinkById(textarea?.link?.toString());
  const nodeInput = lfManager.getApiRoutes().getNodeById(linkInput?.origin_id?.toString());
  if (!textarea || !linkInput || !nodeInput) {
    return;
  }

  const chipW = getCustomWidget(node, CustomWidgetName.chip);
  const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
  if (!chipW || !datasetW) {
    return;
  }

  const dataset = datasetW.options.getValue();
  const chip = chipW.options.getComp();
  try {
    const newData = unescapeJson(dataset).parsedJson;

    if (isValidJSON(newData) && isValidJSON(chip.kulData)) {
      if (!areJSONEqual(newData, chip.kulData)) {
        chip.kulData = newData;
        lfManager.log('Updated chip data', { dataset }, LogSeverity.Info);
      }
    } else {
      if (isValidJSON(newData)) {
        chip.kulData = newData;
        lfManager.log('Set chip data', { dataset }, LogSeverity.Info);
      } else {
        lfManager.log('Invalid JSON data', { dataset, error: 'Invalid JSON' }, LogSeverity.Warning);
      }
    }
  } catch (error) {
    lfManager.log('Error processing chip data', { dataset, error }, LogSeverity.Error);
  }
};

const messengerCb = (node: NodeType) => {
  const lfManager = getLFManager();
  const textarea = getInput(node, ComfyWidgetName.json);
  const linkInput = lfManager.getApiRoutes().getLinkById(textarea?.link?.toString());
  const nodeInput = lfManager.getApiRoutes().getNodeById(linkInput?.origin_id?.toString());
  if (!textarea || !linkInput || !nodeInput) {
    return;
  }

  const messengerW = getCustomWidget(node, CustomWidgetName.messenger);
  const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
  if (!messengerW?.options?.getComp || !datasetW?.options?.getValue) {
    return;
  }

  const dataset = datasetW.options.getValue();
  const messenger = messengerW.options.getComp();
  try {
    const newData = unescapeJson(dataset).parsedJson;

    if (isValidJSON(newData) && isValidJSON(messenger.kulData)) {
      if (!areJSONEqual(newData, messenger.kulData)) {
        messenger.kulData = newData as unknown as KulMessengerDataset;
        messenger.reset();
        getLFManager().log('Updated messenger data', { dataset }, LogSeverity.Info);
      }
    } else {
      if (isValidJSON(newData)) {
        messenger.kulData = newData as unknown as KulMessengerDataset;
        messenger.reset();
        getLFManager().log('Set messenger data', { dataset }, LogSeverity.Info);
      } else {
        getLFManager().log(
          'Invalid JSON data',
          { dataset, error: 'Invalid JSON' },
          LogSeverity.Warning,
        );
      }
    }
    const placeholder = messenger.nextSibling || messenger.previousSibling;
    if (messenger.kulData?.nodes?.[0]) {
      (placeholder as HTMLDivElement).classList.add(messengerFactory.cssClasses.placeholderHidden);
    } else {
      (placeholder as HTMLDivElement).classList.remove(
        messengerFactory.cssClasses.placeholderHidden,
      );
    }
  } catch (error) {
    getLFManager().log('Error processing messenger data', { dataset, error }, LogSeverity.Error);
  }
};
