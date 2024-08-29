import { BaseWidgetCallback } from '../types/widgets';
export declare class LFNodes {
    eventHandler: {
        LF_DisplayJSON: (event: CustomEvent<import("../types/events").DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
        LF_ImageHistogram: (event: CustomEvent<import("../types/events").ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
        LF_LoadImages: (event: CustomEvent<import("../types/events").LoadImagesPayload>, addW: BaseWidgetCallback) => void;
    };
    register: {
        LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_ImageHistogram: (setW: import("../types/widgets").ChartWidgetsSetter, addW: BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
        LF_LoadImages: (setW: import("../types/widgets").ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
    };
    get: {
        eventHandlers: {
            LF_DisplayJSON: (event: CustomEvent<import("../types/events").DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
            LF_ImageHistogram: (event: CustomEvent<import("../types/events").ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
            LF_LoadImages: (event: CustomEvent<import("../types/events").LoadImagesPayload>, addW: BaseWidgetCallback) => void;
        };
        registrations: {
            LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_ImageHistogram: (setW: import("../types/widgets").ChartWidgetsSetter, addW: BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
            LF_LoadImages: (setW: import("../types/widgets").ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
        };
    };
}
