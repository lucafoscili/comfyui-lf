import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from '../widgets';
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
