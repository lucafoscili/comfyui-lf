import { KulDataDataset, KulMessengerConfig, KulMessengerDataset } from './ketchup-lite/components';
import { KulMasonry } from './ketchup-lite/components/kul-masonry/kul-masonry';
import { AnalyticsType } from './manager';
import { NodeName } from './nodes';
export type UnescapeJSONPayload = {
    validJson: boolean;
    parsedJson?: {};
    unescapedStr: string;
};
export type NormalizeValueCallback<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName>> = (origValue: V, unescaped: UnescapeJSONPayload) => void;
export type BaseWidgetCallback<T extends CustomWidgetName> = (node: NodeType, name: T) => {
    widget: Widget;
};
export type ComfyWidgetCallback = <T extends ComfyWidgetName>(node: NodeType, name: T) => {
    widget: Widget;
};
export interface BaseWidgetFactory<T extends CustomWidgetOptions> {
    cssClasses: Record<string, string>;
    options: BaseWidgetOptionsCallback<T>;
    render: BaseWidgetCallback<CustomWidgetName>;
}
export interface BaseWidgetOptions<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName>> {
    hideOnZoom: boolean;
    getValue: () => V;
    setValue(value: string | V): void;
}
export type BaseWidgetOptionsCallback<T extends CustomWidgetOptions> = (...args: any[]) => T;
export type ComfyWidgetMap = {
    [ComfyWidgetName.boolean]: Widget;
    [ComfyWidgetName.combo]: Widget;
    [ComfyWidgetName.customtext]: Widget;
    [ComfyWidgetName.float]: Widget;
    [ComfyWidgetName.integer]: Widget;
    [ComfyWidgetName.json]: Widget;
    [ComfyWidgetName.number]: Widget;
    [ComfyWidgetName.seed]: Widget;
    [ComfyWidgetName.string]: Widget;
    [ComfyWidgetName.toggle]: Widget;
};
export declare enum ComfyWidgetName {
    boolean = "BOOLEAN",
    combo = "COMBO",
    customtext = "CUSTOMTEXT",
    float = "FLOAT",
    integer = "INTEGER",
    json = "JSON",
    number = "NUMBER",
    seed = "SEED",
    string = "STRING",
    toggle = "TOGGLE"
}
export type CustomWidgetMap = {
    [CustomWidgetName.card]: CardWidget;
    [CustomWidgetName.cardsWithChip]: CardsWithChipWidget;
    [CustomWidgetName.chat]: ChatWidget;
    [CustomWidgetName.chip]: ChipWidget;
    [CustomWidgetName.code]: CodeWidget;
    [CustomWidgetName.compare]: CompareWidget;
    [CustomWidgetName.controlPanel]: ControlPanelWidget;
    [CustomWidgetName.countBarChart]: CountBarChartWidget;
    [CustomWidgetName.history]: HistoryWidget;
    [CustomWidgetName.masonry]: MasonryWidget;
    [CustomWidgetName.messenger]: MessengerWidget;
    [CustomWidgetName.progressbar]: ProgressbarWidget;
    [CustomWidgetName.tabBarChart]: TabBarChartWidget;
    [CustomWidgetName.textarea]: TextareaWidget;
    [CustomWidgetName.tree]: TreeWidget;
    [CustomWidgetName.upload]: UploadWidget;
};
export declare enum CustomWidgetName {
    card = "KUL_CARD",
    cardsWithChip = "KUL_CARDS_WITH_CHIP",
    chat = "KUL_CHAT",
    chip = "KUL_CHIP",
    code = "KUL_CODE",
    compare = "KUL_COMPARE",
    controlPanel = "KUL_CONTROL_PANEL",
    countBarChart = "KUL_COUNT_BAR_CHART",
    history = "KUL_HISTORY",
    masonry = "KUL_MASONRY",
    messenger = "KUL_MESSENGER",
    progressbar = "KUL_PROGRESSBAR",
    tabBarChart = "KUL_TAB_BAR_CHART",
    textarea = "KUL_TEXTAREA",
    tree = "KUL_TREE",
    upload = "KUL_UPLOAD"
}
export type CustomWidgetDeserializedValues = CardWidgetDeserializedValue | CardsWithChipWidgetDeserializedValue | ChatWidgetValueDeserializedValue | ChipWidgetValueDeserializedValue | CodeWidgetValueDeserializedValue | CompareWidgetValueDeserializedValue | ControlPanelWidgetDeserializedValue | CountBarChartWidgetDeserializedValue | HistoryWidgetValuetDeserializedValue | MasonryWidgetDeserializedValue | MessengerWidgetDeserializedValue | ProgressbarWidgetDeserializedValue | TabBarChartWidgetDeserializedValue | TextareaWidgetDeserializedValue | TreeWidgetValueDeserializedValue | UploadWidgetDeserializedValue;
export type CustomWidgetDeserializedValuesMap<Name extends CustomWidgetName> = {
    [CustomWidgetName.card]: CardWidgetDeserializedValue;
    [CustomWidgetName.cardsWithChip]: CardsWithChipWidgetDeserializedValue;
    [CustomWidgetName.chat]: ChatWidgetValueDeserializedValue;
    [CustomWidgetName.chip]: ChipWidgetValueDeserializedValue;
    [CustomWidgetName.code]: CodeWidgetValueDeserializedValue;
    [CustomWidgetName.compare]: CompareWidgetValueDeserializedValue;
    [CustomWidgetName.controlPanel]: ControlPanelWidgetDeserializedValue;
    [CustomWidgetName.countBarChart]: CountBarChartWidgetDeserializedValue;
    [CustomWidgetName.history]: HistoryWidgetValuetDeserializedValue;
    [CustomWidgetName.masonry]: MasonryWidgetDeserializedValue;
    [CustomWidgetName.messenger]: MessengerWidgetDeserializedValue;
    [CustomWidgetName.progressbar]: ProgressbarWidgetDeserializedValue;
    [CustomWidgetName.tabBarChart]: TabBarChartWidgetDeserializedValue;
    [CustomWidgetName.textarea]: TextareaWidgetDeserializedValue;
    [CustomWidgetName.tree]: TreeWidgetValueDeserializedValue;
    [CustomWidgetName.upload]: UploadWidgetDeserializedValue;
}[Name];
export type CustomWidgetOptions = CardWidgetOptions | CardsWithChipWidgetOptions | ChatWidgetOptions | ChipWidgetOptions | CodeWidgetOptions | CompareWidgetOptions | ControlPanelWidgetOptions | CountBarChartWidgetOptions | HistoryWidgetOptions | MasonryWidgetOptions | MessengerWidgetOptions | ProgressbarWidgetOptions | TabBarChartWidgetOptions | TextareaWidgetOptions | TreeWidgetOptions | UploadWidgetOptions;
export type CustomWidgetOptionsCallbacks = CardWidgetOptionsCallback | ChatWidgetOptionsCallback | ChipWidgetOptionsCallback | CodeWidgetOptionsCallback | CompareWidgetOptionsCallback | ControlPanelWidgetOptionsCallback | HistoryWidgetOptionsCallback | MasonryWidgetOptionsCallback | MessengerWidgetOptionsCallback | ProgressbarWidgetOptionsCallback | TabBarChartWidgetOptionsCallback | TextareaWidgetOptionsCallback | TreeWidgetOptionsCallback | UploadWidgetOptionsCallback;
export type CustomWidgetOptionsCallbacksMap<Name extends CustomWidgetName> = {
    [CustomWidgetName.card]: CardWidgetOptionsCallback;
    [CustomWidgetName.cardsWithChip]: CardsWithChipWidgetOptionsCallback;
    [CustomWidgetName.chat]: ChatWidgetOptionsCallback;
    [CustomWidgetName.chip]: ChipWidgetOptionsCallback;
    [CustomWidgetName.code]: CodeWidgetOptionsCallback;
    [CustomWidgetName.compare]: CompareWidgetOptionsCallback;
    [CustomWidgetName.controlPanel]: ControlPanelWidgetOptionsCallback;
    [CustomWidgetName.countBarChart]: CountBarChartWidgetOptionsCallback;
    [CustomWidgetName.history]: HistoryWidgetOptionsCallback;
    [CustomWidgetName.masonry]: MasonryWidgetOptionsCallback;
    [CustomWidgetName.messenger]: MessengerWidgetOptionsCallback;
    [CustomWidgetName.progressbar]: ProgressbarWidgetOptionsCallback;
    [CustomWidgetName.tabBarChart]: TabBarChartWidgetOptionsCallback;
    [CustomWidgetName.textarea]: TextareaWidgetOptionsCallback;
    [CustomWidgetName.tree]: TreeWidgetOptionsCallback;
    [CustomWidgetName.upload]: UploadWidgetOptionsCallback;
}[Name];
export interface CardWidget extends Widget {
    options: CardWidgetOptions;
    type: [CustomWidgetName.card];
}
export interface CardWidgetFactory extends BaseWidgetFactory<CardWidgetOptions> {
    options: CardWidgetOptionsCallback;
}
export type CardWidgetOptionsCallback = (grid: HTMLDivElement) => CardWidgetOptions;
export interface CardWidgetOptions extends BaseWidgetOptions<CardWidgetDeserializedValue> {
    getComp(): HTMLKulCardElement[];
}
export type CardWidgetSetter = () => {
    [CustomWidgetName.card]: BaseWidgetCallback<CustomWidgetName.card>;
};
export interface CardWidgetDeserializedValue {
    props: Partial<HTMLKulCardElement>[];
}
export interface CardsWithChipWidget extends Widget {
    options: CardsWithChipWidgetOptions;
    type: [CustomWidgetName.cardsWithChip];
}
export interface CardsWithChipWidgetFactory extends BaseWidgetFactory<CardsWithChipWidgetOptions> {
    options: CardsWithChipWidgetOptionsCallback;
}
export type CardsWithChipWidgetOptionsCallback = (grid: HTMLDivElement) => CardsWithChipWidgetOptions;
export interface CardsWithChipWidgetOptions extends BaseWidgetOptions<CardsWithChipWidgetDeserializedValue> {
    getComp(): {
        cards: HTMLKulCardElement[];
        chip: HTMLKulChipElement;
    };
}
export type CardsWithChipWidgetSetter = () => {
    [CustomWidgetName.cardsWithChip]: BaseWidgetCallback<CustomWidgetName.cardsWithChip>;
};
export interface CardsWithChipWidgetDeserializedValue extends CardWidgetDeserializedValue {
    chip: KulDataDataset;
}
export interface ChatWidget extends Widget {
    options: ChatWidgetOptions;
    type: [CustomWidgetName.chat];
}
export interface ChatWidgetFactory extends BaseWidgetFactory<ChatWidgetOptions> {
    options: ChatWidgetOptionsCallback;
}
export type ChatWidgetOptionsCallback = (chat: HTMLKulChatElement) => ChatWidgetOptions;
export interface ChatWidgetOptions extends BaseWidgetOptions<ChatWidgetValueDeserializedValue> {
    getComp(): HTMLKulChatElement;
}
export type ChatWidgetSetter = () => {
    [CustomWidgetName.chat]: BaseWidgetCallback<CustomWidgetName.chat>;
};
export type ChatWidgetValueDeserializedValue = string;
export interface ChipWidget extends Widget {
    options: ChipWidgetOptions;
    type: [CustomWidgetName.chip];
}
export interface ChipWidgetFactory extends BaseWidgetFactory<ChipWidgetOptions> {
    options: ChipWidgetOptionsCallback;
}
export type ChipWidgetOptionsCallback = (chip: HTMLKulChipElement) => ChipWidgetOptions;
export interface ChipWidgetOptions extends BaseWidgetOptions<ChipWidgetValueDeserializedValue> {
    getComp(): HTMLKulChipElement;
}
export type ChipWidgetSetter = () => {
    [CustomWidgetName.chip]: BaseWidgetCallback<CustomWidgetName.chip>;
};
export type ChipWidgetValueDeserializedValue = string;
export interface CodeWidget extends Widget {
    options: CodeWidgetOptions;
    type: [CustomWidgetName.code];
}
export interface CodeWidgetFactory extends BaseWidgetFactory<CodeWidgetOptions> {
    options: CodeWidgetOptionsCallback;
}
export type CodeWidgetOptionsCallback = (code: HTMLKulCodeElement) => CodeWidgetOptions;
export interface CodeWidgetOptions extends BaseWidgetOptions<CodeWidgetValueDeserializedValue> {
    getComp(): HTMLKulCodeElement;
}
export type CodeWidgetSetter = () => {
    [CustomWidgetName.code]: BaseWidgetCallback<CustomWidgetName.code>;
};
export type CodeWidgetValueDeserializedValue = string;
export interface CompareWidget extends Widget {
    options: CompareWidgetOptions;
    type: [CustomWidgetName.compare];
}
export interface CompareWidgetFactory extends BaseWidgetFactory<CompareWidgetOptions> {
    options: CompareWidgetOptionsCallback;
}
export type CompareWidgetOptionsCallback = (compare: HTMLKulCompareElement) => CompareWidgetOptions;
export interface CompareWidgetOptions extends BaseWidgetOptions<CompareWidgetValueDeserializedValue> {
    getComp(): HTMLKulCompareElement;
}
export type CompareWidgetSetter = () => {
    [CustomWidgetName.compare]: BaseWidgetCallback<CustomWidgetName.compare>;
};
export type CompareWidgetValueDeserializedValue = KulDataDataset;
export interface ControlPanelWidget extends Widget {
    options: ControlPanelWidgetOptions;
    type: [CustomWidgetName.controlPanel];
}
export interface ControlPanelWidgetFactory extends BaseWidgetFactory<ControlPanelWidgetOptions> {
    options: ControlPanelWidgetOptionsCallback;
}
export type ControlPanelWidgetOptionsCallback = () => ControlPanelWidgetOptions;
export interface ControlPanelWidgetOptions extends BaseWidgetOptions<ControlPanelWidgetDeserializedValue> {
}
export type ControlPanelWidgetSetter = () => {
    [CustomWidgetName.controlPanel]: BaseWidgetCallback<CustomWidgetName.controlPanel>;
};
export type ControlPanelWidgetDeserializedValue = {
    backup: boolean;
    debug: boolean;
    themes: string;
};
export interface CountBarChartWidget extends Widget {
    options: CountBarChartWidgetOptions;
    type: [CustomWidgetName.countBarChart];
}
export interface CountBarChartWidgetFactory extends BaseWidgetFactory<CountBarChartWidgetOptions> {
    options: CountBarChartWidgetOptionsCallback;
}
export type CountBarChartWidgetOptionsCallback = (chart: HTMLKulChartElement, chip: HTMLKulChipElement, button: HTMLKulButtonElement) => CountBarChartWidgetOptions;
export interface CountBarChartWidgetOptions extends BaseWidgetOptions<CountBarChartWidgetDeserializedValue> {
    getComp(): {
        chart: HTMLKulChartElement;
        chip: HTMLKulChipElement;
    };
}
export type CountBarChartWidgetSetter = () => {
    [CustomWidgetName.countBarChart]: BaseWidgetCallback<CustomWidgetName.countBarChart>;
};
export type CountBarChartWidgetDeserializedValue = {
    datasets: {
        chart: KulDataDataset;
        chip: KulDataDataset;
    };
};
export interface HistoryWidget extends Widget {
    options: HistoryWidgetOptions;
    type: [CustomWidgetName.history];
}
export interface HistoryWidgetFactory extends BaseWidgetFactory<HistoryWidgetOptions> {
    options: HistoryWidgetOptionsCallback;
}
export type HistoryWidgetOptionsCallback = (list: HTMLKulListElement) => HistoryWidgetOptions;
export interface HistoryWidgetOptions extends BaseWidgetOptions<HistoryWidgetValuetDeserializedValue> {
    getComp(): HTMLKulListElement;
}
export type HistoryWidgetSetter = () => {
    [CustomWidgetName.history]: BaseWidgetCallback<CustomWidgetName.history>;
};
export type HistoryWidgetValuetDeserializedValue = KulDataDataset;
export interface MasonryWidget extends Widget {
    options: MasonryWidgetOptions;
    type: [CustomWidgetName.masonry];
}
export interface MasonryWidgetFactory extends BaseWidgetFactory<MasonryWidgetOptions> {
    options: MasonryWidgetOptionsCallback;
}
export type MasonryWidgetOptionsCallback = (masonry: HTMLKulMasonryElement) => MasonryWidgetOptions;
export interface MasonryWidgetOptions extends BaseWidgetOptions<MasonryWidgetDeserializedValue> {
    getComp(): HTMLKulMasonryElement;
}
export type MasonryWidgetSetter = () => {
    [CustomWidgetName.masonry]: BaseWidgetCallback<CustomWidgetName.masonry>;
};
export interface MasonryWidgetDeserializedValue {
    dataset: KulDataDataset;
    index?: number;
    name?: string;
    view?: KulMasonry['kulView'];
}
export interface MessengerWidget extends Widget {
    options: MessengerWidgetOptions;
    type: [CustomWidgetName.messenger];
}
export interface MessengerWidgetFactory extends BaseWidgetFactory<MessengerWidgetOptions> {
    options: MessengerWidgetOptionsCallback;
}
export type MessengerWidgetOptionsCallback = (messenger: HTMLKulMessengerElement, placeholder: HTMLDivElement) => MessengerWidgetOptions;
export interface MessengerWidgetOptions extends BaseWidgetOptions<MessengerWidgetDeserializedValue> {
    getComp(): HTMLKulMessengerElement;
}
export type MessengerWidgetSetter = () => {
    [CustomWidgetName.messenger]: BaseWidgetCallback<CustomWidgetName.messenger>;
};
export type MessengerWidgetDeserializedValue = {
    dataset: KulMessengerDataset;
    config: KulMessengerConfig;
};
export interface ProgressbarWidget extends Widget {
    options: ProgressbarWidgetOptions;
    type: [CustomWidgetName.progressbar];
}
export interface ProgressbarWidgetFactory extends BaseWidgetFactory<ProgressbarWidgetOptions> {
    options: ProgressbarWidgetOptionsCallback;
}
export type ProgressbarWidgetOptionsCallback = (progressbar: HTMLKulProgressbarElement, nodeType: NodeType) => ProgressbarWidgetOptions;
export interface ProgressbarWidgetOptions extends BaseWidgetOptions<ProgressbarWidgetDeserializedValue> {
    getComp(): HTMLKulProgressbarElement;
}
export type ProgressbarWidgetSetter = () => {
    [CustomWidgetName.progressbar]: BaseWidgetCallback<CustomWidgetName.progressbar>;
};
export type ProgressbarWidgetDeserializedValue = {
    bool: boolean;
    roll: number;
};
export interface TabBarChartWidget extends Widget {
    options: TabBarChartWidgetOptions;
    type: [CustomWidgetName.tabBarChart];
}
export interface TabBarChartWidgetFactory extends BaseWidgetFactory<TabBarChartWidgetOptions> {
    options: TabBarChartWidgetOptionsCallback;
}
export type TabBarChartWidgetOptionsCallback = (chart: HTMLKulChartElement, tabbar: HTMLKulTabbarElement, textfield: HTMLKulTextfieldElement, node: NodeName) => TabBarChartWidgetOptions;
export interface TabBarChartWidgetOptions extends BaseWidgetOptions<TabBarChartWidgetDeserializedValue> {
    getComp(): {
        chart: HTMLKulChartElement;
        tabbar: HTMLKulTabbarElement;
    };
    refresh(type: AnalyticsType): void;
}
export type TabBarChartWidgetSetter = () => {
    [CustomWidgetName.tabBarChart]: BaseWidgetCallback<CustomWidgetName.tabBarChart>;
};
export type TabBarChartWidgetDeserializedValue = {
    directory?: string;
} & {
    [index: string]: KulDataDataset;
};
export interface TreeWidget extends Widget {
    options: TreeWidgetOptions;
    type: [CustomWidgetName.tree];
}
export interface TreeWidgetFactory extends BaseWidgetFactory<TreeWidgetOptions> {
    options: TreeWidgetOptionsCallback;
}
export type TreeWidgetOptionsCallback = (tree: HTMLKulTreeElement) => TreeWidgetOptions;
export interface TreeWidgetOptions extends BaseWidgetOptions<TreeWidgetValueDeserializedValue> {
    getComp(): HTMLKulTreeElement;
}
export type TreeWidgetSetter = () => {
    [CustomWidgetName.tree]: BaseWidgetCallback<CustomWidgetName.tree>;
};
export type TreeWidgetValueDeserializedValue = KulDataDataset;
export interface UploadWidget extends Widget {
    options: UploadWidgetOptions;
    type: [CustomWidgetName.upload];
}
export interface UploadWidgetFactory extends BaseWidgetFactory<UploadWidgetOptions> {
    options: UploadWidgetOptionsCallback;
}
export type UploadWidgetOptionsCallback = (upload: HTMLKulUploadElement) => UploadWidgetOptions;
export interface UploadWidgetOptions extends BaseWidgetOptions<UploadWidgetDeserializedValue> {
    getComp(): HTMLKulUploadElement;
}
export type UploadWidgetSetter = () => {
    [CustomWidgetName.upload]: BaseWidgetCallback<CustomWidgetName.upload>;
};
export type UploadWidgetDeserializedValue = string;
export interface TextareaWidget extends Widget {
    options: TextareaWidgetOptions;
    type: [CustomWidgetName.textarea];
}
export interface TextareaWidgetFactory extends BaseWidgetFactory<TextareaWidgetOptions> {
    options: TextareaWidgetOptionsCallback;
}
export type TextareaWidgetOptionsCallback = (textarea: HTMLTextAreaElement) => TextareaWidgetOptions;
export interface TextareaWidgetOptions extends BaseWidgetOptions<TextareaWidgetDeserializedValue> {
}
export type TextareaWidgetSetter = () => {
    [CustomWidgetName.textarea]: BaseWidgetCallback<CustomWidgetName.textarea>;
};
export type TextareaWidgetDeserializedValue = Record<string, unknown>;
