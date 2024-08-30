import { KulDataDataset } from './ketchup-lite/components';
export type BaseWidgetCallback = <T extends CustomWidgetName>(node: NodeType, name: T) => {
    widget: Widget;
};
export declare enum CustomWidgetName {
    booleanViewer = "KUL_BOOLEAN_VIEWER",
    chart = "KUL_CHART",
    code = "KUL_CODE",
    controlPanel = "KUL_CONTROL_PANEL",
    imagePreview = "IMAGE_PREVIEW_B64",
    jsonInput = "KUL_JSON_INPUT",
    tree = "KUL_TREE"
}
export interface CustomWidgetSetters {
    [CustomWidgetName.booleanViewer](node: NodeType, name: string): {
        widget: BooleanViewerWidget;
    };
    [CustomWidgetName.chart](node: NodeType, name: string): {
        widget: ChartWidget;
    };
    [CustomWidgetName.code](node: NodeType, name: string): {
        widget: CodeWidget;
    };
    [CustomWidgetName.controlPanel](node: NodeType, name: string): {
        widget: ControlPanelWidget;
    };
    [CustomWidgetName.imagePreview](node: NodeType, name: string): {
        widget: ImagePreviewWidget;
    };
    [CustomWidgetName.jsonInput](node: NodeType, name: string): {
        widget: JsonInputWidget;
    };
    [CustomWidgetName.tree](node: NodeType, name: string): {
        widget: TreeWidget;
    };
}
export type CustomWidgetMap = {
    [CustomWidgetName.booleanViewer]: BooleanViewerWidget;
    [CustomWidgetName.chart]: ChartWidget;
    [CustomWidgetName.code]: CodeWidget;
    [CustomWidgetName.controlPanel]: ControlPanelWidget;
    [CustomWidgetName.imagePreview]: ImagePreviewWidget;
    [CustomWidgetName.jsonInput]: JsonInputWidget;
    [CustomWidgetName.tree]: TreeWidget;
};
export type CustomWidgetOptions = BooleanViewerWidgetOptions | ChartWidgetOptions | CodeWidgetOptions | ControlPanelWidgetOptions | ImagePreviewWidgetOptions | JsonInputWidgetOptions | TreeWidgetOptions;
export interface ChartWidget extends Widget {
    options: ChartWidgetOptions;
    type: [CustomWidgetName.chart];
}
export interface ChartWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChartElement;
    getValue(): string;
    setProps(props: Partial<HTMLKulChartElement>): void;
    setValue(value: KulDataDataset | string): void;
}
export type ChartWidgetsSetter = () => {
    [CustomWidgetName.chart]: BaseWidgetCallback;
};
export type ChartWidgetValue = string;
export interface CodeWidget extends Widget {
    options: CodeWidgetOptions;
    type: [CustomWidgetName.code];
}
export interface CodeWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulCodeElement;
    getValue(): string;
    setProps(props: Partial<HTMLKulCodeElement>): void;
    setValue(value: Record<string, unknown> | string): void;
}
export type CodeWidgetsSetter = () => {
    [CustomWidgetName.code]: BaseWidgetCallback;
};
export type CodeWidgetValue = string;
export interface ControlPanelWidget extends Widget {
    options: ControlPanelWidgetOptions;
    type: [CustomWidgetName.controlPanel];
}
export interface ControlPanelWidgetOptions {
    getValue(): ControlPanelWidgetValue;
    setValue(value: ControlPanelWidgetValue): void;
}
export type ControlPanelWidgetsSetter = () => {
    [CustomWidgetName.controlPanel]: BaseWidgetCallback;
};
export interface ControlPanelWidgetValue {
    debug: boolean;
    themes: string;
}
export interface JsonInputWidget extends Widget {
    options: JsonInputWidgetOptions;
    type: [CustomWidgetName.jsonInput];
}
export interface JsonInputWidgetOptions {
    hideOnZoom: boolean;
    getValue(): JsonInputWidgetValue;
    setValue(value: JsonInputWidgetValue): void;
}
export declare type JsonInputWidgetsSetter = () => {
    [CustomWidgetName.jsonInput]: BaseWidgetCallback;
};
export type JsonInputWidgetValue = string | Record<string, unknown>;
export interface ImagePreviewWidget extends Widget {
    options: ImagePreviewWidgetOptions;
    type: [CustomWidgetName.imagePreview];
}
export interface ImagePreviewWidgetOptions {
    hideOnZoom: boolean;
    getValue(): ImagePreviewWidgetValue;
    setValue(value: ImagePreviewWidgetValue): void;
}
export declare type ImagePreviewWidgetsSetter = () => {
    [CustomWidgetName.imagePreview]: BaseWidgetCallback;
};
export interface ImagePreviewWidgetValue {
    fileNames: string[];
    images: string[];
}
export interface BooleanViewerWidget extends Widget {
    options: BooleanViewerWidgetOptions;
    type: [CustomWidgetName.booleanViewer];
}
export interface BooleanViewerWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulTextfieldElement;
    getValue(): BooleanViewerWidgetValue;
    setProps(props: Partial<HTMLKulTextfieldElement>): void;
    setValue(value: BooleanViewerWidgetValue): void;
}
export declare type BooleanViewerWidgetsSetter = () => {
    [CustomWidgetName.booleanViewer]: BaseWidgetCallback;
};
export type BooleanViewerWidgetValue = string;
export interface TreeWidget extends Widget {
    options: TreeWidgetOptions;
    type: [CustomWidgetName.tree];
}
export interface TreeWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulTreeElement;
    getValue(): TreeWidgetValue;
    setProps(props: Partial<HTMLKulTreeElement>): void;
    setValue(value: TreeWidgetValue): void;
}
export declare type TreeWidgetsSetter = () => {
    [CustomWidgetName.tree]: BaseWidgetCallback;
};
export type TreeWidgetValue = string | KulDataDataset;
