import { ChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const chartFactory: {
    cssClasses: {
        content: string;
        chart: string;
    };
    options: (chart: HTMLKulChartElement) => ChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
    resize: (node: NodeType) => void;
};
