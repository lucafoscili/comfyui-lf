import { AnalyticsType } from '../api/api';
import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName, NodeName } from './_common';
export interface TabBarChart extends Widget {
    options: TabBarChartOptions;
    type: [CustomWidgetName.tabBarChart];
}
export interface TabBarChartFactory extends BaseWidgetFactory<TabBarChartOptions> {
    options: TabBarChartOptionsCallback;
}
export type TabBarChartOptionsCallback = (chart: HTMLKulChartElement, tabbar: HTMLKulTabbarElement, textfield: HTMLKulTextfieldElement, node: NodeName) => TabBarChartOptions;
export interface TabBarChartOptions extends BaseWidgetOptions<TabBarChartDeserializedValue> {
    getComp(): {
        chart: HTMLKulChartElement;
        tabbar: HTMLKulTabbarElement;
    };
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
