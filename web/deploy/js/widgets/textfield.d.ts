import { CustomWidgetName } from '../types/widgets';
export declare const textfieldFactory: {
    cssClasses: {
        content: string;
    };
    options: (textfield: HTMLKulTextfieldElement) => {
        hideOnZoom: boolean;
        getComp(): HTMLKulTextfieldElement;
        getValue(): string;
        setProps(props: Partial<HTMLKulTextfieldElement>): void;
        setValue(value: string): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
