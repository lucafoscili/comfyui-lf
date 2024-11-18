import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from '../widgets';
import { CardDeserializedValue } from './card';

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
//#endregion
