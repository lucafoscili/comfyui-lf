import { CompareWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const compareFactory: {
    cssClasses: {
        content: string;
        compare: string;
    };
    options: (compare: HTMLKulCompareElement) => CompareWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
