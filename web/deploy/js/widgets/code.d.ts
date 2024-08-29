export declare const codeFactory: {
    cssClasses: {
        content: string;
        code: string;
    };
    options: (code: HTMLKulCodeElement) => {
        hideOnZoom: boolean;
        getComp(): HTMLKulCodeElement;
        getValue(): string;
        setProps(props: Partial<HTMLKulCodeElement>): void;
        setValue(value: Record<string, unknown> | string): void;
    };
    render: (node: NodeType, name: string) => {
        widget: Widget;
    };
};
