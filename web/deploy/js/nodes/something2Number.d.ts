import { MathOperationPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const something2NumberFactory: {
    eventHandler: (event: CustomEvent<MathOperationPayload>, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
};
