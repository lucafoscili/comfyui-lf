import { TabBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const tabBarChartFactory: {
    cssClasses: {
        content: string;
        grid: string;
        spinner: string;
    };
    options: (chart: HTMLKulChartElement, tabbar: HTMLKulTabbarElement, textfield: HTMLKulTextfieldElement) => TabBarChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
