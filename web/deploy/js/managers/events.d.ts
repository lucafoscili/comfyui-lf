export declare class LFEvents {
    #private;
    constructor();
    eventHandler: {
        displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: WidgetCallback) => void;
    };
    get: {
        eventHandlers: {
            displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: WidgetCallback) => void;
        };
    };
}
