import { KulDataDataset } from './ketchup-lite/components';
export type BaseWidgetCallback = <T extends CustomWidgetName>(node: NodeType, name: T) => {
    widget: Widget;
};
export type ComfyWidgetCallback = <T extends ComfyWidgetName>(node: NodeType, name: T) => {
    widget: Widget;
};
export type ComfyWidgetMap = {
    [ComfyWidgetName.boolean]: Widget;
    [ComfyWidgetName.float]: Widget;
    [ComfyWidgetName.integer]: Widget;
    [ComfyWidgetName.string]: Widget;
};
export declare enum ComfyWidgetName {
    boolean = "BOOLEAN",
    float = "FLOAT",
    integer = "INTEGER",
    string = "STRING"
}
export type CustomWidgetMap = {
    [CustomWidgetName.booleanViewer]: BooleanViewerWidget;
    [CustomWidgetName.chat]: ChatWidget;
    [CustomWidgetName.code]: CodeWidget;
    [CustomWidgetName.controlPanel]: ControlPanelWidget;
    [CustomWidgetName.countBarChart]: CountBarChartWidget;
    [CustomWidgetName.histogram]: HistogramWidget;
    [CustomWidgetName.history]: HistoryWidget;
    [CustomWidgetName.imagePreview]: ImagePreviewWidget;
    [CustomWidgetName.jsonInput]: JsonInputWidget;
    [CustomWidgetName.rollViewer]: RollViewerWidget;
    [CustomWidgetName.tree]: TreeWidget;
    [CustomWidgetName.upload]: UploadWidget;
};
export declare enum CustomWidgetName {
    booleanViewer = "KUL_BOOLEAN_VIEWER",
    chat = "KUL_CHAT",
    code = "KUL_CODE",
    controlPanel = "KUL_CONTROL_PANEL",
    countBarChart = "KUL_COUNT_BAR_CHART",
    histogram = "KUL_HISTOGRAM",
    history = "KUL_HISTORY",
    imagePreview = "KUL_IMAGE_PREVIEW_B64",
    jsonInput = "KUL_JSON_INPUT",
    rollViewer = "KUL_ROLL_VIEWER",
    tree = "KUL_TREE",
    upload = "KUL_UPLOAD"
}
export type CustomWidgetOptions = BooleanViewerWidgetOptions | ChatWidgetOptions | CodeWidgetOptions | ControlPanelWidgetOptions | CountBarChartWidgetOptions | HistogramWidgetOptions | HistoryWidgetOptions | ImagePreviewWidgetOptions | JsonInputWidgetOptions | RollViewerWidgetOptions | TreeWidgetOptions | UploadWidgetOptions;
export interface CustomWidgetSetters {
    [CustomWidgetName.booleanViewer](node: NodeType, name: CustomWidgetName.booleanViewer): {
        widget: BooleanViewerWidget;
    };
    [CustomWidgetName.chat](node: NodeType, name: CustomWidgetName.chat): {
        widget: ChatWidget;
    };
    [CustomWidgetName.code](node: NodeType, name: CustomWidgetName.code): {
        widget: CodeWidget;
    };
    [CustomWidgetName.controlPanel](node: NodeType, name: CustomWidgetName.controlPanel): {
        widget: ControlPanelWidget;
    };
    [CustomWidgetName.countBarChart](node: NodeType, name: CustomWidgetName.countBarChart): {
        widget: CountBarChartWidget;
    };
    [CustomWidgetName.histogram](node: NodeType, name: CustomWidgetName.histogram): {
        widget: HistogramWidget;
    };
    [CustomWidgetName.history](node: NodeType, name: CustomWidgetName.history): {
        widget: HistoryWidget;
    };
    [CustomWidgetName.imagePreview](node: NodeType, name: CustomWidgetName.imagePreview): {
        widget: ImagePreviewWidget;
    };
    [CustomWidgetName.jsonInput](node: NodeType, name: CustomWidgetName.jsonInput): {
        widget: JsonInputWidget;
    };
    [CustomWidgetName.rollViewer](node: NodeType, name: CustomWidgetName.rollViewer): {
        widget: RollViewerWidget;
    };
    [CustomWidgetName.tree](node: NodeType, name: CustomWidgetName.tree): {
        widget: TreeWidget;
    };
    [CustomWidgetName.upload](node: NodeType, name: CustomWidgetName.upload): {
        widget: UploadWidget;
    };
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
export interface ChatWidget extends Widget {
    options: ChatWidgetOptions;
    type: [CustomWidgetName.chat];
}
export interface ChatWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChatElement;
    getValue(): void;
    setProps(props: Partial<HTMLKulChatElement>): void;
    setValue(history: string): void;
}
export type ChatWidgetsSetter = () => {
    [CustomWidgetName.chat]: BaseWidgetCallback;
};
export type ChatWidgetValue = string;
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
export interface HistogramWidget extends Widget {
    options: HistogramWidgetOptions;
    type: [CustomWidgetName.histogram];
}
export interface HistogramWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChartElement;
    getValue(): string;
    setProps(props: Partial<HTMLKulChartElement>): void;
    setValue(value: KulDataDataset | string): void;
}
export type HistogramWidgetsSetter = () => {
    [CustomWidgetName.histogram]: BaseWidgetCallback;
};
export type HistogramWidgetValue = string;
export interface HistoryWidget extends Widget {
    options: HistoryWidgetOptions;
    type: [CustomWidgetName.history];
}
export interface HistoryWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulListElement;
    getValue(): HistoryWidgetValue;
    setProps(props: Partial<HTMLKulListElement>): void;
    setValue(value: HistoryWidgetValue): void;
}
export declare type HistoryWidgetsSetter = () => {
    [CustomWidgetName.history]: BaseWidgetCallback;
};
export type HistoryWidgetValue = string | KulDataDataset;
export interface ImagePreviewWidget extends Widget {
    options: ImagePreviewWidgetOptions;
    type: [CustomWidgetName.imagePreview];
}
export interface ImagePreviewWidgetOptions {
    hideOnZoom: boolean;
    getValue(): ImagePreviewWidgetValue;
    selectable: boolean;
    setValue(value: ImagePreviewWidgetValue): void;
}
export declare type ImagePreviewWidgetsSetter = () => {
    [CustomWidgetName.imagePreview]: BaseWidgetCallback;
};
export interface ImagePreviewWidgetValue {
    fileNames: string[];
    images: string[];
    selectedIndex?: number;
    selectedName?: string;
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
export interface CountBarChartWidget extends Widget {
    options: CountBarChartWidgetOptions;
    type: [CustomWidgetName.countBarChart];
}
export interface CountBarChartWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChartElement;
    getValue(): string;
    setProps(props: Partial<HTMLKulChartElement>): void;
    setValue(value: KulDataDataset | string): void;
}
export type CountBarChartWidgetsSetter = () => {
    [CustomWidgetName.countBarChart]: BaseWidgetCallback;
};
export type CountBarChartWidgetValue = string;
export interface RollViewerWidget extends Widget {
    options: RollViewerWidgetOptions;
    type: [CustomWidgetName.rollViewer];
}
export interface RollViewerWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulProgressbarElement;
    getValue(): RollViewerWidgetValue;
    setProps(props: Partial<HTMLKulProgressbarElement>): void;
    setValue(value: RollViewerWidgetValue): void;
}
export declare type RollViewerWidgetsSetter = () => {
    [CustomWidgetName.rollViewer]: BaseWidgetCallback;
};
export type RollViewerWidgetValue = {
    bool: boolean;
    roll: number;
};
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
export interface UploadWidget extends Widget {
    options: UploadWidgetOptions;
    type: [CustomWidgetName.upload];
}
export interface UploadWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulUploadElement;
    getValue(): UploadWidgetValue;
    setProps(props: Partial<HTMLKulUploadElement>): void;
    setValue(value: UploadWidgetValue): void;
}
export declare type UploadWidgetsSetter = () => {
    [CustomWidgetName.upload]: BaseWidgetCallback;
};
export type UploadWidgetValue = string;
