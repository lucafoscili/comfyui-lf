import { Card, CardDeserializedValue } from './card';
import { CardsWithChip, CardsWithChipDeserializedValue } from './cardsWithChip';
import { Carousel, CarouselDeserializedValue } from './carousel';
import { Chat, ChatDeserializedValue } from './chat';
import { Chip, ChipDeserializedValue } from './chip';
import { Code, CodeDeserializedValue } from './code';
import { Compare, CompareDeserializedValue } from './compare';
import { ControlPanel, ControlPanelDeserializedValue } from './controlPanel';
import { CountBarChart, CountBarChartDeserializedValue } from './countBarChart';
import { History, HistoryDeserializedValue } from './history';
import { ImageEditor, ImageEditorDeserializedValue } from './imageEditor';
import { Masonry, MasonryDeserializedValue } from './masonry';
import { Messenger, MessengerDeserializedValue } from './messenger';
import { Progressbar, ProgressbarDeserializedValue } from './progressbar';
import { TabBarChart, TabBarChartDeserializedValue } from './tabBarChart';
import { Textarea, TextareaDeserializedValue } from './textarea';
import { Tree, TreeDeserializedValue } from './tree';
import { Upload, UploadDeserializedValue } from './upload';
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
export declare enum NodeName {
    blend = "LF_Blend",
    blurImages = "LF_BlurImages",
    boolean = "LF_Boolean",
    brightness = "LF_Brightness",
    brush = "LF_Brush",
    characterImpersonator = "LF_CharacterImpersonator",
    checkpointSelector = "LF_CheckpointSelector",
    civitaiMetadataSetup = "LF_CivitAIMetadataSetup",
    clarity = "LF_Clarity",
    colorAnalysis = "LF_ColorAnalysis",
    compareImages = "LF_CompareImages",
    contrast = "LF_Contrast",
    controlPanel = "LF_ControlPanel",
    desaturation = "LF_Desaturation",
    displayBoolean = "LF_DisplayBoolean",
    displayFloat = "LF_DisplayFloat",
    displayInteger = "LF_DisplayInteger",
    displayJson = "LF_DisplayJSON",
    displayPrimitiveAsJson = "LF_DisplayPrimitiveAsJSON",
    displayString = "LF_DisplayString",
    markdownDocGenerator = "LF_MarkdownDocGenerator",
    float = "LF_Float",
    embeddingSelector = "LF_EmbeddingSelector",
    extractString = "LF_ExtractString",
    extractPromptFromLoraTag = "LF_ExtractPromptFromLoraTag",
    gaussianBlur = "LF_GaussianBlur",
    getValueFromJson = "LF_GetValueFromJSON",
    getRandomKeyFromJson = "LF_GetRandomKeyFromJSON",
    imageClassifier = "LF_ImageClassifier",
    imageListFromJSON = "LF_ImageListFromJSON",
    imageHistogram = "LF_ImageHistogram",
    imagesEditingBreakpoint = "LF_ImagesEditingBreakpoint",
    integer = "LF_Integer",
    isLandscape = "LF_IsLandscape",
    keywordCounter = "LF_KeywordCounter",
    keywordToggleFromJson = "LF_KeywordToggleFromJSON",
    line = "LF_Line",
    llmChat = "LF_LLMChat",
    llmMessenger = "LF_LLMMessenger",
    loadAndEditImages = "LF_LoadAndEditImages",
    loadFileOnce = "LF_LoadFileOnce",
    loadImages = "LF_LoadImages",
    loadLoraTags = "LF_LoadLoraTags",
    loadMetadata = "LF_LoadMetadata",
    loraAndEmbeddingSelector = "LF_LoraAndEmbeddingSelector",
    loraSelector = "LF_LoraSelector",
    lutApplication = "LF_LUTApplication",
    lutGeneration = "LF_LUTGeneration",
    mathOperation = "LF_MathOperation",
    multipleImageResizeForWeb = "LF_MultipleImageResizeForWeb",
    notify = "LF_Notify",
    parsePromptWithLoraTags = "LF_ParsePromptWithLoraTags",
    randomBoolean = "LF_RandomBoolean",
    regionExtractor = "LF_RegionExtractor",
    resizeImageByEdge = "LF_ResizeImageByEdge",
    resizeImageToDimension = "LF_ResizeImageToDimension",
    resizeImageToSquare = "LF_ResizeImageToSquare",
    resolutionSwitcher = "LF_ResolutionSwitcher",
    samplerSelector = "LF_SamplerSelector",
    saveImageForCivitai = "LF_SaveImageForCivitAI",
    saveJson = "LF_SaveJSON",
    saveMarkdown = "LF_SaveMarkdown",
    schedulerSelector = "LF_SchedulerSelector",
    sequentialSeedsGenerator = "LF_SequentialSeedsGenerator",
    setValueInJson = "LF_SetValueInJSON",
    shuffleJsonKeys = "LF_ShuffleJSONKeys",
    imagesSlideshow = "LF_ImagesSlideshow",
    something2Number = "LF_Something2Number",
    something2String = "LF_Something2String",
    sortJsonKeys = "LF_SortJSONKeys",
    string = "LF_String",
    stringToJson = "LF_StringToJSON",
    switchFloat = "LF_SwitchFloat",
    switchImage = "LF_SwitchImage",
    switchInteger = "LF_SwitchInteger",
    switchJson = "LF_SwitchJSON",
    switchString = "LF_SwitchString",
    updateUsageStatistics = "LF_UpdateUsageStatistics",
    upscaleModelSelector = "LF_UpscaleModelSelector",
    urandomSeedGenerator = "LF_UrandomSeedGenerator",
    usageStatistics = "LF_UsageStatistics",
    vaeSelector = "LF_VAESelector",
    viewImages = "LF_ViewImages",
    vignette = "LF_Vignette",
    wallOfText = "LF_WallOfText",
    writeJson = "LF_WriteJSON"
}
export declare enum TagName {
    Div = "div",
    KulAccordion = "kul-accordion",
    KulArticle = "kul-article",
    KulButton = "kul-button",
    KulCard = "kul-card",
    KulCarousel = "kul-carousel",
    KulChat = "kul-chat",
    KulChart = "kul-chart",
    KulChip = "kul-chip",
    KulCode = "kul-code",
    KulCompare = "kul-compare",
    KulImageviewer = "kul-imageviewer",
    KulList = "kul-list",
    KulMasonry = "kul-masonry",
    KulMessenger = "kul-messenger",
    KulProgressbar = "kul-progressbar",
    KulSlider = "kul-slider",
    KulSpinner = "kul-spinner",
    KulTabbar = "kul-tabbar",
    KulTextfield = "kul-textfield",
    KulToggle = "kul-toggle",
    KulTree = "kul-tree",
    KulUpload = "kul-upload",
    Textarea = "textarea"
}
export type ComfyWidgetMap = {
    [ComfyWidgetName.boolean]: ComfyWidget;
    [ComfyWidgetName.combo]: ComfyWidget;
    [ComfyWidgetName.customtext]: ComfyWidget;
    [ComfyWidgetName.float]: ComfyWidget;
    [ComfyWidgetName.integer]: ComfyWidget;
    [ComfyWidgetName.json]: ComfyWidget;
    [ComfyWidgetName.number]: ComfyWidget;
    [ComfyWidgetName.seed]: ComfyWidget;
    [ComfyWidgetName.string]: ComfyWidget;
    [ComfyWidgetName.text]: ComfyWidget;
    [ComfyWidgetName.toggle]: ComfyWidget;
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
    [CustomWidgetName.chat]: ChatDeserializedValue;
    [CustomWidgetName.chip]: ChipDeserializedValue;
    [CustomWidgetName.code]: CodeDeserializedValue;
    [CustomWidgetName.compare]: CompareDeserializedValue;
    [CustomWidgetName.controlPanel]: ControlPanelDeserializedValue;
    [CustomWidgetName.countBarChart]: CountBarChartDeserializedValue;
    [CustomWidgetName.history]: HistoryDeserializedValue;
    [CustomWidgetName.imageEditor]: ImageEditorDeserializedValue;
    [CustomWidgetName.masonry]: MasonryDeserializedValue;
    [CustomWidgetName.messenger]: MessengerDeserializedValue;
    [CustomWidgetName.progressbar]: ProgressbarDeserializedValue;
    [CustomWidgetName.tabBarChart]: TabBarChartDeserializedValue;
    [CustomWidgetName.textarea]: TextareaDeserializedValue;
    [CustomWidgetName.tree]: TreeDeserializedValue;
    [CustomWidgetName.upload]: UploadDeserializedValue;
}[Name];
export type NodeWidgetMap = {
    [N in NodeName]: CustomWidgetName[];
};
export type ComfyWidget = Widget<ComfyWidgetName>;
export type CustomWidget = Card;
export type GenericWidget = ComfyWidget | CustomWidget;
export type UnescapeJSONPayload = {
    validJson: boolean;
    parsedJson?: {};
    unescapedStr: string;
};
export type NormalizeValueCallback<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName>, S extends BaseWidgetState = BaseWidgetState> = (origValue: V, unescaped: UnescapeJSONPayload, state?: S) => void;
export type GenericWidgetCallback = ComfyWidgetCallback | CustomWidgetCallback;
export type CustomWidgetCallback = <T extends CustomWidgetName>(node: NodeType, name: T) => {
    widget: CustomWidget;
};
export type ComfyWidgetCallback = <T extends ComfyWidgetName>(node: NodeType, name: T) => {
    widget: ComfyWidget;
};
export interface WidgetFactory<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName> = CustomWidgetDeserializedValuesMap<CustomWidgetName>, S extends BaseWidgetState = BaseWidgetState> {
    options: (wrapper: HTMLDivElement) => WidgetOptions<V, S>;
    render: (node: NodeType) => {
        widget: GenericWidget;
    };
    state: WeakMap<HTMLDivElement, S>;
}
export interface WidgetOptions<V extends CustomWidgetDeserializedValuesMap<CustomWidgetName> = CustomWidgetDeserializedValuesMap<CustomWidgetName>, S extends BaseWidgetState = BaseWidgetState> {
    hideOnZoom: boolean;
    getState: () => S;
    getValue: () => V;
    setValue(value: string | V): void;
}
export interface BaseWidgetState {
    node: NodeType;
    wrapper: HTMLDivElement;
}
export type WidgetSetter = {
    [W in CustomWidgetName]: CustomWidgetCallback;
};
