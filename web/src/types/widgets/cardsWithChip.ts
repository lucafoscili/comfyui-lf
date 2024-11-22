import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';
import { CardDeserializedValue } from './card';

const BASE_CSS_CLASS = 'lf-cardswithchip';

//#region Cards with chip
export interface CardsWithChip extends Widget {
  options: CardsWithChipOptions;
  type: [CustomWidgetName.cardsWithChip];
}
export interface CardsWithChipFactory extends BaseWidgetFactory<CardsWithChipOptions> {
  options: CardsWithChipOptionsCallback;
}
export type CardsWithChipOptionsCallback = (grid: HTMLDivElement) => CardsWithChipOptions;
export interface CardsWithChipOptions extends BaseWidgetOptions<CardsWithChipDeserializedValue> {
  getComp(): { cards: HTMLKulCardElement[]; chip: HTMLKulChipElement };
}
export type CardsWithChipSetter = () => {
  [CustomWidgetName.cardsWithChip]: BaseWidgetCallback<CustomWidgetName.cardsWithChip>;
};
export interface CardsWithChipDeserializedValue extends CardDeserializedValue {
  chip: KulDataDataset;
}
export enum CardsWithChipCSS {
  Content = BASE_CSS_CLASS,
  Cards = `${BASE_CSS_CLASS}__cards`,
  Chip = `${BASE_CSS_CLASS}__chip`,
  Grid = `${BASE_CSS_CLASS}__grid`,
}
//#endregion
