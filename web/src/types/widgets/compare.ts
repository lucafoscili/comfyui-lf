import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-compare';

//#region Compare
export interface Compare extends Widget {
  options: CompareOptions;
  type: [CustomWidgetName.compare];
}
export interface CompareFactory extends BaseWidgetFactory<CompareOptions> {
  options: CompareOptionsCallback;
}
export type CompareOptionsCallback = (compare: HTMLKulCompareElement) => CompareOptions;
export interface CompareOptions extends BaseWidgetOptions<CompareValueDeserializedValue> {
  getComp(): HTMLKulCompareElement;
}
export type CompareSetter = () => {
  [CustomWidgetName.compare]: BaseWidgetCallback<CustomWidgetName.compare>;
};
export type CompareValueDeserializedValue = KulDataDataset;
export enum CompareCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
