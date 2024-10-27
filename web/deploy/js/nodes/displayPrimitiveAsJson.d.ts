import { DisplayPrimitiveAsJSONPayload } from '../types/events';
import { CodeWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
export declare const displayPrimitiveAsJsonFactory: {
    eventHandler: (event: CustomEvent<DisplayPrimitiveAsJSONPayload>, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
    register: (setW: CodeWidgetSetter) => void;
};
