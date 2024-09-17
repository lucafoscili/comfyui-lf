import { DisplayPrimitiveAsJSONPayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const displayPrimitiveAsJsonFactory: {
    eventHandler: (event: CustomEvent<DisplayPrimitiveAsJSONPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter) => void;
};
