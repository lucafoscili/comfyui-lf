import { CardWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const cardFactory: {
    cssClasses: {
        content: string;
        contentHasButton: string;
        grid: string;
    };
    options: (grid: HTMLDivElement) => CardWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
