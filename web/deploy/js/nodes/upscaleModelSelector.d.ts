import { UpscaleModelSelectorPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const upscaleModelSelectorFactory: {
    eventHandler: (event: CustomEvent<UpscaleModelSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter) => void;
};
