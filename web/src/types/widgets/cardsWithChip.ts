import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './_common';
import { CardDeserializedValue } from './card';

//#region CSS
const BASE_CSS_CLASS = 'lf-cardswithchip';
export enum CardsWithChipCSS {
  Content = BASE_CSS_CLASS,
  Cards = `${BASE_CSS_CLASS}__cards`,
  Chip = `${BASE_CSS_CLASS}__chip`,
  Grid = `${BASE_CSS_CLASS}__grid`,
}
//#endregion
//#region Widget
export type CardsWithChip = Widget<CustomWidgetName.cardsWithChip>;
export type CardsWithChipFactory = WidgetFactory<
  CardsWithChipDeserializedValue,
  CardsWithChipState
>;
export type CardsWithChipNormalizeCallback = NormalizeValueCallback<
  CardsWithChipDeserializedValue | string
>;
//#endregion
//#region Value
export interface CardsWithChipDeserializedValue extends CardDeserializedValue {
  chip: KulDataDataset;
}
//#endregion
//#region State
export interface CardsWithChipState extends BaseWidgetState {
  chip: HTMLKulChipElement;
  grid: HTMLDivElement;
}
//#endregion
