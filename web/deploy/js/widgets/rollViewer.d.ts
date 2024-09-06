import { CustomWidgetName, RollViewerWidgetOptions } from '../types/widgets';
export declare const rollViewerFactory: {
    cssClasses: {
        content: string;
    };
    options: (rollViewer: HTMLKulProgressbarElement) => RollViewerWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
