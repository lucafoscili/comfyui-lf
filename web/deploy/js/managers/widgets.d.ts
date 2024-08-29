export declare class LFWidgets {
    #private;
    constructor();
    add: {
        chart: (nodeType: NodeType) => any;
        code: (nodeType: NodeType) => any;
        controlPanel: (nodeType: NodeType) => any;
    };
    option: {
        chart: (chart: HTMLKulChartElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulChartElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulChartElement>): void;
            setValue(value: Record<string, unknown> | string): void;
        };
        code: (code: HTMLKulCodeElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulCodeElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulCodeElement>): void;
            setValue(value: Record<string, unknown> | string): void;
        };
        controlPanel: () => {
            getValue(): {
                debug: boolean;
                themes: string;
            };
            setValue(value: any): void;
        };
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
            chart: (chart: HTMLKulChartElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulChartElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulChartElement>): void;
                setValue(value: Record<string, unknown> | string): void;
            };
            code: (code: HTMLKulCodeElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulCodeElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulCodeElement>): void;
                setValue(value: Record<string, unknown> | string): void;
            };
            controlPanel: () => {
                getValue(): {
                    debug: boolean;
                    themes: string;
                };
                setValue(value: any): void;
            };
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
