export declare class LFNodes {
    register: {
        LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetsSetter, addW: import("../types/widgets").BaseWidgetCallback) => void;
        LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetsSetter, addW: import("../types/widgets").BaseWidgetCallback) => void;
        LF_ImageHistogram: (setW: import("../types/widgets").ChartWidgetsSetter, addW: import("../types/widgets").BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
    };
}
