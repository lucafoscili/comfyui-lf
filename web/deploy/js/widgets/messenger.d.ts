import { MessengerWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const messengerFactory: {
    cssClasses: {
        content: string;
        messenger: string;
        placeholder: string;
        placeholderHidden: string;
    };
    options: (messenger: HTMLKulMessengerElement, placeholder: HTMLDivElement) => MessengerWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
