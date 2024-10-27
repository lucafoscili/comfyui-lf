import { SaveJSONPayload } from '../types/events';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const saveJsonFactory: {
    eventHandler: (event: CustomEvent<SaveJSONPayload>, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
};
