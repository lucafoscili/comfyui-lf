import { CustomWidgetName } from './widgets';

/*-------------------------------------------------------------------*/
/*               C o m m o n   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export enum NodeName {
  blurImages = 'LF_BlurImages',
  boolean = 'LF_Boolean',
  checkpointSelector = 'LF_CheckpointSelector',
  civitaiMetadataSetup = 'LF_CivitAIMetadataSetup',
  clarityEffect = 'LF_ClarityEffect',
  controlPanel = 'LF_ControlPanel',
  displayBoolean = 'LF_DisplayBoolean',
  displayFloat = 'LF_DisplayFloat',
  displayInteger = 'LF_DisplayInteger',
  displayJson = 'LF_DisplayJSON',
  displayPrimitiveAsJson = 'LF_DisplayPrimitiveAsJSON',
  displayString = 'LF_DisplayString',
  float = 'LF_Float',
  embeddingSelector = 'LF_EmbeddingSelector',
  extractor = 'LF_Extractor',
  imageListFromJSON = 'LF_ImageListFromJSON',
  imageHistogram = 'LF_ImageHistogram',
  integer = 'LF_Integer',
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
  mathOperation = 'LF_MathOperation',
  multipleImageResizeForWeb = 'LF_MultipleImageResizeForWeb',
  notify = 'LF_Notify',
  randomBoolean = 'LF_RandomBoolean',
  resizeImageByEdge = 'LF_ResizeImageByEdge',
  resizeImageToDimension = 'LF_ResizeImageToDimension',
  resizeImageToSquare = 'LF_ResizeImageToSquare',
  resolutionSwitcher = 'LF_ResolutionSwitcher',
  samplerSelector = 'LF_SamplerSelector',
  saveImageForCivitai = 'LF_SaveImageForCivitAI',
  schedulerSelector = 'LF_SchedulerSelector',
  shuffleJsonKeys = 'LF_ShuffleJSONKeys',
  sortJsonKeys = 'LF_SortJSONKeys',
  string = 'LF_String',
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
  writeJson = 'LF_WriteJSON',
}
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
export interface Extension {
  beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
  getCustomWidgets?: () => AtLeastOne<Record<CustomWidgetName, Function>>;
  name: string;
  nodeCreated?: (node: NodeType) => void;
}
