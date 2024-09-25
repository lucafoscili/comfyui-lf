import { DisplayIntegerPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const displayIntegerFactory: {
    eventHandler: (event: CustomEvent<DisplayIntegerPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => void;
};
