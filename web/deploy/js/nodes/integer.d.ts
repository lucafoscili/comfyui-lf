import { IntegerPayload } from '../types/events';
import { ListWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const integerFactory: {
    eventHandler: (event: CustomEvent<IntegerPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ListWidgetsSetter, addW: BaseWidgetCallback) => void;
};
