import { EmbeddingSelectorPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
export declare const embeddingSelectorFactory: {
    eventHandler: (event: CustomEvent<EmbeddingSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
};
