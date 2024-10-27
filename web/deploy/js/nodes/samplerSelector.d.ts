import { SamplerSelectorPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const samplerSelectorFactory: {
    eventHandler: (event: CustomEvent<SamplerSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
};
