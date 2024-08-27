export declare class LFNodes {
    #private;
    NAMES: {
        controlPanel: string;
        displayJson: string;
        imageHistogram: string;
        loadImages: string;
        switchImage: string;
        switchInteger: string;
        switchJSON: string;
        switchString: string;
    };
    constructor();
    register: {
        controlPanel: (set_w: ControlPanelWidgetsSetter, add_w: ControlPanelWidgetCallback) => void;
    };
}
