import { SwitchImagePayload } from '../types/events';
import { TextfieldWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const switchStringFactory: {
    eventHandler: (event: CustomEvent<SwitchImagePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TextfieldWidgetsSetter, addW: BaseWidgetCallback) => void;
};
