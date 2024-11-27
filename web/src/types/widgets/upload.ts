import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './_common';

//#region CSS
const BASE_CSS_CLASS = 'lf-upload';
export enum UploadCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
//#region Widget
export type Upload = Widget<CustomWidgetName.upload>;
export type UploadFactory = WidgetFactory<UploadDeserializedValue, UploadState>;
export type UploadNormalizeCallback = NormalizeValueCallback<UploadDeserializedValue | string>;
//#endregion
//#region Value
export type UploadDeserializedValue = string;
//#endregion
//#region State
export interface UploadState extends BaseWidgetState {
  files: string;
  upload: HTMLKulUploadElement;
}
//#endregion
