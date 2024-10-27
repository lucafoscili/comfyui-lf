import { RandomBooleanPayload } from '../types/events';
import { CustomWidgetName, RollViewerWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const randomBooleanFactory: {
    eventHandler: (event: CustomEvent<RandomBooleanPayload>, addW: BaseWidgetCallback<CustomWidgetName.rollViewer>) => void;
    register: (setW: RollViewerWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.rollViewer>) => void;
};
