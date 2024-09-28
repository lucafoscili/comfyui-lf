import { CardWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const cardFactory: {
    cssClasses: {
        content: string;
        card: string;
    };
    options: (card: HTMLKulCardElement) => CardWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
