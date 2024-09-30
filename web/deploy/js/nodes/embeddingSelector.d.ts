import { EmbeddingSelectorPayload } from '../types/events';
import { type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
export declare const embeddingSelectorFactory: {
    eventHandler: (event: CustomEvent<EmbeddingSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback) => void;
};
