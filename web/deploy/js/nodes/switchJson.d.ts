import { SwitchImagePayload } from '../types/events';
import { BooleanViewerWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
export declare const switchJsonFactory: {
    eventHandler: (event: CustomEvent<SwitchImagePayload>, addW: BaseWidgetCallback<CustomWidgetName.booleanViewer>) => void;
    register: (setW: BooleanViewerWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.booleanViewer>) => void;
};
