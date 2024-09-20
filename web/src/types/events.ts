import { KulDataDataset } from './ketchup-lite/components';

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
  civitAIMetadataSetup = 'lf-civitaimetadatasetup',
  controlPanel = 'lf-controlpanel',
  displayJson = 'lf-displayjson',
  displayPrimitiveAsJson = 'lf-displayprimitiveasjson',
  float = 'lf-float',
  imageListFromJSON = 'lf-imagelistfromjson',
  imageHistogram = 'lf-imagehistogram',
  integer = 'lf-integer',
  keywordCounter = 'lf-keywordcounter',
  loadFileOnce = 'lf-loadfileonce',
  loadImages = 'lf-loadimages',
  multipleImageResizeForWeb = 'lf-multipleimageresizeforweb',
  randomBoolean = 'lf-randomboolean',
  resizeimageByEdge = 'lf-resizeimagebyedge',
  resizeimageToSquare = 'lf-resizeimagetosquare',
  saveImageForCivitAI = 'lf-saveimageforcivitai',
  string = 'lf-string',
  switchFloat = 'lf-switchfloat',
  switchImage = 'lf-switchimage',
  switchInteger = 'lf-switchinteger',
  switchJson = 'lf-switchjson',
  switchString = 'lf-switchstring',
  urandomSeedGenerator = 'lf-urandomseedgenerator',
  writeJson = 'lf-writejson',
}
export type EventPayload =
  | BlurImagesPayload
  | BooleanPayload
  | CivitAIMetadataSetupPayload
  | DisplayJSONPayload
  | FloatPayload
  | ImageListFromJSONPayload
  | ImageHistogramPayload
  | IntegerPayload
  | KeywordCounterPayload
  | LoadImagesPayload
  | MultipleImageResizeForWebPayload
  | RandomBooleanPayload
  | ResizeImageByEdgePayload
  | ResizeImageToSquarePayload
  | SaveImageForCivitAIPayload
  | StringPayload
  | SwitchImagePayload
  | SwitchIntegerPayload
  | SwitchJSONPayload
  | SwitchStringPayload
  | UrandomSeedGeneratorPayload
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
/* C i v i t A I M e t a d a t a S e t u p   D e c l a r a t i o n s */
/*-------------------------------------------------------------------*/

export interface CivitAIMetadataSetupPayload extends BaseEventPayload {
  metadataString: string;
}

/*-------------------------------------------------------------------*/
/*    D i s p l a y P r i m i t i v e A s J S O N   D e c l a r .    */
/*-------------------------------------------------------------------*/

export interface DisplayPrimitiveAsJSONPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*         D i s p l a y J S O N   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/

export interface DisplayJSONPayload extends BaseEventPayload {
  json: Record<string, unknown>;
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
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*              I n t e g e r   D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

export interface IntegerPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: number;
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
/*      M u l t i p l e   R e s i z e    D e c l a r a t i o n s     */
/*-------------------------------------------------------------------*/

export interface MultipleImageResizeForWebPayload extends BaseEventPayload {
  dataset: KulDataDataset;
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
/*  R e s i z e I m a g e T o S q u a r e   D e c l a r a t i o n s  */
/*-------------------------------------------------------------------*/

export interface ResizeImageToSquarePayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*  S a v e I m a g e F o r C i v i t A I   D e c l a r a t i o n s  */
/*-------------------------------------------------------------------*/

export interface SaveImageForCivitAIPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
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
/*           U r a n d o m   S e e d   G e n e r a t o r             */
/*-------------------------------------------------------------------*/

export interface UrandomSeedGeneratorPayload extends BaseEventPayload {
  dataset: KulDataDataset;
  isHistoryEnabled: boolean;
}

/*-------------------------------------------------------------------*/
/*            W r i t e J S O N   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface WriteJSONPayload extends BaseEventPayload {
  error: string;
  json: Record<string, unknown>;
}
