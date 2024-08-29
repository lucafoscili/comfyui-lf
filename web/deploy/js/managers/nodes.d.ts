import { BaseWidgetCallback } from '../types/widgets';
export declare class LFNodes {
    eventHandler: {
        LF_DisplayJSON: (event: CustomEvent<import("../types/events").DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
        LF_ImageHistogram: (event: CustomEvent<import("../types/events").ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
        LF_LoadImages: (event: CustomEvent<import("../types/events").LoadImagesPayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchImage: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchInteger: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchJSON: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchString: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_WriteJSON: (event: CustomEvent<import("../types/events").WriteJSONPayload>, addW: BaseWidgetCallback) => void;
    };
    register: {
        LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_ImageHistogram: (setW: import("../types/widgets").ChartWidgetsSetter, addW: BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
        LF_LoadImages: (setW: import("../types/widgets").ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchImage: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchInteger: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchJSON: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchString: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
        LF_WriteJSON: (setW: import("../types/widgets").JsonInputWidgetsSetter) => void;
    };
    get: {
        eventHandlers: {
            LF_DisplayJSON: (event: CustomEvent<import("../types/events").DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
            LF_ImageHistogram: (event: CustomEvent<import("../types/events").ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
            LF_LoadImages: (event: CustomEvent<import("../types/events").LoadImagesPayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchImage: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchInteger: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchJSON: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchString: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_WriteJSON: (event: CustomEvent<import("../types/events").WriteJSONPayload>, addW: BaseWidgetCallback) => void;
        };
        registrations: {
            LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_ImageHistogram: (setW: import("../types/widgets").ChartWidgetsSetter, addW: BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
            LF_LoadImages: (setW: import("../types/widgets").ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchImage: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchInteger: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchJSON: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchString: (setW: import("../types/widgets").TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
            LF_WriteJSON: (setW: import("../types/widgets").JsonInputWidgetsSetter) => void;
        };
    };
}
