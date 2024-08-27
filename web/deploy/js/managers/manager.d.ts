export interface LFWindow extends Window {
    lfManager: LFManager;
}
export declare class LFManager {
    #private;
    APIS: {
        event: (name: EventNames, callback: (event: CustomEvent<BaseEventPayload>) => void) => void;
        redraw: () => void;
        register: (extension: Extension) => void;
    };
    CONTROL_PANEL: ControlPanelDictionary;
    constructor();
    isDebug(): boolean;
    log(message: string, args?: Record<string, unknown>, severity?: LogSeverity): void;
    initialize(): void;
    toggleDebug(value?: boolean): boolean;
}
