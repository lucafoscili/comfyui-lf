export declare class LFNodes {
    register: {
        controlPanel: (setW: import("../types/widgets").ControlPanelWidgetsSetter, addW: import("../types/widgets").BaseWidgetCallback) => void;
        displayJson: (setW: import("../types/widgets").CodeWidgetsSetter, addW: import("../types/widgets").BaseWidgetCallback) => void;
        imageHistogram: (setW: import("../types/widgets").ChartWidgetsSetter, addW: import("../types/widgets").BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
    };
}
