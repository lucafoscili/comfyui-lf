import { KulDataDataset } from './ketchup-lite/components';
export interface BaseEventPayload {
    id: string;
}
export type EventCallback<T extends EventPayload> = (e: CustomEvent<T>) => void;
export declare enum EventName {
    blurImages = "lf-blurimages",
    controlPanel = "lf-controlpanel",
    displayJson = "lf-displayjson",
    float = "lf-float",
    imageHistogram = "lf-imagehistogram",
    imageResizeByEdge = "lf-imageresizebyedge",
    integer = "lf-integer",
    loadImages = "lf-loadimages",
    multipleImageResizeForWeb = "lf-multipleimageresizeforweb",
    string = "lf-string",
    switchImage = "lf-switchimage",
    switchInteger = "lf-switchinteger",
    switchJson = "lf-switchjson",
    switchString = "lf-switchstring",
    writeJson = "lf-writejson"
}
export type EventPayload = BlurImagesPayload | DisplayJSONPayload | FloatPayload | ImageHistogramPayload | ImageResizeByEdgePayload | IntegerPayload | LoadImagesPayload | MultipleImageResizeForWebPayload | StringPayload | SwitchImagePayload | SwitchIntegerPayload | SwitchJSONPayload | SwitchStringPayload | WriteJSONPayload;
export interface BlurImagesPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
}
export interface DisplayJSONPayload extends BaseEventPayload {
    json: Record<string, unknown>;
}
export interface FloatPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: number;
}
export interface ImageHistogramPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface ImageResizeByEdgePayload extends BaseEventPayload {
    dataset: KulDataDataset;
    heights: number[];
    original_heights: number[];
    original_widths: number[];
    widths: number[];
}
export interface IntegerPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: number;
}
export interface LoadImagesPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
}
export interface MultipleImageResizeForWebPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface StringPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface SwitchImagePayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchIntegerPayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchJSONPayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchStringPayload extends BaseEventPayload {
    bool: boolean;
}
export interface WriteJSONPayload extends BaseEventPayload {
    error: string;
    json: Record<string, unknown>;
}
