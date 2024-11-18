import { Card, CardDeserializedValue, CardOptions, CardOptionsCallback } from './widgets/card';
import { CardsWithChip, CardsWithChipDeserializedValue, CardsWithChipOptions, CardsWithChipOptionsCallback } from './widgets/cardsWithChip';
import { Carousel, CarouselDeserializedValue, CarouselOptions, CarouselOptionsCallback } from './widgets/carousel';
import { Chat, ChatOptions, ChatOptionsCallback, ChatValueDeserializedValue } from './widgets/chat';
import { Chip, ChipOptions, ChipOptionsCallback, ChipValueDeserializedValue } from './widgets/chip';
import { Code, CodeOptions, CodeOptionsCallback, CodeValueDeserializedValue } from './widgets/code';
import { Compare, CompareOptions, CompareOptionsCallback, CompareValueDeserializedValue } from './widgets/compare';
import { ControlPanel, ControlPanelDeserializedValue, ControlPanelOptions, ControlPanelOptionsCallback } from './widgets/controlPanel';
import { CountBarChart, CountBarChartDeserializedValue, CountBarChartOptions, CountBarChartOptionsCallback } from './widgets/countBarChart';
import { History, HistoryOptions, HistoryOptionsCallback, HistoryDeserializedValue } from './widgets/history';
import { ImageEditor, ImageEditorDeserializedValue, ImageEditorOptions, ImageEditorOptionsCallback } from './widgets/imageEditor';
import { Masonry, MasonryDeserializedValue, MasonryOptions, MasonryOptionsCallback } from './widgets/masonry';
import { Messenger, MessengerDeserializedValue, MessengerOptions, MessengerOptionsCallback } from './widgets/messenger';
import { Progressbar, ProgressbarDeserializedValue, ProgressbarOptions, ProgressbarOptionsCallback } from './widgets/progressBar';
import { TabBarChart, TabBarChartDeserializedValue, TabBarChartOptions, TabBarChartOptionsCallback } from './widgets/tabBarChart';
import { Textarea, TextareaDeserializedValue, TextareaOptions, TextareaOptionsCallback } from './widgets/textarea';
import { Tree, TreeOptions, TreeOptionsCallback, TreeValueDeserializedValue } from './widgets/tree';
import { Upload, UploadDeserializedValue, UploadOptions, UploadOptionsCallback } from './widgets/upload';
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
    text = "TEXT",
    toggle = "TOGGLE"
}
export declare enum CustomWidgetName {
    card = "KUL_CARD",
    cardsWithChip = "KUL_CARDS_WITH_CHIP",
    carousel = "KUL_CAROUSEL",
    chat = "KUL_CHAT",
    chip = "KUL_CHIP",
    code = "KUL_CODE",
    compare = "KUL_COMPARE",
    controlPanel = "KUL_CONTROL_PANEL",
    countBarChart = "KUL_COUNT_BAR_CHART",
    history = "KUL_HISTORY",
    imageEditor = "KUL_IMAGE_EDITOR",
    masonry = "KUL_MASONRY",
    messenger = "KUL_MESSENGER",
    progressbar = "KUL_PROGRESSBAR",
    tabBarChart = "KUL_TAB_BAR_CHART",
    textarea = "KUL_TEXTAREA",
    tree = "KUL_TREE",
    upload = "KUL_UPLOAD"
}
export type CustomWidgetDeserializedValues = CardDeserializedValue | CardsWithChipDeserializedValue | CarouselDeserializedValue | ChatValueDeserializedValue | ChipValueDeserializedValue | CodeValueDeserializedValue | CompareValueDeserializedValue | ControlPanelDeserializedValue | CountBarChartDeserializedValue | HistoryDeserializedValue | ImageEditorDeserializedValue | MasonryDeserializedValue | MessengerDeserializedValue | ProgressbarDeserializedValue | TabBarChartDeserializedValue | TextareaDeserializedValue | TreeValueDeserializedValue | UploadDeserializedValue;
export type CustomWidgetOptions = CardOptions | CardsWithChipOptions | CarouselOptions | ChatOptions | ChipOptions | CodeOptions | CompareOptions | ControlPanelOptions | CountBarChartOptions | HistoryOptions | ImageEditorOptions | MasonryOptions | MessengerOptions | ProgressbarOptions | TabBarChartOptions | TextareaOptions | TreeOptions | UploadOptions;
export type CustomWidgetOptionsCallbacks = CardOptionsCallback | CarouselOptionsCallback | ChatOptionsCallback | ChipOptionsCallback | CodeOptionsCallback | CompareOptionsCallback | ControlPanelOptionsCallback | HistoryOptionsCallback | ImageEditorOptionsCallback | MasonryOptionsCallback | MessengerOptionsCallback | ProgressbarOptionsCallback | TabBarChartOptionsCallback | TextareaOptionsCallback | TreeOptionsCallback | UploadOptionsCallback;
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
    [ComfyWidgetName.text]: Widget;
    [ComfyWidgetName.toggle]: Widget;
};
export type CustomWidgetMap = {
    [CustomWidgetName.card]: Card;
    [CustomWidgetName.carousel]: Carousel;
    [CustomWidgetName.cardsWithChip]: CardsWithChip;
    [CustomWidgetName.chat]: Chat;
    [CustomWidgetName.chip]: Chip;
    [CustomWidgetName.code]: Code;
    [CustomWidgetName.compare]: Compare;
    [CustomWidgetName.controlPanel]: ControlPanel;
    [CustomWidgetName.countBarChart]: CountBarChart;
    [CustomWidgetName.history]: History;
    [CustomWidgetName.imageEditor]: ImageEditor;
    [CustomWidgetName.masonry]: Masonry;
    [CustomWidgetName.messenger]: Messenger;
    [CustomWidgetName.progressbar]: Progressbar;
    [CustomWidgetName.tabBarChart]: TabBarChart;
    [CustomWidgetName.textarea]: Textarea;
    [CustomWidgetName.tree]: Tree;
    [CustomWidgetName.upload]: Upload;
};
export type CustomWidgetDeserializedValuesMap<Name extends CustomWidgetName> = {
    [CustomWidgetName.card]: CardDeserializedValue;
    [CustomWidgetName.cardsWithChip]: CardsWithChipDeserializedValue;
    [CustomWidgetName.carousel]: CarouselDeserializedValue;
    [CustomWidgetName.chat]: ChatValueDeserializedValue;
    [CustomWidgetName.chip]: ChipValueDeserializedValue;
    [CustomWidgetName.code]: CodeValueDeserializedValue;
    [CustomWidgetName.compare]: CompareValueDeserializedValue;
    [CustomWidgetName.controlPanel]: ControlPanelDeserializedValue;
    [CustomWidgetName.countBarChart]: CountBarChartDeserializedValue;
    [CustomWidgetName.history]: HistoryDeserializedValue;
    [CustomWidgetName.imageEditor]: ImageEditorDeserializedValue;
    [CustomWidgetName.masonry]: MasonryDeserializedValue;
    [CustomWidgetName.messenger]: MessengerDeserializedValue;
    [CustomWidgetName.progressbar]: ProgressbarDeserializedValue;
    [CustomWidgetName.tabBarChart]: TabBarChartDeserializedValue;
    [CustomWidgetName.textarea]: TextareaDeserializedValue;
    [CustomWidgetName.tree]: TreeValueDeserializedValue;
    [CustomWidgetName.upload]: UploadDeserializedValue;
}[Name];
export type CustomWidgetOptionsCallbacksMap<Name extends CustomWidgetName> = {
    [CustomWidgetName.card]: CardOptionsCallback;
    [CustomWidgetName.cardsWithChip]: CardsWithChipOptionsCallback;
    [CustomWidgetName.carousel]: CarouselOptionsCallback;
    [CustomWidgetName.chat]: ChatOptionsCallback;
    [CustomWidgetName.chip]: ChipOptionsCallback;
    [CustomWidgetName.code]: CodeOptionsCallback;
    [CustomWidgetName.compare]: CompareOptionsCallback;
    [CustomWidgetName.controlPanel]: ControlPanelOptionsCallback;
    [CustomWidgetName.countBarChart]: CountBarChartOptionsCallback;
    [CustomWidgetName.history]: HistoryOptionsCallback;
    [CustomWidgetName.imageEditor]: ImageEditorOptionsCallback;
    [CustomWidgetName.masonry]: MasonryOptionsCallback;
    [CustomWidgetName.messenger]: MessengerOptionsCallback;
    [CustomWidgetName.progressbar]: ProgressbarOptionsCallback;
    [CustomWidgetName.tabBarChart]: TabBarChartOptionsCallback;
    [CustomWidgetName.textarea]: TextareaOptionsCallback;
    [CustomWidgetName.tree]: TreeOptionsCallback;
    [CustomWidgetName.upload]: UploadOptionsCallback;
}[Name];
