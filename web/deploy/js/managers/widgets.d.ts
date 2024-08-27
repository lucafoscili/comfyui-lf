export declare class LFWidgets {
    #private;
    constructor();
    add: {
        controlPanel: (nodeType: NodeType) => any;
        code: (nodeType: NodeType) => any;
    };
    set: {
        controlPanel: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
        code: () => {
            KUL_CODE: (nodeType: NodeType, name: string) => {
                widget: unknown;
            };
        };
    };
    get: {
        adders: {
            controlPanel: (nodeType: NodeType) => any;
            code: (nodeType: NodeType) => any;
        };
        setters: {
            controlPanel: () => {
                KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
            code: () => {
                KUL_CODE: (nodeType: NodeType, name: string) => {
                    widget: unknown;
                };
            };
        };
    };
}
