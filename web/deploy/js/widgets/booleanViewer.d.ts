import { BooleanViewerWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const booleanViewerFactory: {
    cssClasses: {
        content: string;
    };
    options: (booleanViewer: HTMLKulTextfieldElement) => BooleanViewerWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
