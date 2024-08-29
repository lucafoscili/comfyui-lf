import { CustomWidgetName } from '../types/widgets';
export declare const booleanViewerFactory: {
    cssClasses: {
        content: string;
    };
    options: (booleanViewer: HTMLKulTextfieldElement) => {
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
