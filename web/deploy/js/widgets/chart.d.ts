export declare const chartFactory: {
    cssClasses: {
        content: string;
        chart: string;
    };
    options: (chart: HTMLKulChartElement) => {
        hideOnZoom: boolean;
        getComp(): HTMLKulChartElement;
        getValue(): string;
        setProps(props: Partial<HTMLKulChartElement>): void;
        setValue(value: Record<string, unknown> | string): void;
    };
    render: (node: NodeType, name: string) => {
        widget: Widget;
    };
    resize: (node: NodeType) => void;
};
