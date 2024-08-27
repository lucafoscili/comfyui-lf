export declare class LFNodes {
    #private;
    constructor();
    register: {
        controlPanel: (setW: ControlPanelWidgetsSetter, addW: WidgetCallback) => void;
        displayJson: (setW: DisplayJSONWidgetsSetter, addW: WidgetCallback) => void;
    };
}
