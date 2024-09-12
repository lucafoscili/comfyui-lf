import { BaseEventPayload, EventName } from './events';
import { Extension } from './nodes';
export interface ComfyAPIs {
    event: <T extends BaseEventPayload>(name: EventName, callback: (event: CustomEvent<T>) => void) => void;
    fetch: (body: unknown) => Promise<Response>;
    getLinkById: (id: string) => LinkInfo;
    getNodeById: (id: string) => NodeType;
    redraw: () => void;
    register: (extension: Extension) => void;
}
export declare enum LogSeverity {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}
export type IDBFileMetadata = {
    id: string;
    base64: string;
};
