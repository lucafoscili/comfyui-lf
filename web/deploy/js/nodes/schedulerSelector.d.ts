import { SchedulerSelectorPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const schedulerSelectorFactory: {
    eventHandler: (event: CustomEvent<SchedulerSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter) => void;
};
