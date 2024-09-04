import { BooleanPayload } from '../types/events';
import { HistoryWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const booleanFactory: {
    eventHandler: (event: CustomEvent<BooleanPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetsSetter, addW: BaseWidgetCallback) => void;
};
