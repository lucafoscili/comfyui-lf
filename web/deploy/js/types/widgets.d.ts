import { KulDataDataset, KulMessengerDataset, KulMessengerConfig } from './ketchup-lite/components';
export type BaseWidgetCallback = <T extends CustomWidgetName>(node: NodeType, name: T) => {
    widget: Widget;
};
export type ComfyWidgetCallback = <T extends ComfyWidgetName>(node: NodeType, name: T) => {
    widget: Widget;
};
export type ComfyWidgetMap = {
    [ComfyWidgetName.boolean]: Widget;
    [ComfyWidgetName.customtext]: Widget;
    [ComfyWidgetName.float]: Widget;
    [ComfyWidgetName.integer]: Widget;
    [ComfyWidgetName.json]: Widget;
    [ComfyWidgetName.number]: Widget;
    [ComfyWidgetName.string]: Widget;
};
export declare enum ComfyWidgetName {
    boolean = "BOOLEAN",
    customtext = "CUSTOMTEXT",
    float = "FLOAT",
    integer = "INTEGER",
    json = "JSON",
    number = "NUMBER",
    string = "STRING"
}
export type CustomWidgetMap = {
    [CustomWidgetName.booleanViewer]: BooleanViewerWidget;
    [CustomWidgetName.card]: CardWidget;
    [CustomWidgetName.cardsWithChip]: CardsWithChipWidget;
    [CustomWidgetName.chat]: ChatWidget;
    [CustomWidgetName.chip]: ChipWidget;
    [CustomWidgetName.code]: CodeWidget;
    [CustomWidgetName.controlPanel]: ControlPanelWidget;
    [CustomWidgetName.countBarChart]: CountBarChartWidget;
    [CustomWidgetName.histogram]: HistogramWidget;
    [CustomWidgetName.history]: HistoryWidget;
    [CustomWidgetName.imagePreview]: ImagePreviewWidget;
    [CustomWidgetName.jsonInput]: JsonInputWidget;
    [CustomWidgetName.messenger]: MessengerWidget;
    [CustomWidgetName.rollViewer]: RollViewerWidget;
    [CustomWidgetName.tree]: TreeWidget;
    [CustomWidgetName.upload]: UploadWidget;
};
export declare enum CustomWidgetName {
    booleanViewer = "KUL_BOOLEAN_VIEWER",
    card = "KUL_CARD",
    cardsWithChip = "KUL_CARDS_WITH_CHIP",
    chat = "KUL_CHAT",
    chip = "KUL_CHIP",
    code = "KUL_CODE",
    controlPanel = "KUL_CONTROL_PANEL",
    countBarChart = "KUL_COUNT_BAR_CHART",
    histogram = "KUL_HISTOGRAM",
    history = "KUL_HISTORY",
    imagePreview = "KUL_IMAGE_PREVIEW_B64",
    jsonInput = "KUL_JSON_INPUT",
    messenger = "KUL_MESSENGER",
    rollViewer = "KUL_ROLL_VIEWER",
    tree = "KUL_TREE",
    upload = "KUL_UPLOAD"
}
export type CustomWidgetOptions = BooleanViewerWidgetOptions | CardWidgetOptions | CardsWithChipWidgetOptions | ChatWidgetOptions | ChipWidgetOptions | CodeWidgetOptions | ControlPanelWidgetOptions | CountBarChartWidgetOptions | HistogramWidgetOptions | HistoryWidgetOptions | ImagePreviewWidgetOptions | JsonInputWidgetOptions | MessengerWidgetOptions | RollViewerWidgetOptions | TreeWidgetOptions | UploadWidgetOptions;
export interface BooleanViewerWidget extends Widget {
    options: BooleanViewerWidgetOptions;
    type: [CustomWidgetName.booleanViewer];
}
export interface BooleanViewerWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulTextfieldElement;
    getValue(): BooleanViewerWidgetValue;
    setValue(value: BooleanViewerWidgetValue): void;
}
export declare type BooleanViewerWidgetSetter = () => {
    [CustomWidgetName.booleanViewer]: BaseWidgetCallback;
};
export type BooleanViewerWidgetValue = string;
export interface CardWidget extends Widget {
    options: CardWidgetOptions;
    type: [CustomWidgetName.card];
}
export interface CardWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulCardElement[];
    getValue(): string;
    setValue(value: CardWidgetValue): void;
}
export type CardWidgetSetter = () => {
    [CustomWidgetName.card]: BaseWidgetCallback;
};
export type CardWidgetValue = string;
export type CardWidgetDeserializedValue = {
    propsArray: Partial<HTMLKulCardElement>[];
    template: string;
};
export interface CardsWithChipWidget extends Widget {
    options: CardsWithChipWidgetOptions;
    type: [CustomWidgetName.cardsWithChip];
}
export interface CardsWithChipWidgetOptions {
    hideOnZoom: boolean;
    getComp(): {
        cards: HTMLKulCardElement[];
        chip: HTMLKulChipElement;
    };
    getValue(): string;
    setValue(value: CardsWithChipWidgetValue): void;
}
export type CardsWithChipWidgetSetter = () => {
    [CustomWidgetName.cardsWithChip]: BaseWidgetCallback;
};
export type CardsWithChipWidgetValue = string;
export type CardsWithChipWidgetDeserializedValue = {
    cardPropsArray: Partial<HTMLKulCardElement>[];
    chipDataset: KulDataDataset;
};
export interface ChatWidget extends Widget {
    options: ChatWidgetOptions;
    type: [CustomWidgetName.chat];
}
export interface ChatWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChatElement;
    getValue(): void;
    setValue(history: string): void;
}
export type ChatWidgetSetter = () => {
    [CustomWidgetName.chat]: BaseWidgetCallback;
};
export type ChatWidgetValue = string;
export interface ChipWidget extends Widget {
    options: ChipWidgetOptions;
    type: [CustomWidgetName.chip];
}
export interface ChipWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChipElement;
    getValue(): ChipWidgetValue;
    setValue(value: ChipWidgetValue): void;
}
export declare type ChipWidgetSetter = () => {
    [CustomWidgetName.chip]: BaseWidgetCallback;
};
export type ChipWidgetValue = string;
export interface CodeWidget extends Widget {
    options: CodeWidgetOptions;
    type: [CustomWidgetName.code];
}
export interface CodeWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulCodeElement;
    getValue(): string;
    setValue(value: Record<string, unknown> | string): void;
}
export type CodeWidgetSetter = () => {
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
export type ControlPanelWidgetSetter = () => {
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
    setValue(value: KulDataDataset | string): void;
}
export type HistogramWidgetSetter = () => {
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
    setValue(value: HistoryWidgetValue): void;
}
export declare type HistoryWidgetSetter = () => {
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
export declare type ImagePreviewWidgetSetter = () => {
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
export declare type JsonInputWidgetSetter = () => {
    [CustomWidgetName.jsonInput]: BaseWidgetCallback;
};
export type JsonInputWidgetValue = string | Record<string, unknown>;
export interface CountBarChartWidget extends Widget {
    options: CountBarChartWidgetOptions;
    type: [CustomWidgetName.countBarChart];
}
export interface CountBarChartWidgetOptions {
    hideOnZoom: boolean;
    getComp(): {
        chart: HTMLKulChartElement;
        chip: HTMLKulChipElement;
    };
    getValue(): CountBarChartWidgetValue;
    setValue(value: CountBarChartWidgetValue): void;
}
export type CountBarChartWidgetSetter = () => {
    [CustomWidgetName.countBarChart]: BaseWidgetCallback;
};
export type CountBarChartWidgetValue = string | {
    chartDataset: KulDataDataset;
    chipDataset: KulDataDataset;
};
export interface MessengerWidget extends Widget {
    options: MessengerWidgetOptions;
    type: [CustomWidgetName.messenger];
}
export interface MessengerWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulMessengerElement;
    getValue(): MessengerWidgetValue;
    setValue(value: MessengerWidgetValue): void;
}
export type MessengerWidgetSetter = () => {
    [CustomWidgetName.messenger]: BaseWidgetCallback;
};
export type MessengerWidgetValue = string | {
    dataset: KulMessengerDataset;
    config: KulMessengerConfig;
};
export interface RollViewerWidget extends Widget {
    options: RollViewerWidgetOptions;
    type: [CustomWidgetName.rollViewer];
}
export interface RollViewerWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulProgressbarElement;
    getValue(): RollViewerWidgetValue;
    setValue(value: RollViewerWidgetValue): void;
}
export declare type RollViewerWidgetSetter = () => {
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
    setValue(value: TreeWidgetValue): void;
}
export declare type TreeWidgetSetter = () => {
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
    setValue(value: UploadWidgetValue): void;
}
export declare type UploadWidgetSetter = () => {
    [CustomWidgetName.upload]: BaseWidgetCallback;
};
export type UploadWidgetValue = string;
