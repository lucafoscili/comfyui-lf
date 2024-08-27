export declare class LFWidgets {
    NAMES: {
        controlPanel: string;
        displayJson: string;
    };
    constructor();
    add: {
        controlPanel: (nodeType: Partial<NodeType>) => any;
        code: (nodeType: Partial<NodeType>) => any;
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
}
