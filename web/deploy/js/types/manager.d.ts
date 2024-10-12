import { BaseEventPayload, EventName } from './events';
import { KulDataDataset } from './ketchup-lite/components';
import { Extension } from './nodes';
export interface ComfyAPIs {
    analytics: AnalyticsAPIs;
    backup: BackupAPIs;
    metadata: MetadataAPIs;
    event: <T extends BaseEventPayload>(name: EventName, callback: (event: CustomEvent<T>) => void) => void;
    fetch: (body: unknown) => Promise<Response>;
    getLinkById: (id: string) => LinkInfo;
    getNodeById: (id: string) => NodeType;
    interrupt: () => Promise<void>;
    queuePrompt: () => Promise<void>;
    redraw: () => void;
    register: (extension: Extension) => void;
}
export interface AnalyticsAPIs {
    clear: (type: AnalyticsType) => Promise<BaseAPIPayload>;
    get: (dir: string, type: AnalyticsType) => Promise<GetAnalyticsAPIPayload>;
}
export interface BackupAPIs {
    new: (backupType?: BackupType) => Promise<BaseAPIPayload>;
}
export interface MetadataAPIs {
    clear: () => Promise<BaseAPIPayload>;
    get: (hash: string) => Promise<GetMetadataAPIPayload>;
    save: (modelPath: string, dataset: KulDataDataset, forcedSave?: boolean) => Promise<BaseAPIPayload>;
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
    GetMetadata = "/comfyui-lf/get-metadata",
    NewBackup = "/comfyui-lf/new-backup",
    SaveMetadata = "/comfyui-lf/save-metadata"
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
export interface GetMetadataAPIPayload extends BaseAPIPayload {
    data: CivitAIModelData;
}
