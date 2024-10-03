import { LoadLoraTagsPayload } from '../types/events';
import { CardsWithChipWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const loadLoraTagsFactory: {
    eventHandler: (event: CustomEvent<LoadLoraTagsPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CardsWithChipWidgetSetter, addW: BaseWidgetCallback) => void;
};
