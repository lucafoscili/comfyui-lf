import { SamplerSelectorPayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const samplerSelectorFactory: {
    eventHandler: (event: CustomEvent<SamplerSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
};
