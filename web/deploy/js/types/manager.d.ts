import { BaseEventPayload, EventName } from './events';
import { Extension } from './nodes';
export interface ComfyAPIs {
    event: <T extends BaseEventPayload>(name: EventName, callback: (event: CustomEvent<T>) => void) => void;
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
