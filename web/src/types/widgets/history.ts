import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './_common';

//#region CSS
const BASE_CSS_CLASS = 'lf-history';
export enum HistoryCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
//#region Widget
export type History = Widget<CustomWidgetName.history>;
export type HistoryFactory = WidgetFactory<HistoryDeserializedValue, HistoryState>;
export type HistoryNormalizeCallback = NormalizeValueCallback<HistoryDeserializedValue | string>;
//#endregion
//#region Value
export type HistoryDeserializedValue = KulDataDataset;
//#endregion
//#region State
export interface HistoryState extends BaseWidgetState {
  list: HTMLKulListElement;
}
//#endregion
