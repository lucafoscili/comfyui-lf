import { CountBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const countBarChartFactory: {
    cssClasses: {
        content: string;
        widget: string;
    };
    options: (countBarChart: HTMLKulChartElement) => CountBarChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
