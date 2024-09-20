import { LoadFileOncePayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const loadFileOnceFactory: {
    eventHandler: (event: CustomEvent<LoadFileOncePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter) => void;
};
