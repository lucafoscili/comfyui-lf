import { CustomWidgetName, HistoryWidgetOptions } from '../types/widgets';
export declare const historyFactory: {
    cssClasses: {
        content: string;
        history: string;
    };
    options: (history: HTMLKulListElement) => HistoryWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
