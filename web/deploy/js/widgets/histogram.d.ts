import { HistogramWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const histogramFactory: {
    cssClasses: {
        content: string;
        histogram: string;
    };
    options: (histogram: HTMLKulChartElement) => HistogramWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
    resize: (node: NodeType) => void;
};
