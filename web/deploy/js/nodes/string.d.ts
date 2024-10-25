import { StringPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const stringFactory: {
    eventHandler: (event: CustomEvent<StringPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
};
