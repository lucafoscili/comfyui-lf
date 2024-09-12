import { StringPayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const stringFactory: {
    eventHandler: (event: CustomEvent<StringPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
};
