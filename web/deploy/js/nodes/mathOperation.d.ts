import { MathOperationPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const mathOperationFactory: {
    eventHandler: (event: CustomEvent<MathOperationPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => void;
};
