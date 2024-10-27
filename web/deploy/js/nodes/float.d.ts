import { FloatPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const floatFactory: {
    eventHandler: (event: CustomEvent<FloatPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
};
