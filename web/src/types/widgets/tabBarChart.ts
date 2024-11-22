import { AnalyticsType } from '../api/api';
import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
  NodeName,
} from './_common';

const BASE_CSS_CLASS = 'lf-tabbarchart';

//#region Tab bar chart
export interface TabBarChart extends Widget {
  options: TabBarChartOptions;
  type: [CustomWidgetName.tabBarChart];
}
export interface TabBarChartFactory extends BaseWidgetFactory<TabBarChartOptions> {
  options: TabBarChartOptionsCallback;
}
export type TabBarChartOptionsCallback = (
  chart: HTMLKulChartElement,
  tabbar: HTMLKulTabbarElement,
  textfield: HTMLKulTextfieldElement,
  node: NodeName,
) => TabBarChartOptions;
export interface TabBarChartOptions extends BaseWidgetOptions<TabBarChartDeserializedValue> {
  getComp(): { chart: HTMLKulChartElement; tabbar: HTMLKulTabbarElement };
  refresh(type: AnalyticsType): void;
}
export type TabBarChartSetter = () => {
  [CustomWidgetName.tabBarChart]: BaseWidgetCallback<CustomWidgetName.tabBarChart>;
};
export type TabBarChartDeserializedValue = {
  directory?: string;
} & {
  [index: string]: KulDataDataset;
};
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
