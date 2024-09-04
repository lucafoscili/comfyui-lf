import { IntegerPayload } from '../types/events';
import { HistoryWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const integerFactory: {
    eventHandler: (event: CustomEvent<IntegerPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetsSetter, addW: BaseWidgetCallback) => void;
};
