import { Something2NumberPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const something2NumberFactory: {
    eventHandler: (event: CustomEvent<Something2NumberPayload>, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
};
