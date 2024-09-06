import { ChatWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const chatFactory: {
    cssClasses: {
        content: string;
        chat: string;
    };
    options: (chat: HTMLKulChatElement) => ChatWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => any;
};
