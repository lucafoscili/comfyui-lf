import { LoraSelectorPayload } from '../types/events';
import { type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
export declare const loraSelectorFactory: {
    eventHandler: (event: CustomEvent<LoraSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback) => void;
};
