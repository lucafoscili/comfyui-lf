export declare const codeFactory: {
    cssClasses: {
        content: string;
        code: string;
    };
    options: (code: HTMLKulCodeElement) => CodeWidgetOptions;
    render: (node: NodeType, name: string) => {
        widget: Widget;
    };
};
