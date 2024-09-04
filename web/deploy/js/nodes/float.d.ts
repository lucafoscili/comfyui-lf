import { FloatPayload } from '../types/events';
import { ListWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const floatFactory: {
    eventHandler: (event: CustomEvent<FloatPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ListWidgetsSetter, addW: BaseWidgetCallback) => void;
};
