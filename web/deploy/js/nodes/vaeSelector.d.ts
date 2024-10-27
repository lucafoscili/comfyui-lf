import { VAESelectorPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const vaeSelectorFactory: {
    eventHandler: (event: CustomEvent<VAESelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
};
