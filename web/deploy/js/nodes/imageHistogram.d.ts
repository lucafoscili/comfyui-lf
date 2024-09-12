import { ImageHistogramPayload } from '../types/events';
import { type BaseWidgetCallback, type HistogramWidgetSetter } from '../types/widgets';
export declare const imageHistogramFactory: {
    eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistogramWidgetSetter, addW: BaseWidgetCallback) => void;
};
