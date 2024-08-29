import { SwitchImagePayload } from '../types/events';
import { BooleanViewerWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const switchJsonFactory: {
    eventHandler: (event: CustomEvent<SwitchImagePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: BooleanViewerWidgetsSetter, addW: BaseWidgetCallback) => void;
};
