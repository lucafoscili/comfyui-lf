import { DisplayPrimitiveAsJSONPayload } from '../types/events';
import { CodeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const displayPrimitiveAsJsonFactory: {
    eventHandler: (event: CustomEvent<DisplayPrimitiveAsJSONPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter) => void;
};
