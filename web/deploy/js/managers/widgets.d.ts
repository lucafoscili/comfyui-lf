export declare class LFWidgets {
    TYPES: {
        [index: string]: CustomWidgetNames;
    };
    constructor();
    create: {
        controlPanel: (nodeType: Partial<NodeType>) => void;
    };
    get: {
        controlPanel: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                widget: Partial<Widget>;
            };
        };
    };
}
