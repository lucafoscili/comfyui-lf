import { HistogramWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const histogramFactory: {
    cssClasses: {
        content: string;
        widget: string;
    };
    options: (histogram: HTMLKulChartElement) => HistogramWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
