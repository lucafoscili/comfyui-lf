export declare const controlPanelFactory: {
    cssClasses: {
        content: string;
        debug: string;
        spinner: string;
        themes: string;
    };
    options: () => ControlPanelWidgetOptions;
    render: (node: NodeType, name: string) => {
        widget: Widget;
    };
};
export declare function contentCb(domWidget: HTMLDivElement, isReady: boolean): void;
