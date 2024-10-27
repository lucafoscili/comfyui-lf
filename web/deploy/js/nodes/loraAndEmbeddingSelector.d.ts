import { LoraAndEmbeddingSelectorPayload } from '../types/events';
import { CardWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
export declare const loraAndEmbeddingSelectorFactory: {
    eventHandler: (event: CustomEvent<LoraAndEmbeddingSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
};
