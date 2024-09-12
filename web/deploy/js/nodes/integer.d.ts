import { IntegerPayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const integerFactory: {
    eventHandler: (event: CustomEvent<IntegerPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
};
