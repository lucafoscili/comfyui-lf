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
  characterImpersonator = 'lf-characterimpersonator',
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
  imageClassifier = 'lf-imageclassifier',
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
  lora2Prompt = 'lf-lora2prompt',
  loraTag2Prompt = 'lf-loratag2prompt',
  mathOperation = 'lf-mathoperation',
  multipleImageResizeForWeb = 'lf-multipleimageresizeforweb',
  notify = 'lf-notify',
  randomBoolean = 'lf-randomboolean',
  regionExtractor = 'lf-regionextractor',
  resizeimageByEdge = 'lf-resizeimagebyedge',
  resizeimageToDimension = 'lf-resizeimagetodimension',
  resizeimageToSquare = 'lf-resizeimagetosquare',
  resolutionSwitcher = 'lf-resolutionswitcher',
  samplerSelector = 'lf-samplerselector',
  saveImageForCivitAI = 'lf-saveimageforcivitai',
  saveJson = 'lf-savejson',
  schedulerSelector = 'lf-schedulerselector',
  sequentialSeedsGenerator = 'lf-sequentialseedsgenerator',
  shuffleJsonKeys = 'lf-shufflejsonkeys',
  something2Number = 'lf-something2number',
  something2String = 'lf-something2string',
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
  | BaseDatasetPayload
  | CheckpointSelectorPayload
  | CivitAIMetadataSetupPayload
  | DisplayJSONPayload
  | EmbeddingSelectorPayload
  | ImageHistogramPayload
  | KeywordCounterPayload
  | LoadImagesPayload
  | LoraAndEmbeddingSelectorPayload
  | LoraSelectorPayload
  | LoadLoraTagsPayload
  | NotifyPayload
  | RandomBooleanPayload
  | ResolutionSwitcherPayload
  | ShuffleJSONKeysPayload
  | SortJSONKeysPayload
  | SwitchImagePayload
  | SwitchIntegerPayload
  | SwitchJSONPayload
  | SwitchStringPayload
  | WriteJSONPayload;

/*-------------------------------------------------------------------*/
/*                     C o d e   P a y l o a d                       */
/*-------------------------------------------------------------------*/

export interface CodePayload extends BaseEventPayload {
  value: string;
}

/*-------------------------------------------------------------------*/
/*              B a s e   D a t a s e t   P a y l o a d              */
/*-------------------------------------------------------------------*/

export interface BaseDatasetPayload extends BaseEventPayload {
  dataset: KulDataDataset;
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
/*         D i s p l a y J S O N   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/

export interface DisplayJSONPayload extends BaseEventPayload {
  json: Record<string, unknown>;
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
/*       I m a g e H i s t o g r a m   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface ImageHistogramPayload extends BaseEventPayload {
  datasets: TabBarChartWidgetDeserializedValue;
}

/*-------------------------------------------------------------------*/
/*       K e y w o r d C o u n t e r   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface KeywordCounterPayload extends BaseEventPayload {
  chartDataset: KulDataDataset;
  chipDataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*          L o a d   I m a g e s   D e c l a r a t i o n s          */
/*-------------------------------------------------------------------*/

export interface LoadImagesPayload extends BaseDatasetPayload {
  index: number;
  name: string;
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
/*   R e s o l u t i o n S w i t c h e r   D e c l a r a t i o n s   */
/*-------------------------------------------------------------------*/

export interface ResolutionSwitcherPayload extends BaseEventPayload {
  bool: boolean;
  roll: number;
}

/*-------------------------------------------------------------------*/
/*     S h u f f l e J S O N K e y s   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface ShuffleJSONKeysPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}

/*-------------------------------------------------------------------*/
/*         S o r t J S O N K e y s   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface SortJSONKeysPayload extends BaseEventPayload {
  json: Record<string, unknown>;
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
/*            W r i t e J S O N   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface WriteJSONPayload extends BaseEventPayload {
  error: string;
  json: Record<string, unknown>;
}
