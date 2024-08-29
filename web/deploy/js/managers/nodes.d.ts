export declare class LFNodes {
    register: {
        controlPanel: (setW: ControlPanelWidgetsSetter, addW: WidgetCallback) => void;
        displayJson: (setW: CodeWidgetsSetter, addW: WidgetCallback) => void;
        imageHistogram: (setW: ImageHistogramWidgetsSetter, addW: WidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
    };
}
