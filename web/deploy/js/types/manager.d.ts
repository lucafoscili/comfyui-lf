import { BaseEventPayload, EventName } from './events';
import { KulDataDataset } from './ketchup-lite/components';
import { Extension } from './nodes';
export interface ComfyAPIs {
    analytics: AnalyticsAPIs;
    clearModelMetadata: () => Promise<void>;
    event: <T extends BaseEventPayload>(name: EventName, callback: (event: CustomEvent<T>) => void) => void;
    fetch: (body: unknown) => Promise<Response>;
    getLinkById: (id: string) => LinkInfo;
    getNodeById: (id: string) => NodeType;
    interrupt: () => Promise<void>;
    modelInfoFromCivitAI: (hash: string, forcedSave?: boolean) => Promise<CivitAIModelData>;
    queuePrompt: () => Promise<void>;
    redraw: () => void;
    register: (extension: Extension) => void;
    saveModelMetadata: (modelPath: string, dataset: KulDataDataset) => void;
}
export interface AnalyticsAPIs {
    clear: (type: AnalyticsType) => Promise<ClearAnalyiticsAPIPayload>;
    get: (dir: string, type: AnalyticsType) => Promise<GetAnalyticsAPIPayload>;
}
export type AnalyticsType = 'usage';
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
export interface ClearModelAPIPayload {
    status: 'success' | 'not found' | 'error';
    message: string;
}
export interface ClearAnalyiticsAPIPayload {
    status: 'success' | 'not found' | 'error';
    message: string;
}
export interface GetAnalyticsAPIPayload {
    status: 'success' | 'not found' | 'error';
    data: Record<string, KulDataDataset>;
}
export interface SaveModelAPIPayload {
    status: 'exists' | 'success';
    message: string;
}
