export declare class LFWidgets {
    #private;
    constructor();
    add: {
        code: (nodeType: NodeType) => any;
        controlPanel: (nodeType: NodeType) => any;
    };
    option: {
        code: (code: HTMLKulCodeElement) => CodeWidgetOptions;
        controlPanel: () => ControlPanelWidgetOptions;
    };
    set: {
        code: () => {
            KUL_CODE: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
        controlPanel: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
    };
    get: {
        adders: {
            code: (nodeType: NodeType) => any;
            controlPanel: (nodeType: NodeType) => any;
        };
        options: {
            code: (code: HTMLKulCodeElement) => CodeWidgetOptions;
            controlPanel: () => ControlPanelWidgetOptions;
        };
        setters: {
            code: () => {
                KUL_CODE: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
            controlPanel: () => {
                KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
        };
    };
}
