import { SequentialSeedsGeneratorPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const sequentialSeedsGeneratorFactory: {
    eventHandler: (event: CustomEvent<SequentialSeedsGeneratorPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
};
