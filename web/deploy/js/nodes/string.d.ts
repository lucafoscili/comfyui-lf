import { StringPayload } from '../types/events';
import { HistoryWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const stringFactory: {
    eventHandler: (event: CustomEvent<StringPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetsSetter, addW: BaseWidgetCallback) => void;
};
