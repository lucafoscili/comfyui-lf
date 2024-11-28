import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum UploadCSS {
    Content = "lf-upload",
    Widget = "lf-upload__widget"
}
export type Upload = Widget<CustomWidgetName.upload>;
export type UploadFactory = WidgetFactory<UploadDeserializedValue, UploadState>;
export type UploadNormalizeCallback = NormalizeValueCallback<UploadDeserializedValue | string>;
export type UploadDeserializedValue = string;
export interface UploadState extends BaseWidgetState {
    files: string;
    upload: HTMLKulUploadElement;
}
