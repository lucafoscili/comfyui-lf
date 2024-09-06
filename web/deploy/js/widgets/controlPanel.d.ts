import { ControlPanelWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const controlPanelFactory: {
    cssClasses: {
        content: string;
        debug: string;
        spinner: string;
        themes: string;
    };
    options: () => ControlPanelWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
