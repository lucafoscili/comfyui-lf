import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from '../widgets';
export interface CountBarChart extends Widget {
    options: CountBarChartOptions;
    type: [CustomWidgetName.countBarChart];
}
export interface CountBarChartFactory extends BaseWidgetFactory<CountBarChartOptions> {
    options: CountBarChartOptionsCallback;
}
export type CountBarChartOptionsCallback = (chart: HTMLKulChartElement, chip: HTMLKulChipElement, button: HTMLKulButtonElement) => CountBarChartOptions;
export interface CountBarChartOptions extends BaseWidgetOptions<CountBarChartDeserializedValue> {
    getComp(): {
        chart: HTMLKulChartElement;
        chip: HTMLKulChipElement;
    };
}
export type CountBarChartSetter = () => {
    [CustomWidgetName.countBarChart]: BaseWidgetCallback<CustomWidgetName.countBarChart>;
};
export type CountBarChartDeserializedValue = {
    chart: KulDataDataset;
    chip: KulDataDataset;
};
