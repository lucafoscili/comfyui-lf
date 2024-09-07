import { ImageHistogramPayload } from '../types/events';
import { type BaseWidgetCallback, type HistogramWidgetsSetter } from '../types/widgets';
export declare const imageHistogramFactory: {
    eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistogramWidgetsSetter, addW: BaseWidgetCallback) => void;
};
