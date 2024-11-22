import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
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
export declare enum UploadCSS {
    Content = "lf-upload",
    Widget = "lf-upload__widget"
}
