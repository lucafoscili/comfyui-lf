import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-countbarchart';

//#region Count bar chart
export interface CountBarChart extends Widget {
  options: CountBarChartOptions;
  type: [CustomWidgetName.countBarChart];
}
export interface CountBarChartFactory extends BaseWidgetFactory<CountBarChartOptions> {
  options: CountBarChartOptionsCallback;
}
export type CountBarChartOptionsCallback = (
  chart: HTMLKulChartElement,
  chip: HTMLKulChipElement,
  button: HTMLKulButtonElement,
) => CountBarChartOptions;
export interface CountBarChartOptions extends BaseWidgetOptions<CountBarChartDeserializedValue> {
  getComp(): { chart: HTMLKulChartElement; chip: HTMLKulChipElement };
}
export type CountBarChartSetter = () => {
  [CustomWidgetName.countBarChart]: BaseWidgetCallback<CustomWidgetName.countBarChart>;
};
export type CountBarChartDeserializedValue = {
  chart: KulDataDataset;
  chip: KulDataDataset;
};
export enum CountBarChartCSS {
  Content = BASE_CSS_CLASS,
  Grid = `${BASE_CSS_CLASS}__grid`,
  Chart = `${BASE_CSS_CLASS}__chart`,
  Chip = `${BASE_CSS_CLASS}__chip`,
  Button = `${BASE_CSS_CLASS}__button`,
  ButtonHidden = `${BASE_CSS_CLASS}__button--hidden`,
}
//#endregion
