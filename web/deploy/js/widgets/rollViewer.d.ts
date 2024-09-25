import { CustomWidgetName, RollViewerWidgetOptions } from '../types/widgets';
export declare const rollViewerFactory: {
    cssClasses: {
        content: string;
    };
    options: (rollViewer: HTMLKulProgressbarElement, nodeType: NodeType) => RollViewerWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
