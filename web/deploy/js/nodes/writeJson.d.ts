import { WriteJSONPayload } from '../types/events';
import { CustomWidgetName, JsonInputWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const writeJsonFactory: {
    eventHandler: (event: CustomEvent<WriteJSONPayload>, addW: BaseWidgetCallback<CustomWidgetName.jsonInput>) => void;
    register: (setW: JsonInputWidgetSetter) => void;
};
