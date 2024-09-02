import { CustomWidgetName } from '../types/widgets';
export declare const chatFactory: {
    cssClasses: {
        content: string;
        chat: string;
    };
    options: (chat: HTMLKulChatElement) => {
        hideOnZoom: boolean;
        getComp(): HTMLKulChatElement;
        getValue(): string;
        setProps(props: Partial<HTMLKulChatElement>): void;
        setValue(history: string): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => any;
};
