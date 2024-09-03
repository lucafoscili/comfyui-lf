import { StringPayload } from '../types/events';
import { ListWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const stringFactory: {
    eventHandler: (event: CustomEvent<StringPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ListWidgetsSetter, addW: BaseWidgetCallback) => void;
};