import { WriteJSONPayload } from '../types/events';
import { JsonInputWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const writeJsonFactory: {
    eventHandler: (event: CustomEvent<WriteJSONPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: JsonInputWidgetSetter) => void;
};
