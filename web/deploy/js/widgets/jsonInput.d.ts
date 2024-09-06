import { CustomWidgetName, JsonInputWidgetOptions } from '../types/widgets';
export declare const jsonInputFactory: {
    cssClasses: {
        content: string;
        widget: string;
        widgetError: string;
    };
    options: (jsonInput: HTMLTextAreaElement) => JsonInputWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => any;
};
