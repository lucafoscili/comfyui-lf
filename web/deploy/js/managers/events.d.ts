export declare class LFEvents {
    #private;
    eventHandler: {
        displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: WidgetCallback) => void;
        imageHistogram: (event: CustomEvent<ImageHistogramPayload>, addW: WidgetCallback) => void;
    };
    get: {
        eventHandlers: {
            displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: WidgetCallback) => void;
            imageHistogram: (event: CustomEvent<ImageHistogramPayload>, addW: WidgetCallback) => void;
        };
    };
}
