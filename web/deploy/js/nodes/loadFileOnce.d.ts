import { LoadFileOncePayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const loadFileOnceFactory: {
    eventHandler: (event: CustomEvent<LoadFileOncePayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter) => void;
};
