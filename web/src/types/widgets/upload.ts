import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-upload';

//#region Upload
export interface Upload extends Widget {
  options: UploadOptions;
  type: [CustomWidgetName.upload];
}
export interface UploadFactory extends BaseWidgetFactory<UploadOptions> {
  options: UploadOptionsCallback;
}
export type UploadOptionsCallback = (upload: HTMLKulUploadElement) => UploadOptions;
export interface UploadOptions extends BaseWidgetOptions<UploadDeserializedValue> {
  getComp(): HTMLKulUploadElement;
}
export type UploadSetter = () => {
  [CustomWidgetName.upload]: BaseWidgetCallback<CustomWidgetName.upload>;
};
export type UploadDeserializedValue = string;
export enum UploadCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
