import { AnalyticsType } from '../api/api';
import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-tabbarchart';
export enum TabBarChartCSS {
  Content = BASE_CSS_CLASS,
  Directory = `${BASE_CSS_CLASS}__directory`,
  DirectoryHidden = `${BASE_CSS_CLASS}__directory--hidden`,
  Grid = `${BASE_CSS_CLASS}__grid`,
  GridNoDirectory = `${BASE_CSS_CLASS}__grid--no-directory`,
  Spinner = `${BASE_CSS_CLASS}__spinner`,
  Tabbar = `${BASE_CSS_CLASS}__tabbar`,
}
//#endregion
//#region Widget
export type TabBarChart = Widget<CustomWidgetName.tabBarChart>;
export type TabBarChartFactory = WidgetFactory<TabBarChartDeserializedValue, TabBarChartState>;
export type TabBarChartNormalizeCallback = NormalizeValueCallback<
  TabBarChartDeserializedValue | string
>;
//#endregion
//#region Value
export type TabBarChartDeserializedValue = {
  directory?: string;
} & {
  [index: string]: KulDataDataset;
};
//#endregion
//#region State
export interface TabBarChartState extends BaseWidgetState {
  directory: string;
  elements: {
    chart: HTMLKulChartElement;
    tabbar: HTMLKulTabbarElement;
    textfield: HTMLKulTextfieldElement;
  };
  selected: string;
  type: AnalyticsType;
}
//#endregion
//#region Dataset
export enum TabBarChartColors {
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
}
export enum TabBarChartIds {
  Blue = 'blue',
  Counter = 'counter',
  Green = 'green',
  Intensity = 'intensity',
  Name = 'name',
  Red = 'red',
}
//#endregion
