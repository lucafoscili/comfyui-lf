import { ControlPanelWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const controlPanelFactory: {
    cssClasses: {
        content: string;
        article: string;
        spinner: string;
    };
    options: () => ControlPanelWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
