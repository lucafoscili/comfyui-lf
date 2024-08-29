import type { DisplayJSONPayload, ImageHistogramPayload } from '../types/events';
import type { BaseWidgetCallback } from '../types/widgets';
export declare class LFEvents {
    #private;
    eventHandler: {
        displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
        imageHistogram: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
    };
    get: {
        eventHandlers: {
            displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
            imageHistogram: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
        };
    };
}
