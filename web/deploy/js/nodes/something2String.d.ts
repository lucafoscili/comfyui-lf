import { Something2StringPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const something2StringFactory: {
    eventHandler: (event: CustomEvent<Something2StringPayload>, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
};
