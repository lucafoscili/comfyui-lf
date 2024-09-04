import { FloatPayload } from '../types/events';
import { HistoryWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const floatFactory: {
    eventHandler: (event: CustomEvent<FloatPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetsSetter, addW: BaseWidgetCallback) => void;
};
