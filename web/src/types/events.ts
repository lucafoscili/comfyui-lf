import { KulDataDataset } from './ketchup-lite/components';
import { TabBarChartWidgetDeserializedValue } from './widgets';

/*-------------------------------------------------------------------*/
/*               C o m m o n   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface BaseEventPayload {
  id: string;
}
export type EventCallback<T extends EventPayload> = (e: CustomEvent<T>) => void;
export enum EventName {
  blurImages = 'lf-blurimages',
  boolean = 'lf-boolean',
  checkpointSelector = 'lf-checkpointselector',
  civitAIMetadataSetup = 'lf-civitaimetadatasetup',
  clarityEffect = 'lf-clarityeffect',
  compareImages = 'lf-compareimages',
  controlPanel = 'lf-controlpanel',
  displayBoolean = 'lf-displayboolean',
  displayFloat = 'lf-displayfloat',
  displayInteger = 'lf-displayinteger',
  displayJson = 'lf-displayjson',
  displayPrimitiveAsJson = 'lf-displayprimitiveasjson',
  displayString = 'lf-displaystring',
  embeddingSelector = 'lf-embeddingselector',
  extractor = 'lf-extractor',
  float = 'lf-float',
  imageListFromJSON = 'lf-imagelistfromjson',
  imageHistogram = 'lf-imagehistogram',
  isLandscape = 'lf-islandscape',
  integer = 'lf-integer',
  keywordCounter = 'lf-keywordcounter',
  loadFileOnce = 'lf-loadfileonce',
  loadImages = 'lf-loadimages',
  loadLoraTags = 'lf-loadloratags',
  loraAndEmbeddingSelector = 'lf-loraandembeddingselector',
  loraSelector = 'lf-loraselector',
  mathOperation = 'lf-mathoperation',
  multipleImageResizeForWeb = 'lf-multipleimageresizeforweb',
  notify = 'lf-notify',
  randomBoolean = 'lf-randomboolean',
  resizeimageByEdge = 'lf-resizeimagebyedge',
  resizeimageToDimension = 'lf-resizeimagetodimension',
  resizeimageToSquare = 'lf-resizeimagetosquare',
  resolutionSwitcher = 'lf-resolutionswitcher',
  samplerSelector = 'lf-samplerselector',
  saveImageForCivitAI = 'lf-saveimageforcivitai',
  schedulerSelector = 'lf-schedulerselector',
  shuffleJsonKeys = 'lf-shufflejsonkeys',
  something2Number = 'lf-something2number',
  sortJsonKeys = 'lf-sortjsonkeys',
  string = 'lf-string',
  switchFloat = 'lf-switchfloat',
  switchImage = 'lf-switchimage',
  switchInteger = 'lf-switchinteger',
  switchJson = 'lf-switchjson',
  switchString = 'lf-switchstring',
  updateUsageStatistics = 'lf-updateusagestatistics',
  upscaleModelSelector = 'lf-upscalemodelselector',
  urandomSeedGenerator = 'lf-urandomseedgenerator',
  vaeSelector = 'lf-vaeselector',
  writeJson = 'lf-writejson',
}
export type EventPayload =
  | BlurImagesPayload
  | BooleanPayload
  | CheckpointSelectorPayload
  | CivitAIMetadataSetupPayload
  | ClarityEffectPayload
  | CompareImagesPayload
  | DisplayBooleanPayload
  | DisplayJSONPayload
  | EmbeddingSelectorPayload
  | ExtractorPayload
  | FloatPayload
  | ImageListFromJSONPayload
  | ImageHistogramPayload
  | IntegerPayload
  | IsLandscapePayload
  | KeywordCounterPayload
  | LoadImagesPayload
  | LoraAndEmbeddingSelectorPayload
  | LoraSelectorPayload
  | LoadLoraTagsPayload
  | MathOperationPayload
  | MultipleImageResizeForWebPayload
  | NotifyPayload
  | RandomBooleanPayload
  | ResizeImageByEdgePayload
  | ResizeImageToDimensionPayload
  | ResizeImageToSquarePayload
  | ResolutionSwitcherPayload
  | SamplerSelectorPayload
  | SaveImageForCivitAIPayload
  | SchedulerSelectorPayload
  | ShuffleJSONKeysPayload
  | Something2NumberPayload
  | SortJSONKeysPayload
  | StringPayload
  | SwitchImagePayload
  | SwitchIntegerPayload
  | SwitchJSONPayload
  | SwitchStringPayload
  | UpdateUsageStatisticsPayload
  | UpscaleModelSelectorPayload
  | UrandomSeedGeneratorPayload
  | VAESelectorPayload
  | WriteJSONPayload;

/*-------------------------------------------------------------------*/
/*           B l u r I m a g e s   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/

export interface BlurImagesPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
}

/*-------------------------------------------------------------------*/
/*             B o o l e a n   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface BooleanPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: boolean;
}

/*-------------------------------------------------------------------*/
/*   C h e c k p o i n t S e l e c t o r   D e c l a r a t i o n s   */
/*-------------------------------------------------------------------*/

export interface CheckpointSelectorPayload extends BaseEventPayload {
  dataset: KulDataDataset;
  apiFlag: boolean;
  hash: string;
  path: string;
}

/*-------------------------------------------------------------------*/
/* C i v i t A I M e t a d a t a S e t u p   D e c l a r a t i o n s */
/*-------------------------------------------------------------------*/

export interface CivitAIMetadataSetupPayload extends BaseEventPayload {
  metadataString: string;
}

/*-------------------------------------------------------------------*/
/*             C l a r i t y E f f e c t   D e c l a r .             */
/*-------------------------------------------------------------------*/

export interface ClarityEffectPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*              C o m p a r e I m a g e s   D e c l a r .            */
/*-------------------------------------------------------------------*/

export interface CompareImagesPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*    D i s p l a y P r i m i t i v e A s J S O N   D e c l a r .    */
/*-------------------------------------------------------------------*/

export interface DisplayPrimitiveAsJSONPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*       D i s p l a y B o o l e a n   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface DisplayBooleanPayload extends BaseEventPayload {
  value: string;
}

/*-------------------------------------------------------------------*/
/*         D i s p l a y F l o a t   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface DisplayFloatPayload extends BaseEventPayload {
  value: string;
}

/*-------------------------------------------------------------------*/
/*       D i s p l a y I n t e g e r   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface DisplayIntegerPayload extends BaseEventPayload {
  value: string;
}

/*-------------------------------------------------------------------*/
/*         D i s p l a y J S O N   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/

export interface DisplayJSONPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}

/*-------------------------------------------------------------------*/
/*        D i s p l a y S t r i n g   D e c l a r a t i o n s        */
/*-------------------------------------------------------------------*/

export interface DisplayStringPayload extends BaseEventPayload {
  value: string;
}

/*-------------------------------------------------------------------*/
/*    E m b e d d i n g S e l e c t o r   D e c l a r a t i o n s    */
/*-------------------------------------------------------------------*/

export interface EmbeddingSelectorPayload extends BaseEventPayload {
  dataset: KulDataDataset;
  apiFlag: boolean;
  hash: string;
  path: string;
}

/*-------------------------------------------------------------------*/
/*            E x t r a c t o r   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface ExtractorPayload extends BaseEventPayload {
  result: string;
}

/*-------------------------------------------------------------------*/
/*               F l o a t   D e c l a r a t i o n s                 */
/*-------------------------------------------------------------------*/

export interface FloatPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: number;
}

/*-------------------------------------------------------------------*/
/*    I m a g e L i s t F r o m J S O N   D e c l a r a t i o n s    */
/*-------------------------------------------------------------------*/

export interface ImageListFromJSONPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
}

/*-------------------------------------------------------------------*/
/*       I m a g e H i s t o g r a m   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface ImageHistogramPayload extends BaseEventPayload {
  datasets: TabBarChartWidgetDeserializedValue;
}

/*-------------------------------------------------------------------*/
/*              I n t e g e r   D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

export interface IntegerPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: number;
}

/*-------------------------------------------------------------------*/
/*          I s L a n d s c a p e   D e c l a r a t i o n s          */
/*-------------------------------------------------------------------*/

export interface IsLandscapePayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*       K e y w o r d C o u n t e r   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface KeywordCounterPayload extends BaseEventPayload {
  chartDataset: KulDataDataset;
  chipDataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*          L o a d   F i l e s   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface LoadFileOncePayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
}

/*-------------------------------------------------------------------*/
/*          L o a d   I m a g e s   D e c l a r a t i o n s          */
/*-------------------------------------------------------------------*/

export interface LoadImagesPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
  selectedIndex: number;
  selectedName: string;
}

/*-------------------------------------------------------------------*/
/*                      L o a d L o r a T a g s                      */
/*-------------------------------------------------------------------*/

export interface LoadLoraTagsPayload extends BaseEventPayload {
  datasets: KulDataDataset[];
  apiFlags: boolean[];
  hashes: string[];
  paths: string[];
  chipDataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*         L o r a S e l e c t o r   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface LoraSelectorPayload extends BaseEventPayload {
  dataset: KulDataDataset;
  apiFlag: boolean;
  hash: string;
  path: string;
}

/*-------------------------------------------------------------------*/
/*   L o r a A n d E m b e d d i n g S e l e c t o r   D e c l a r.  */
/*-------------------------------------------------------------------*/

export interface LoraAndEmbeddingSelectorPayload extends BaseEventPayload {
  datasets: KulDataDataset[];
  apiFlags: boolean[];
  hashes: string[];
  paths: string[];
}

/*-------------------------------------------------------------------*/
/*       M a t h O p e r a t i o n   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface MathOperationPayload extends BaseEventPayload {
  log: string;
}

/*-------------------------------------------------------------------*/
/*      M u l t i p l e   R e s i z e    D e c l a r a t i o n s     */
/*-------------------------------------------------------------------*/

export interface MultipleImageResizeForWebPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*              N o t i f y   D e c l a r a t i o n s                */
/*-------------------------------------------------------------------*/

export interface NotifyPayload extends BaseEventPayload {
  action: 'none' | 'focus tab' | 'interrupt' | 'interrupt and queue' | 'queue prompt';
  image: string;
  message: string;
  silent: boolean;
  tag: string;
  title: string;
}

/*-------------------------------------------------------------------*/
/*       R a n d o m   B o o l e a n   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface RandomBooleanPayload extends BaseEventPayload {
  bool: boolean;
  roll: number;
}

/*-------------------------------------------------------------------*/
/*    R e s i z e I m a g e B y E d g e   D e c l a r a t i o n s    */
/*-------------------------------------------------------------------*/

export interface ResizeImageByEdgePayload extends BaseEventPayload {
  dataset: KulDataDataset;
  heights: number[];
  original_heights: number[];
  original_widths: number[];
  widths: number[];
}

/*-------------------------------------------------------------------*/
/*    R e s i z e I m a g e T o D i m e n s i o n   D e c l a r .    */
/*-------------------------------------------------------------------*/

export interface ResizeImageToDimensionPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*  R e s i z e I m a g e T o S q u a r e   D e c l a r a t i o n s  */
/*-------------------------------------------------------------------*/

export interface ResizeImageToSquarePayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*   R e s o l u t i o n S w i t c h e r   D e c l a r a t i o n s   */
/*-------------------------------------------------------------------*/

export interface ResolutionSwitcherPayload extends BaseEventPayload {
  bool: boolean;
  roll: number;
}

/*-------------------------------------------------------------------*/
/*     S a m p l e r S e l e c t o r   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface SamplerSelectorPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
}

/*-------------------------------------------------------------------*/
/*  S a v e I m a g e F o r C i v i t A I   D e c l a r a t i o n s  */
/*-------------------------------------------------------------------*/

export interface SaveImageForCivitAIPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
}

/*-------------------------------------------------------------------*/
/*    S c h e d u l e r S e l e c t o r   D e c l a r a t i o n s    */
/*-------------------------------------------------------------------*/

export interface SchedulerSelectorPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
}

/*-------------------------------------------------------------------*/
/*     S h u f f l e J S O N K e y s   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface ShuffleJSONKeysPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}

/*-------------------------------------------------------------------*/
/*     S o m e t h i n g 2 N u m b e r   D e c l a r a t i o n s     */
/*-------------------------------------------------------------------*/

export interface Something2NumberPayload extends BaseEventPayload {
  log: string;
}

/*-------------------------------------------------------------------*/
/*         S o r t J S O N K e y s   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface SortJSONKeysPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}

/*-------------------------------------------------------------------*/
/*               S t r i n g   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface StringPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
}

/*-------------------------------------------------------------------*/
/*         S w i t c h   F l o a t   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface SwitchFloatPayload extends BaseEventPayload {
  bool: boolean;
}

/*-------------------------------------------------------------------*/
/*         S w i t c h   I m a g e   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface SwitchImagePayload extends BaseEventPayload {
  bool: boolean;
}

/*-------------------------------------------------------------------*/
/*       S w i t c h   I n t e g e r   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface SwitchIntegerPayload extends BaseEventPayload {
  bool: boolean;
}

/*-------------------------------------------------------------------*/
/*          S w i t c h   J S O N   D e c l a r a t i o n s          */
/*-------------------------------------------------------------------*/

export interface SwitchJSONPayload extends BaseEventPayload {
  bool: boolean;
}

/*-------------------------------------------------------------------*/
/*         S w i t c h   s t r i n g   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface SwitchStringPayload extends BaseEventPayload {
  bool: boolean;
}

/*-------------------------------------------------------------------*/
/*      U p d a t e U s a g e S t a t i s t i c s   D e c l .        */
/*-------------------------------------------------------------------*/

export interface UpdateUsageStatisticsPayload extends BaseEventPayload {
  log: string;
}

/*-------------------------------------------------------------------*/
/* U p s c a l e M o d e l S e l e c t o r   D e c l a r a t i o n s */
/*-------------------------------------------------------------------*/

export interface UpscaleModelSelectorPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
}

/*-------------------------------------------------------------------*/
/*           U r a n d o m   S e e d   G e n e r a t o r             */
/*-------------------------------------------------------------------*/

export interface UrandomSeedGeneratorPayload extends BaseEventPayload {
  dataset: KulDataDataset;
  isHistoryEnabled: boolean;
}

/*-------------------------------------------------------------------*/
/*          V A E S e l e c t o r   D e c l a r a t i o n s          */
/*-------------------------------------------------------------------*/

export interface VAESelectorPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
}

/*-------------------------------------------------------------------*/
/*            W r i t e J S O N   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface WriteJSONPayload extends BaseEventPayload {
  error: string;
  json: Record<string, unknown>;
}
