import { CustomWidgetName, TreeWidgetOptions } from '../types/widgets';
export declare const treeFactory: {
    cssClasses: {
        content: string;
        tree: string;
    };
    options: (tree: HTMLKulTreeElement) => TreeWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
