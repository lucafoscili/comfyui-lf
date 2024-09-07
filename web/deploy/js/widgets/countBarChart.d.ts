import { CountBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const countBarChartFactory: {
    cssClasses: {
        content: string;
        widget: string;
    };
    options: (countbarchart: HTMLKulChartElement) => CountBarChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
    resize: (node: NodeType) => void;
};
