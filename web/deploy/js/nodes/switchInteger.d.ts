import { SwitchImagePayload } from '../types/events';
import { BooleanViewerWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const switchIntegerFactory: {
    eventHandler: (event: CustomEvent<SwitchImagePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
};
