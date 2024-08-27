export interface LFWindow extends Window {
    lfManager: LFManager;
}
export declare class LFManager {
    #private;
    CONTROL_PANEL: ControlPanelDictionary;
    constructor();
    isDebug(): boolean;
    log(message: string, args?: Record<string, unknown>, severity?: LogSeverity): void;
    toggleDebug(value?: boolean): boolean;
}
