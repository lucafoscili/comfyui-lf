import { EventPayload, EventName } from './events';
import { KulDataDataset } from './ketchup-lite/components';
import { Extension } from './nodes';
import { CustomWidgetName } from './widgets';
export interface ComfyAPIs {
    analytics: AnalyticsAPIs;
    backup: BackupAPIs;
    image: ImageAPIs;
    json: JSONAPIs;
    metadata: MetadataAPIs;
    event: <P extends EventPayload<CustomWidgetName>>(name: EventName, callback: (event: CustomEvent<P>) => void) => void;
    comfyUi: () => ComfyUI;
    fetch: (body: unknown) => Promise<Response>;
    getLinkById: (id: string) => LinkInfo;
    getNodeById: (id: string) => NodeType;
    interrupt: () => Promise<void>;
    queuePrompt: () => Promise<void>;
    redraw: () => void;
    register: (extension: Extension) => void;
    getResourceUrl: (subfolder: string, filename: string, type?: ComfyFolderTypes) => string;
}
export interface AnalyticsAPIs {
    clear: (type: AnalyticsType) => Promise<BaseAPIPayload>;
    get: (dir: string, type: AnalyticsType) => Promise<GetAnalyticsAPIPayload>;
}
export interface BackupAPIs {
    new: (backupType?: BackupType) => Promise<BaseAPIPayload>;
}
export interface ImageAPIs {
    get: (dir: string) => Promise<GetImageAPIPayload>;
    process: <T extends FilterType>(url: string, type: T, settings: FilterSettingsMap[T]) => Promise<ProcessImageAPIPayload>;
}
export interface JSONAPIs {
    get: (path: string) => Promise<GetJSONAPIPayload>;
    update: (path: string, dataset: KulDataDataset) => Promise<BaseAPIPayload>;
}
export interface MetadataAPIs {
    clear: () => Promise<BaseAPIPayload>;
    get: (hash: string) => Promise<GetMetadataAPIPayload>;
    save: (modelPath: string, dataset: KulDataDataset, forcedSave?: boolean) => Promise<BaseAPIPayload>;
    updateCover: (modelPath: string, b64image: string) => Promise<BaseAPIPayload>;
}
export interface BaseAPIPayload {
    message: string;
    status: LogSeverity;
}
export type AnalyticsType = 'usage';
export type BackupType = 'automatic' | 'manual';
export declare enum LFEndpoints {
    ClearAnalytics = "/comfyui-lf/clear-analytics",
    ClearMetadata = "/comfyui-lf/clear-metadata",
    GetAnalytics = "/comfyui-lf/get-analytics",
    GetImage = "/comfyui-lf/get-image",
    GetJson = "/comfyui-lf/get-json",
    GetMetadata = "/comfyui-lf/get-metadata",
    NewBackup = "/comfyui-lf/new-backup",
    ProcessImage = "/comfyui-lf/process-image",
    SaveMetadata = "/comfyui-lf/save-metadata",
    UpdateJson = "/comfyui-lf/update-json",
    UpdateMetadataCover = "/comfyui-lf/update-metadata-cover"
}
export declare enum LogSeverity {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}
export interface APIMetadataEntry {
    apiFlag: boolean;
    dataset: KulDataDataset;
    hash: string;
    path: string;
}
export interface GetAnalyticsAPIPayload extends BaseAPIPayload {
    data: Record<string, KulDataDataset>;
}
export interface GetImageAPIPayload extends BaseAPIPayload {
    data: KulDataDataset;
}
export interface GetJSONAPIPayload extends BaseAPIPayload {
    data: KulDataDataset;
}
export interface GetMetadataAPIPayload extends BaseAPIPayload {
    data: CivitAIModelData;
}
export interface ProcessImageAPIPayload extends BaseAPIPayload {
    data: string;
}
export type TooltipUploadCallback = (b64image: string) => void;
export type TooltipCallbacks = TooltipUploadCallback;
export type TooltipLayouts = 'upload';
export type ExtensionCallback = (node: NodeType) => void;
export interface ClaritySettings {
    clarity_strength: number;
    sharpen_amount: number;
    blur_kernel_size: number;
}
export interface VignetteSettings {
    vignette_intensity: number;
}
export interface FilterSettingsMap {
    clarity: ClaritySettings;
    vignette: VignetteSettings;
}
export type FilterType = keyof FilterSettingsMap;
export declare enum TREE_DATA_IDS {
    Clarity = "clarity",
    Vignette = "vignette"
}
export type ClaritySliderID = keyof ClaritySettings;
export type VignetteSliderID = keyof VignetteSettings;
export type SliderConfig<ID extends string> = {
    ariaLabel: string;
    defaultValue: string;
    id: ID;
    max: string;
    min: string;
    step: string;
    title: string;
};
