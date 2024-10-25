import { LoadLoraTagsPayload } from '../types/events';
import { CardsWithChipWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
export declare const loadLoraTagsFactory: {
    eventHandler: (event: CustomEvent<LoadLoraTagsPayload>, addW: BaseWidgetCallback<CustomWidgetName.cardsWithChip>) => void;
    register: (setW: CardsWithChipWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.cardsWithChip>) => void;
};
