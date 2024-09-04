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
  controlPanel = 'lf-controlpanel',
  displayJson = 'lf-displayjson',
  float = 'lf-float',
  imageHistogram = 'lf-imagehistogram',
  imageResizeByEdge = 'lf-imageresizebyedge',
  integer = 'lf-integer',
  loadImages = 'lf-loadimages',
  multipleImageResizeForWeb = 'lf-multipleimageresizeforweb',
  string = 'lf-string',
  switchImage = 'lf-switchimage',
  switchInteger = 'lf-switchinteger',
  switchJson = 'lf-switchjson',
  switchString = 'lf-switchstring',
  writeJson = 'lf-writejson',
}
export type EventPayload =
  | BlurImagesPayload
  | DisplayJSONPayload
  | FloatPayload
  | ImageHistogramPayload
  | ImageResizeByEdgePayload
  | IntegerPayload
  | LoadImagesPayload
  | MultipleImageResizeForWebPayload
  | StringPayload
  | SwitchImagePayload
  | SwitchIntegerPayload
  | SwitchJSONPayload
  | SwitchStringPayload
  | WriteJSONPayload;

/*-------------------------------------------------------------------*/
/*           B l u r I m a g e s   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/

export interface BlurImagesPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
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
/*       I m a g e H i s t o g r a m    D e c l a r a t i o n s      */
/*-------------------------------------------------------------------*/

export interface ImageHistogramPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*    I m a g e R e s i z e B y E d g e   D e c l a r a t i o n s    */
/*-------------------------------------------------------------------*/

export interface ImageResizeByEdgePayload extends BaseEventPayload {
  dataset: KulDataDataset;
  heights: number[];
  original_heights: number[];
  original_widths: number[];
  widths: number[];
}

/*-------------------------------------------------------------------*/
/*              I n t e g e r   D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

export interface IntegerPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: number;
}

/*-------------------------------------------------------------------*/
/*          L o a d   I m a g e s   D e c l a r a t i o n s          */
/*-------------------------------------------------------------------*/

export interface LoadImagesPayload extends BaseEventPayload {
  fileNames: Array<string>;
  images: Array<string>;
}

/*-------------------------------------------------------------------*/
/*      M u l t i p l e   R e s i z e    D e c l a r a t i o n s     */
/*-------------------------------------------------------------------*/

export interface MultipleImageResizeForWebPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*               S t r i n g   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface StringPayload extends BaseEventPayload {
  isHistoryEnabled: boolean;
  value: string;
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
