import { UpscaleModelSelectorPayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const upscaleModelSelectorFactory: {
    eventHandler: (event: CustomEvent<UpscaleModelSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
};
