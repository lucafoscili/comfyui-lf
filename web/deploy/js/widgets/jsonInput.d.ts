import { CustomWidgetName } from '../types/widgets';
export declare const jsonInputFactory: {
    cssClasses: {
        content: string;
        widget: string;
    };
    options: (jsonInput: HTMLTextAreaElement) => {
        hideOnZoom: boolean;
        getValue(): string;
        setValue(value: Record<string, unknown> | string): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => any;
};
