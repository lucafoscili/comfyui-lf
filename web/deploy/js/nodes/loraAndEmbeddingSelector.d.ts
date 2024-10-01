import { LoraAndEmbeddingSelectorPayload } from '../types/events';
import { CardWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const loraandEmbeddingSelectorFactory: {
    eventHandler: (event: CustomEvent<LoraAndEmbeddingSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback) => void;
};
