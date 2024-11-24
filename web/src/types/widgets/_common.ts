import { EventPayload } from '../events/events';
import { Card, CardDeserializedValue, CardOptions, CardOptionsCallback } from './card';
import {
  CardsWithChip,
  CardsWithChipDeserializedValue,
  CardsWithChipOptions,
  CardsWithChipOptionsCallback,
} from './cardsWithChip';
import {
  Carousel,
  CarouselDeserializedValue,
  CarouselOptions,
  CarouselOptionsCallback,
} from './carousel';
import { Chat, ChatOptions, ChatOptionsCallback, ChatValueDeserializedValue } from './chat';
import { Chip, ChipOptions, ChipOptionsCallback, ChipValueDeserializedValue } from './chip';
import { Code, CodeOptions, CodeOptionsCallback, CodeValueDeserializedValue } from './code';
import {
  Compare,
  CompareOptions,
  CompareOptionsCallback,
  CompareValueDeserializedValue,
} from './compare';
import {
  ControlPanel,
  ControlPanelDeserializedValue,
  ControlPanelOptions,
  ControlPanelOptionsCallback,
} from './controlPanel';
import {
  CountBarChart,
  CountBarChartDeserializedValue,
  CountBarChartOptions,
  CountBarChartOptionsCallback,
} from './countBarChart';
import {
  History,
  HistoryOptions,
  HistoryOptionsCallback,
  HistoryDeserializedValue,
} from './history';
import {
  ImageEditor,
  ImageEditorDeserializedValue,
  ImageEditorOptions,
  ImageEditorOptionsCallback,
} from './imageEditor';
import {
  Masonry,
  MasonryDeserializedValue,
  MasonryOptions,
  MasonryOptionsCallback,
} from './masonry';
import {
  Messenger,
  MessengerDeserializedValue,
  MessengerOptions,
  MessengerOptionsCallback,
} from './messenger';
import {
  Progressbar,
  ProgressbarDeserializedValue,
  ProgressbarOptions,
  ProgressbarOptionsCallback,
} from './progressBar';
import {
  TabBarChart,
  TabBarChartDeserializedValue,
  TabBarChartOptions,
  TabBarChartOptionsCallback,
} from './tabBarChart';
import {
  Textarea,
  TextareaDeserializedValue,
  TextareaOptions,
  TextareaOptionsCallback,
} from './textarea';
import { Tree, TreeOptions, TreeOptionsCallback, TreeValueDeserializedValue } from './tree';
import { Upload, UploadDeserializedValue, UploadOptions, UploadOptionsCallback } from './upload';

//#region Enums
export enum ComfyWidgetName {
  boolean = 'BOOLEAN',
  combo = 'COMBO',
  customtext = 'CUSTOMTEXT',
  float = 'FLOAT',
  integer = 'INTEGER',
  json = 'JSON',
  number = 'NUMBER',
  seed = 'SEED',
  string = 'STRING',
  text = 'TEXT',
  toggle = 'TOGGLE',
}
export enum CustomWidgetName {
  card = 'KUL_CARD',
  cardsWithChip = 'KUL_CARDS_WITH_CHIP',
  carousel = 'KUL_CAROUSEL',
  chat = 'KUL_CHAT',
  chip = 'KUL_CHIP',
  code = 'KUL_CODE',
  compare = 'KUL_COMPARE',
  controlPanel = 'KUL_CONTROL_PANEL',
  countBarChart = 'KUL_COUNT_BAR_CHART',
  history = 'KUL_HISTORY',
  imageEditor = 'KUL_IMAGE_EDITOR',
  masonry = 'KUL_MASONRY',
  messenger = 'KUL_MESSENGER',
  progressbar = 'KUL_PROGRESSBAR',
  tabBarChart = 'KUL_TAB_BAR_CHART',
  textarea = 'KUL_TEXTAREA',
  tree = 'KUL_TREE',
  upload = 'KUL_UPLOAD',
}
export enum NodeName {
  blurImages = 'LF_BlurImages',
  boolean = 'LF_Boolean',
  brightness = 'LF_Brightness',
  brush = 'LF_Brush',
  characterImpersonator = 'LF_CharacterImpersonator',
  checkpointSelector = 'LF_CheckpointSelector',
  civitaiMetadataSetup = 'LF_CivitAIMetadataSetup',
  clarity = 'LF_Clarity',
  colorAnalysis = 'LF_ColorAnalysis',
  compareImages = 'LF_CompareImages',
  contrast = 'LF_Contrast',
  controlPanel = 'LF_ControlPanel',
  desaturation = 'LF_Desaturation',
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
  gaussianBlur = 'LF_GaussianBlur',
  getValueFromJson = 'LF_GetValueFromJSON',
  getRandomKeyFromJson = 'LF_GetRandomKeyFromJSON',
  imageClassifier = 'LF_ImageClassifier',
  imageListFromJSON = 'LF_ImageListFromJSON',
  imageHistogram = 'LF_ImageHistogram',
  imagesEditingBreakpoint = 'LF_ImagesEditingBreakpoint',
  integer = 'LF_Integer',
  isLandscape = 'LF_IsLandscape',
  keywordCounter = 'LF_KeywordCounter',
  keywordToggleFromJson = 'LF_KeywordToggleFromJSON',
  llmChat = 'LF_LLMChat',
  llmMessenger = 'LF_LLMMessenger',
  loadAndEditImages = 'LF_LoadAndEditImages',
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
  vignette = 'LF_Vignette',
  wallOfText = 'LF_WallOfText',
  writeJson = 'LF_WriteJSON',
}
export enum TagName {
  Div = 'div',
  KulAccordion = 'kul-accordion',
  KulArticle = 'kul-article',
  KulButton = 'kul-button',
  KulCard = 'kul-card',
  KulCarousel = 'kul-carousel',
  KulChat = 'kul-chat',
  KulChart = 'kul-chart',
  KulChip = 'kul-chip',
  KulCode = 'kul-code',
  KulCompare = 'kul-compare',
  KulImageviewer = 'kul-imageviewer',
  KulList = 'kul-list',
  KulMasonry = 'kul-masonry',
  KulMessenger = 'kul-messenger',
  KulProgressbar = 'kul-progressbar',
  KulSlider = 'kul-slider',
  KulSpinner = 'kul-spinner',
  KulTabbar = 'kul-tabbar',
  KulTextfield = 'kul-textfield',
  KulToggle = 'kul-toggle',
  KulTree = 'kul-tree',
  KulUpload = 'kul-upload',
  Textarea = 'textarea',
}
//#endregion
//#region Unions
export type CustomWidgetDeserializedValues =
  | CardDeserializedValue
  | CardsWithChipDeserializedValue
  | CarouselDeserializedValue
  | ChatValueDeserializedValue
  | ChipValueDeserializedValue
  | CodeValueDeserializedValue
  | CompareValueDeserializedValue
  | ControlPanelDeserializedValue
  | CountBarChartDeserializedValue
  | HistoryDeserializedValue
  | ImageEditorDeserializedValue
  | MasonryDeserializedValue
  | MessengerDeserializedValue
  | ProgressbarDeserializedValue
  | TabBarChartDeserializedValue
  | TextareaDeserializedValue
  | TreeValueDeserializedValue
  | UploadDeserializedValue;
export type CustomWidgetOptions =
  | CardOptions
  | CardsWithChipOptions
  | CarouselOptions
  | ChatOptions
  | ChipOptions
  | CodeOptions
  | CompareOptions
  | ControlPanelOptions
  | CountBarChartOptions
  | HistoryOptions
  | ImageEditorOptions
  | MasonryOptions
  | MessengerOptions
  | ProgressbarOptions
  | TabBarChartOptions
  | TextareaOptions
  | TreeOptions
  | UploadOptions;
export type CustomWidgetOptionsCallbacks =
  | CardOptionsCallback
  | CarouselOptionsCallback
  | ChatOptionsCallback
  | ChipOptionsCallback
  | CodeOptionsCallback
  | CompareOptionsCallback
  | ControlPanelOptionsCallback
  | HistoryOptionsCallback
  | ImageEditorOptionsCallback
  | MasonryOptionsCallback
  | MessengerOptionsCallback
  | ProgressbarOptionsCallback
  | TabBarChartOptionsCallback
  | TextareaOptionsCallback
  | TreeOptionsCallback
  | UploadOptionsCallback;
//#region Maps
export type ComfyWidgetMap = {
  [ComfyWidgetName.boolean]: Widget;
  [ComfyWidgetName.combo]: Widget;
  [ComfyWidgetName.customtext]: Widget;
  [ComfyWidgetName.float]: Widget;
  [ComfyWidgetName.integer]: Widget;
  [ComfyWidgetName.json]: Widget;
  [ComfyWidgetName.number]: Widget;
  [ComfyWidgetName.seed]: Widget;
  [ComfyWidgetName.string]: Widget;
  [ComfyWidgetName.text]: Widget;
  [ComfyWidgetName.toggle]: Widget;
};
export type CustomWidgetMap = {
  [CustomWidgetName.card]: Card;
  [CustomWidgetName.carousel]: Carousel;
  [CustomWidgetName.cardsWithChip]: CardsWithChip;
  [CustomWidgetName.chat]: Chat;
  [CustomWidgetName.chip]: Chip;
  [CustomWidgetName.code]: Code;
  [CustomWidgetName.compare]: Compare;
  [CustomWidgetName.controlPanel]: ControlPanel;
  [CustomWidgetName.countBarChart]: CountBarChart;
  [CustomWidgetName.history]: History;
  [CustomWidgetName.imageEditor]: ImageEditor;
  [CustomWidgetName.masonry]: Masonry;
  [CustomWidgetName.messenger]: Messenger;
  [CustomWidgetName.progressbar]: Progressbar;
  [CustomWidgetName.tabBarChart]: TabBarChart;
  [CustomWidgetName.textarea]: Textarea;
  [CustomWidgetName.tree]: Tree;
  [CustomWidgetName.upload]: Upload;
};
export type CustomWidgetDeserializedValuesMap<Name extends CustomWidgetName> = {
  [CustomWidgetName.card]: CardDeserializedValue;
  [CustomWidgetName.cardsWithChip]: CardsWithChipDeserializedValue;
  [CustomWidgetName.carousel]: CarouselDeserializedValue;
  [CustomWidgetName.chat]: ChatValueDeserializedValue;
  [CustomWidgetName.chip]: ChipValueDeserializedValue;
  [CustomWidgetName.code]: CodeValueDeserializedValue;
  [CustomWidgetName.compare]: CompareValueDeserializedValue;
  [CustomWidgetName.controlPanel]: ControlPanelDeserializedValue;
  [CustomWidgetName.countBarChart]: CountBarChartDeserializedValue;
  [CustomWidgetName.history]: HistoryDeserializedValue;
  [CustomWidgetName.imageEditor]: ImageEditorDeserializedValue;
  [CustomWidgetName.masonry]: MasonryDeserializedValue;
  [CustomWidgetName.messenger]: MessengerDeserializedValue;
  [CustomWidgetName.progressbar]: ProgressbarDeserializedValue;
  [CustomWidgetName.tabBarChart]: TabBarChartDeserializedValue;
  [CustomWidgetName.textarea]: TextareaDeserializedValue;
  [CustomWidgetName.tree]: TreeValueDeserializedValue;
  [CustomWidgetName.upload]: UploadDeserializedValue;
}[Name];
export type CustomWidgetOptionsCallbacksMap<Name extends CustomWidgetName> = {
  [CustomWidgetName.card]: CardOptionsCallback;
  [CustomWidgetName.cardsWithChip]: CardsWithChipOptionsCallback;
  [CustomWidgetName.carousel]: CarouselOptionsCallback;
  [CustomWidgetName.chat]: ChatOptionsCallback;
  [CustomWidgetName.chip]: ChipOptionsCallback;
  [CustomWidgetName.code]: CodeOptionsCallback;
  [CustomWidgetName.compare]: CompareOptionsCallback;
  [CustomWidgetName.controlPanel]: ControlPanelOptionsCallback;
  [CustomWidgetName.countBarChart]: CountBarChartOptionsCallback;
  [CustomWidgetName.history]: HistoryOptionsCallback;
  [CustomWidgetName.imageEditor]: ImageEditorOptionsCallback;
  [CustomWidgetName.masonry]: MasonryOptionsCallback;
  [CustomWidgetName.messenger]: MessengerOptionsCallback;
  [CustomWidgetName.progressbar]: ProgressbarOptionsCallback;
  [CustomWidgetName.tabBarChart]: TabBarChartOptionsCallback;
  [CustomWidgetName.textarea]: TextareaOptionsCallback;
  [CustomWidgetName.tree]: TreeOptionsCallback;
  [CustomWidgetName.upload]: UploadOptionsCallback;
}[Name];
export type NodePayloadMap = {
  [N in NodeName]: EventPayload<CustomWidgetName>;
};
export type NodeWidgetMap = {
  [N in NodeName]: CustomWidgetName[];
};
//#endregion
//#region Helpers
export type UnescapeJSONPayload = {
  validJson: boolean;
  parsedJson?: {};
  unescapedStr: string;
};
export type NormalizeValueCallback<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName>> =
  (origValue: V, unescaped: UnescapeJSONPayload) => void;
export type BaseWidgetCallback<T extends CustomWidgetName> = (
  node: NodeType,
  name: T,
) => { widget: Widget };
export type ComfyWidgetCallback = <T extends ComfyWidgetName>(
  node: NodeType,
  name: T,
) => { widget: Widget };
export interface BaseWidgetFactory<T extends CustomWidgetOptions> {
  options: BaseWidgetOptionsCallback<T>;
  render: BaseWidgetCallback<CustomWidgetName>;
}
export interface BaseWidgetOptions<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName>> {
  hideOnZoom: boolean;
  getValue: () => V;
  setValue(value: string | V): void;
}
export type BaseWidgetOptionsCallback<T extends CustomWidgetOptions> = (...args: any[]) => T;
//#endregion
