import { KulDataDataset } from '../ketchup-lite/components';
import { KulMasonry } from '../ketchup-lite/components/kul-masonry/kul-masonry';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './_common';

//#region CSS
const BASE_CSS_CLASS = 'lf-masonry';
export enum MasonryCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
//#region Widget
export type Masonry = Widget<CustomWidgetName.masonry>;
export type MasonryFactory = WidgetFactory<MasonryDeserializedValue, MasonryState>;
export type MasonryNormalizeCallback = NormalizeValueCallback<MasonryDeserializedValue | string>;
//#endregion
//#region Value
export interface MasonryDeserializedValue {
  columns?: KulMasonry['kulColumns'];
  dataset: KulDataDataset;
  index?: number;
  name?: string;
  view?: KulMasonry['kulView'];
}
//#endregion
//#region State
export interface MasonryState extends BaseWidgetState {
  masonry: HTMLKulMasonryElement;
  selected: {
    index?: number;
    name?: string;
  };
}
//#endregion
