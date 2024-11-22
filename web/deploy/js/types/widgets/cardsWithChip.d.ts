import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
import { CardDeserializedValue } from './card';
export interface CardsWithChip extends Widget {
    options: CardsWithChipOptions;
    type: [CustomWidgetName.cardsWithChip];
}
export interface CardsWithChipFactory extends BaseWidgetFactory<CardsWithChipOptions> {
    options: CardsWithChipOptionsCallback;
}
export type CardsWithChipOptionsCallback = (grid: HTMLDivElement) => CardsWithChipOptions;
export interface CardsWithChipOptions extends BaseWidgetOptions<CardsWithChipDeserializedValue> {
    getComp(): {
        cards: HTMLKulCardElement[];
        chip: HTMLKulChipElement;
    };
}
export type CardsWithChipSetter = () => {
    [CustomWidgetName.cardsWithChip]: BaseWidgetCallback<CustomWidgetName.cardsWithChip>;
};
export interface CardsWithChipDeserializedValue extends CardDeserializedValue {
    chip: KulDataDataset;
}
export declare enum CardsWithChipCSS {
    Content = "lf-cardswithchip",
    Cards = "lf-cardswithchip__cards",
    Chip = "lf-cardswithchip__chip",
    Grid = "lf-cardswithchip__grid"
}
