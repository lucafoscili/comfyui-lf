import { CustomWidgetName } from '../types/widgets.js';
export declare class LFWidgets {
    #private;
    constructor();
    add: {
        KUL_BOOLEAN_VIEWER: (nodeType: NodeType) => any;
        KUL_CHART: (nodeType: NodeType) => any;
        KUL_CHAT: (nodeType: NodeType) => any;
        KUL_CODE: (nodeType: NodeType) => any;
        KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
        KUL_JSON_INPUT: (nodeType: NodeType) => any;
        IMAGE_PREVIEW_B64: (nodeType: NodeType) => any;
        KUL_HISTORY: (nodeType: NodeType) => any;
        KUL_TREE: (nodeType: NodeType) => any;
    };
    option: {
        KUL_BOOLEAN_VIEWER: (booleanViewer: HTMLKulTextfieldElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulTextfieldElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulTextfieldElement>): void;
            setValue(value: string): void;
        };
        KUL_CHART: (chart: HTMLKulChartElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulChartElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulChartElement>): void;
            setValue(value: Record<string, unknown> | string): void;
        };
        KUL_CHAT: (chat: HTMLKulChatElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulChatElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulChatElement>): void;
            setValue(history: string): void;
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
        KUL_JSON_INPUT: (content: HTMLTextAreaElement) => {
            hideOnZoom: boolean;
            getValue(): string;
            setValue(value: Record<string, unknown> | string): void;
        };
        IMAGE_PREVIEW_B64: (content: HTMLDivElement) => {
            hideOnZoom: boolean;
            getValue(): {
                fileNames: any[];
                images: any[];
            };
            setValue(value: import("../types/widgets.js").ImagePreviewWidgetValue): void;
        };
        KUL_HISTORY: (history: HTMLKulListElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulListElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulListElement>): void;
            setValue(value: import("../types/ketchup-lite/components.js").KulDataDataset | string): void;
        };
        KUL_TREE: (tree: HTMLKulTreeElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulTreeElement;
            getValue(): string;
            setProps(props: Partial<HTMLKulTreeElement>): void;
            setValue(value: import("../types/ketchup-lite/components.js").KulDataDataset | string): void;
        };
    };
    resizerHandler: {
        KUL_CHART: (nodeType: NodeType) => void;
    };
    set: {
        KUL_BOOLEAN_VIEWER: () => {
            KUL_BOOLEAN_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CHART: () => {
            KUL_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CHAT: () => {
            KUL_CHAT: (nodeType: NodeType, name: CustomWidgetName) => any;
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
        KUL_JSON_INPUT: () => {
            KUL_JSON_INPUT: (nodeType: NodeType, name: CustomWidgetName) => any;
        };
        IMAGE_PREVIEW_B64: () => {
            IMAGE_PREVIEW_B64: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_HISTORY: () => {
            KUL_HISTORY: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_TREE: () => {
            KUL_TREE: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
    };
    get: {
        adders: {
            KUL_BOOLEAN_VIEWER: (nodeType: NodeType) => any;
            KUL_CHART: (nodeType: NodeType) => any;
            KUL_CHAT: (nodeType: NodeType) => any;
            KUL_CODE: (nodeType: NodeType) => any;
            KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
            KUL_JSON_INPUT: (nodeType: NodeType) => any;
            IMAGE_PREVIEW_B64: (nodeType: NodeType) => any;
            KUL_HISTORY: (nodeType: NodeType) => any;
            KUL_TREE: (nodeType: NodeType) => any;
        };
        options: {
            KUL_BOOLEAN_VIEWER: (booleanViewer: HTMLKulTextfieldElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulTextfieldElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulTextfieldElement>): void;
                setValue(value: string): void;
            };
            KUL_CHART: (chart: HTMLKulChartElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulChartElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulChartElement>): void;
                setValue(value: Record<string, unknown> | string): void;
            };
            KUL_CHAT: (chat: HTMLKulChatElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulChatElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulChatElement>): void;
                setValue(history: string): void;
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
            KUL_JSON_INPUT: (content: HTMLTextAreaElement) => {
                hideOnZoom: boolean;
                getValue(): string;
                setValue(value: Record<string, unknown> | string): void;
            };
            IMAGE_PREVIEW_B64: (content: HTMLDivElement) => {
                hideOnZoom: boolean;
                getValue(): {
                    fileNames: any[];
                    images: any[];
                };
                setValue(value: import("../types/widgets.js").ImagePreviewWidgetValue): void;
            };
            KUL_HISTORY: (history: HTMLKulListElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulListElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulListElement>): void;
                setValue(value: import("../types/ketchup-lite/components.js").KulDataDataset | string): void;
            };
            KUL_TREE: (tree: HTMLKulTreeElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulTreeElement;
                getValue(): string;
                setProps(props: Partial<HTMLKulTreeElement>): void;
                setValue(value: import("../types/ketchup-lite/components.js").KulDataDataset | string): void;
            };
        };
        resizerHandlers: {
            KUL_CHART: (nodeType: NodeType) => void;
        };
        setters: {
            KUL_BOOLEAN_VIEWER: () => {
                KUL_BOOLEAN_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CHART: () => {
                KUL_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CHAT: () => {
                KUL_CHAT: (nodeType: NodeType, name: CustomWidgetName) => any;
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
            KUL_JSON_INPUT: () => {
                KUL_JSON_INPUT: (nodeType: NodeType, name: CustomWidgetName) => any;
            };
            IMAGE_PREVIEW_B64: () => {
                IMAGE_PREVIEW_B64: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_HISTORY: () => {
                KUL_HISTORY: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_TREE: () => {
                KUL_TREE: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
        };
    };
}
