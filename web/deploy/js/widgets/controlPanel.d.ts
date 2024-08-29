import { CustomWidgetName } from '../types/widgets';
export declare const controlPanelFactory: {
    cssClasses: {
        content: string;
        debug: string;
        spinner: string;
        themes: string;
    };
    options: () => {
        getValue(): {
            debug: boolean;
            themes: string;
        };
        setValue(value: any): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
