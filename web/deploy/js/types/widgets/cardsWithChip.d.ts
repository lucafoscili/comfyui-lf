import { KulDataDataset } from '../../types/ketchup-lite/components';
import { CardDeserializedValue } from './card';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum CardsWithChipCSS {
    Content = "lf-cardswithchip",
    Cards = "lf-cardswithchip__cards",
    Chip = "lf-cardswithchip__chip",
    Grid = "lf-cardswithchip__grid"
}
export type CardsWithChip = Widget<CustomWidgetName.cardsWithChip>;
export type CardsWithChipFactory = WidgetFactory<CardsWithChipDeserializedValue, CardsWithChipState>;
export type CardsWithChipNormalizeCallback = NormalizeValueCallback<CardsWithChipDeserializedValue | string>;
export interface CardsWithChipDeserializedValue extends CardDeserializedValue {
    chip: KulDataDataset;
}
export interface CardsWithChipState extends BaseWidgetState {
    chip: HTMLKulChipElement;
    grid: HTMLDivElement;
}
