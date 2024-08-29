import { CustomWidgetName } from '../types/widgets.js';
export declare class LFWidgets {
    #private;
    constructor();
    add: {
        KUL_CHART: (nodeType: NodeType) => any;
        KUL_CODE: (nodeType: NodeType) => any;
        KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
        IMAGE_PREVIEW_B64: (nodeType: NodeType) => any;
        KUL_TEXTFIELD: (nodeType: NodeType) => any;
    };
    option: {
        KUL_CHART: (chart: HTMLKulChartElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulChartElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulChartElement>): void;
            setValue(value: Record<string, unknown> | string): void;
        };
        KUL_CODE: (code: HTMLKulCodeElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulCodeElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulCodeElement>): void;
            setValue(value: Record<string, unknown> | string): void;
        };
        KUL_CONTROL_PANEL: () => {
            getValue(): {
                debug: boolean;
                themes: string;
            };
            setValue(value: any): void;
        };
        IMAGE_PREVIEW_B64: (content: HTMLDivElement) => {
            hideOnZoom: boolean;
            getValue(): {
                fileNames: any[];
                images: any[];
            };
            setValue(value: import("../types/widgets.js").ImagePreviewWidgetValue): void;
        };
        KUL_TEXTFIELD: (textfield: HTMLKulTextfieldElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulTextfieldElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulTextfieldElement>): void;
            setValue(value: string): void;
        };
    };
    resizerHandler: {
        KUL_CHART: (nodeType: NodeType) => void;
    };
    set: {
        KUL_CHART: () => {
            KUL_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CODE: () => {
            KUL_CODE: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CONTROL_PANEL: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        IMAGE_PREVIEW_B64: () => {
            IMAGE_PREVIEW_B64: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_TEXTFIELD: () => {
            KUL_TEXTFIELD: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
    };
    get: {
        adders: {
            KUL_CHART: (nodeType: NodeType) => any;
            KUL_CODE: (nodeType: NodeType) => any;
            KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
            IMAGE_PREVIEW_B64: (nodeType: NodeType) => any;
            KUL_TEXTFIELD: (nodeType: NodeType) => any;
        };
        options: {
            KUL_CHART: (chart: HTMLKulChartElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulChartElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulChartElement>): void;
                setValue(value: Record<string, unknown> | string): void;
            };
            KUL_CODE: (code: HTMLKulCodeElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulCodeElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulCodeElement>): void;
                setValue(value: Record<string, unknown> | string): void;
            };
            KUL_CONTROL_PANEL: () => {
                getValue(): {
                    debug: boolean;
                    themes: string;
                };
                setValue(value: any): void;
            };
            IMAGE_PREVIEW_B64: (content: HTMLDivElement) => {
                hideOnZoom: boolean;
                getValue(): {
                    fileNames: any[];
                    images: any[];
                };
                setValue(value: import("../types/widgets.js").ImagePreviewWidgetValue): void;
            };
            KUL_TEXTFIELD: (textfield: HTMLKulTextfieldElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulTextfieldElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulTextfieldElement>): void;
                setValue(value: string): void;
            };
        };
        resizerHandlers: {
            KUL_CHART: (nodeType: NodeType) => void;
        };
        setters: {
            KUL_CHART: () => {
                KUL_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CODE: () => {
                KUL_CODE: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CONTROL_PANEL: () => {
                KUL_CONTROL_PANEL: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            IMAGE_PREVIEW_B64: () => {
                IMAGE_PREVIEW_B64: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_TEXTFIELD: () => {
                KUL_TEXTFIELD: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
        };
    };
}
