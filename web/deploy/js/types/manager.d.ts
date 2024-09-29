import { BaseEventPayload, EventName } from './events';
import { KulDataDataset } from './ketchup-lite/components';
import { Extension } from './nodes';
export interface ComfyAPIs {
    event: <T extends BaseEventPayload>(name: EventName, callback: (event: CustomEvent<T>) => void) => void;
    fetch: (body: unknown) => Promise<Response>;
    getLinkById: (id: string) => LinkInfo;
    getNodeById: (id: string) => NodeType;
    modelInfoFromCivitAI: (hash: string) => Promise<CivitAIModelData>;
    redraw: () => void;
    register: (extension: Extension) => void;
    saveModelMetadata: (modelPath: string, dataset: KulDataDataset) => void;
}
export declare enum LogSeverity {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}
export interface SaveModelAPIPayload {
    status: 'exists' | 'saved';
    message: string;
}
