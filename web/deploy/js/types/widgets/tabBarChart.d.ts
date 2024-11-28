import { AnalyticsType } from '../api/api';
import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum TabBarChartCSS {
    Content = "lf-tabbarchart",
    Directory = "lf-tabbarchart__directory",
    DirectoryHidden = "lf-tabbarchart__directory--hidden",
    Grid = "lf-tabbarchart__grid",
    GridNoDirectory = "lf-tabbarchart__grid--no-directory",
    Spinner = "lf-tabbarchart__spinner",
    Tabbar = "lf-tabbarchart__tabbar"
}
export type TabBarChart = Widget<CustomWidgetName.tabBarChart>;
export type TabBarChartFactory = WidgetFactory<TabBarChartDeserializedValue, TabBarChartState>;
export type TabBarChartNormalizeCallback = NormalizeValueCallback<TabBarChartDeserializedValue | string>;
export type TabBarChartDeserializedValue = {
    directory?: string;
} & {
    [index: string]: KulDataDataset;
};
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
export declare enum TabBarChartColors {
    Blue = "blue",
    Green = "green",
    Red = "red"
}
export declare enum TabBarChartIds {
    Blue = "blue",
    Counter = "counter",
    Green = "green",
    Intensity = "intensity",
    Name = "name",
    Red = "red"
}
