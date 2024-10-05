import { SchedulerSelectorPayload } from '../types/events';
import { HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const schedulerSelectorFactory: {
    eventHandler: (event: CustomEvent<SchedulerSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
};
