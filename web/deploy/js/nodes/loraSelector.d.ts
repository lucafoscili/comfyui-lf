import { LoraSelectorPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
export declare const loraSelectorFactory: {
    eventHandler: (event: CustomEvent<LoraSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
};
