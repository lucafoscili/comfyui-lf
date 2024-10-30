import { SwitchFloatPayload } from '../types/events';
import { BooleanViewerWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
export declare const switchFloatFactory: {
    eventHandler: (event: CustomEvent<SwitchFloatPayload>, addW: BaseWidgetCallback<CustomWidgetName.booleanViewer>) => void;
    register: (setW: BooleanViewerWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.booleanViewer>) => void;
};
