import { ClarityEffectPayload } from '../types/events';
import { type BaseWidgetCallback, type CompareWidgetSetter } from '../types/widgets';
export declare const clarityEffectFactory: {
    eventHandler: (event: CustomEvent<ClarityEffectPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CompareWidgetSetter, addW: BaseWidgetCallback) => void;
};
