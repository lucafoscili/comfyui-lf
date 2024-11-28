import { KulDataDataset } from '../../types/ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum CountBarChartCSS {
    Content = "lf-countbarchart",
    Widget = "lf-countbarchart__widget"
}
export type CountBarChart = Widget<CustomWidgetName.countBarChart>;
export type CountBarChartFactory = WidgetFactory<CountBarChartDeserializedValue, CountBarChartState>;
export type CountBarChartNormalizeCallback = NormalizeValueCallback<CountBarChartDeserializedValue | string>;
export type CountBarChartDeserializedValue = {
    chart: KulDataDataset;
    chip: KulDataDataset;
};
export interface CountBarChartState extends BaseWidgetState {
    card: HTMLKulCardElement;
    datasets: {
        chart: KulDataDataset;
        chip: KulDataDataset;
    };
}
