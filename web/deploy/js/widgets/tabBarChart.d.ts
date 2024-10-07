import { TabBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const tabBarChartFactory: {
    cssClasses: {
        content: string;
        grid: string;
        spinner: string;
    };
    options: (domWidget: HTMLDivElement) => TabBarChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
