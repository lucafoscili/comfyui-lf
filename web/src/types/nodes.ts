import { EventPayload } from './events';
import { CustomWidgetName } from './widgets';

/*-------------------------------------------------------------------*/
/*               C o m m o n   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export enum NodeName {
  blurImages = 'LF_BlurImages',
  boolean = 'LF_Boolean',
  characterImpersonator = 'LF_CharacterImpersonator',
  checkpointSelector = 'LF_CheckpointSelector',
  civitaiMetadataSetup = 'LF_CivitAIMetadataSetup',
  clarityEffect = 'LF_ClarityEffect',
  colorAnalysis = 'LF_ColorAnalysis',
  compareImages = 'LF_CompareImages',
  controlPanel = 'LF_ControlPanel',
  displayBoolean = 'LF_DisplayBoolean',
  displayFloat = 'LF_DisplayFloat',
  displayInteger = 'LF_DisplayInteger',
  displayJson = 'LF_DisplayJSON',
  displayPrimitiveAsJson = 'LF_DisplayPrimitiveAsJSON',
  displayString = 'LF_DisplayString',
  markdownDocGenerator = 'LF_MarkdownDocGenerator',
  float = 'LF_Float',
  embeddingSelector = 'LF_EmbeddingSelector',
  extractString = 'LF_ExtractString',
  extractPromptFromLoraTag = 'LF_ExtractPromptFromLoraTag',
  getValueFromJson = 'LF_GetValueFromJSON',
  getRandomKeyFromJson = 'LF_GetRandomKeyFromJSON',
  imageClassifier = 'LF_ImageClassifier',
  imageListFromJSON = 'LF_ImageListFromJSON',
  imageHistogram = 'LF_ImageHistogram',
  integer = 'LF_Integer',
  isLandscape = 'LF_IsLandscape',
  keywordCounter = 'LF_KeywordCounter',
  keywordToggleFromJson = 'LF_KeywordToggleFromJSON',
  llmChat = 'LF_LLMChat',
  llmMessenger = 'LF_LLMMessenger',
  loadFileOnce = 'LF_LoadFileOnce',
  loadImages = 'LF_LoadImages',
  loadLoraTags = 'LF_LoadLoraTags',
  loadMetadata = 'LF_LoadMetadata',
  loraAndEmbeddingSelector = 'LF_LoraAndEmbeddingSelector',
  loraSelector = 'LF_LoraSelector',
  lutApplication = 'LF_LUTApplication',
  lutGeneration = 'LF_LUTGeneration',
  mathOperation = 'LF_MathOperation',
  multipleImageResizeForWeb = 'LF_MultipleImageResizeForWeb',
  notify = 'LF_Notify',
  parsePromptWithLoraTags = 'LF_ParsePromptWithLoraTags',
  randomBoolean = 'LF_RandomBoolean',
  regionExtractor = 'LF_RegionExtractor',
  resizeImageByEdge = 'LF_ResizeImageByEdge',
  resizeImageToDimension = 'LF_ResizeImageToDimension',
  resizeImageToSquare = 'LF_ResizeImageToSquare',
  resolutionSwitcher = 'LF_ResolutionSwitcher',
  samplerSelector = 'LF_SamplerSelector',
  saveImageForCivitai = 'LF_SaveImageForCivitAI',
  saveJson = 'LF_SaveJSON',
  saveMarkdown = 'LF_SaveMarkdown',
  schedulerSelector = 'LF_SchedulerSelector',
  sequentialSeedsGenerator = 'LF_SequentialSeedsGenerator',
  setValueInJson = 'LF_SetValueInJSON',
  shuffleJsonKeys = 'LF_ShuffleJSONKeys',
  imagesSlideshow = 'LF_ImagesSlideshow',
  something2Number = 'LF_Something2Number',
  something2String = 'LF_Something2String',
  sortJsonKeys = 'LF_SortJSONKeys',
  string = 'LF_String',
  stringToJson = 'LF_StringToJSON',
  switchFloat = 'LF_SwitchFloat',
  switchImage = 'LF_SwitchImage',
  switchInteger = 'LF_SwitchInteger',
  switchJson = 'LF_SwitchJSON',
  switchString = 'LF_SwitchString',
  updateUsageStatistics = 'LF_UpdateUsageStatistics',
  upscaleModelSelector = 'LF_UpscaleModelSelector',
  urandomSeedGenerator = 'LF_UrandomSeedGenerator',
  usageStatistics = 'LF_UsageStatistics',
  vaeSelector = 'LF_VAESelector',
  viewImages = 'LF_ViewImages',
  wallOfText = 'LF_WallOfText',
  writeJson = 'LF_WriteJSON',
}
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
export type CustomWidgetGetter = Record<CustomWidgetName, Function>;
export interface Extension {
  beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
  getCustomWidgets?: () => AtLeastOne<Partial<CustomWidgetGetter>>;
  name: string;
  nodeCreated?: (node: NodeType) => void;
}
export type NodePayloadMap = {
  [N in NodeName]: EventPayload<CustomWidgetName>;
};
export type NodeWidgetMap = {
  [N in NodeName]: CustomWidgetName[];
};
