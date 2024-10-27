import { ClarityEffectPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CompareWidgetSetter } from '../types/widgets';
export declare const clarityEffectFactory: {
    eventHandler: (event: CustomEvent<ClarityEffectPayload>, addW: BaseWidgetCallback<CustomWidgetName.compare>) => void;
    register: (setW: CompareWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.compare>) => void;
};
