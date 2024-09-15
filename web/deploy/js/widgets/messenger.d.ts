import { MessengerWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const messengerFactory: {
    cssClasses: {
        content: string;
        messenger: string;
    };
    options: (messenger: HTMLKulMessengerElement) => MessengerWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
