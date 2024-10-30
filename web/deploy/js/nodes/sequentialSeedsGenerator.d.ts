import { BaseDatasetPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const sequentialSeedsGeneratorFactory: {
    eventHandler: (event: CustomEvent<BaseDatasetPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter) => void;
};
