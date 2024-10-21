import { NodeName } from '../types/nodes';
import { TabBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const tabBarChartFactory: {
    cssClasses: {
        content: string;
        directory: string;
        directoryHidden: string;
        grid: string;
        gridNoDirectory: string;
        spinner: string;
    };
    options: (chart: HTMLKulChartElement, tabbar: HTMLKulTabbarElement, textfield: HTMLKulTextfieldElement, node: NodeName) => TabBarChartWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
