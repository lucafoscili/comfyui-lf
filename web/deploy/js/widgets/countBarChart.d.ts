import { CountBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const countBarChartFactory: {
    cssClasses: {
        content: string;
        grid: string;
        chart: string;
        chip: string;
        button: string;
        buttonHidden: string;
    };
    options: (chart: HTMLKulChartElement, chip: HTMLKulChipElement, button: HTMLKulButtonElement) => CountBarChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
