export declare class LFWidgets {
    #private;
    constructor();
    add: {
        chart: (nodeType: NodeType) => any;
        code: (nodeType: NodeType) => any;
        controlPanel: (nodeType: NodeType) => any;
    };
    option: {
        chart: (chart: HTMLKulChartElement) => ChartWidgetOptions;
        code: (code: HTMLKulCodeElement) => CodeWidgetOptions;
        controlPanel: () => ControlPanelWidgetOptions;
    };
    resizerHandler: {
        chart: (nodeType: NodeType) => void;
    };
    set: {
        chart: () => {
            KUL_CHART: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
        code: () => {
            KUL_CODE: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
        controlPanel: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
    };
    get: {
        adders: {
            chart: (nodeType: NodeType) => any;
            code: (nodeType: NodeType) => any;
            controlPanel: (nodeType: NodeType) => any;
        };
        options: {
            chart: (chart: HTMLKulChartElement) => ChartWidgetOptions;
            code: (code: HTMLKulCodeElement) => CodeWidgetOptions;
            controlPanel: () => ControlPanelWidgetOptions;
        };
        resizerHandlers: {
            chart: (nodeType: NodeType) => void;
        };
        setters: {
            chart: () => {
                KUL_CHART: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
            code: () => {
                KUL_CODE: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
            controlPanel: () => {
                KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
        };
    };
}
