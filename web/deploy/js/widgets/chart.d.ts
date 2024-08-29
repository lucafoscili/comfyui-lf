export declare const chartFactory: {
    cssClasses: {
        content: string;
        chart: string;
    };
    options: (chart: HTMLKulChartElement) => ChartWidgetOptions;
    render: (node: NodeType, name: string) => {
        widget: Widget;
    };
    resize: (node: NodeType) => void;
};
