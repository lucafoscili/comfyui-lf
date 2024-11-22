import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-card';

//#region Card
export interface Card extends Widget {
  options: CardOptions;
  type: [CustomWidgetName.card];
}
export interface CardFactory extends BaseWidgetFactory<CardOptions> {
  options: CardOptionsCallback;
}
export type CardOptionsCallback = (grid: HTMLDivElement) => CardOptions;
export interface CardOptions extends BaseWidgetOptions<CardDeserializedValue> {
  getComp(): HTMLKulCardElement[];
}
export type CardSetter = () => {
  [CustomWidgetName.card]: BaseWidgetCallback<CustomWidgetName.card>;
};
export interface CardDeserializedValue {
  props: Partial<HTMLKulCardElement>[];
}
export enum CardCSS {
  Content = BASE_CSS_CLASS,
  ContentHasButton = `${BASE_CSS_CLASS}--has-button`,
  Grid = `${BASE_CSS_CLASS}__grid`,
}
//#endregion
