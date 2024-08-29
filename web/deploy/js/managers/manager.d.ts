import { ComfyAPIs, LogSeverity } from '../types/manager.js';
export interface LFWindow extends Window {
    lfManager: LFManager;
}
export declare class LFManager {
    #private;
    constructor();
    getApiRoutes(): ComfyAPIs;
    initialize(): void;
    isDebug(): boolean;
    log(message: string, args?: Record<string, unknown>, severity?: LogSeverity): void;
    toggleDebug(value?: boolean): boolean;
}
