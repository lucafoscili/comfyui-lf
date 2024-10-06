import { VAESelectorPayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const vaeSelectorFactory: {
    eventHandler: (event: CustomEvent<VAESelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
};
