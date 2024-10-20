import { KulDataDataset } from './ketchup-lite/components';
export interface BaseEventPayload {
    id: string;
}
export type EventCallback<T extends EventPayload> = (e: CustomEvent<T>) => void;
export declare enum EventName {
    blurImages = "lf-blurimages",
    boolean = "lf-boolean",
    checkpointSelector = "lf-checkpointselector",
    civitAIMetadataSetup = "lf-civitaimetadatasetup",
    clarityEffect = "lf-clarityeffect",
    controlPanel = "lf-controlpanel",
    displayBoolean = "lf-displayboolean",
    displayFloat = "lf-displayfloat",
    displayInteger = "lf-displayinteger",
    displayJson = "lf-displayjson",
    displayPrimitiveAsJson = "lf-displayprimitiveasjson",
    displayString = "lf-displaystring",
    embeddingSelector = "lf-embeddingselector",
    extractor = "lf-extractor",
    float = "lf-float",
    imageListFromJSON = "lf-imagelistfromjson",
    imageHistogram = "lf-imagehistogram",
    integer = "lf-integer",
    keywordCounter = "lf-keywordcounter",
    loadFileOnce = "lf-loadfileonce",
    loadImages = "lf-loadimages",
    loadLoraTags = "lf-loadloratags",
    loraAndEmbeddingSelector = "lf-loraandembeddingselector",
    loraSelector = "lf-loraselector",
    mathOperation = "lf-mathoperation",
    multipleImageResizeForWeb = "lf-multipleimageresizeforweb",
    notify = "lf-notify",
    randomBoolean = "lf-randomboolean",
    resizeimageByEdge = "lf-resizeimagebyedge",
    resizeimageToDimension = "lf-resizeimagetodimension",
    resizeimageToSquare = "lf-resizeimagetosquare",
    resolutionSwitcher = "lf-resolutionswitcher",
    samplerSelector = "lf-samplerselector",
    saveImageForCivitAI = "lf-saveimageforcivitai",
    schedulerSelector = "lf-schedulerselector",
    shuffleJsonKeys = "lf-shufflejsonkeys",
    sortJsonKeys = "lf-sortjsonkeys",
    string = "lf-string",
    switchFloat = "lf-switchfloat",
    switchImage = "lf-switchimage",
    switchInteger = "lf-switchinteger",
    switchJson = "lf-switchjson",
    switchString = "lf-switchstring",
    updateUsageStatistics = "lf-updateusagestatistics",
    upscaleModelSelector = "lf-upscalemodelselector",
    urandomSeedGenerator = "lf-urandomseedgenerator",
    vaeSelector = "lf-vaeselector",
    writeJson = "lf-writejson"
}
export type EventPayload = BlurImagesPayload | BooleanPayload | CheckpointSelectorPayload | CivitAIMetadataSetupPayload | ClarityEffectPayload | DisplayBooleanPayload | DisplayJSONPayload | EmbeddingSelectorPayload | ExtractorPayload | FloatPayload | ImageListFromJSONPayload | ImageHistogramPayload | IntegerPayload | KeywordCounterPayload | LoadImagesPayload | LoraAndEmbeddingSelectorPayload | LoraSelectorPayload | LoadLoraTagsPayload | MathOperationPayload | MultipleImageResizeForWebPayload | NotifyPayload | RandomBooleanPayload | ResizeImageByEdgePayload | ResizeImageToDimensionPayload | ResizeImageToSquarePayload | ResolutionSwitcherPayload | SamplerSelectorPayload | SaveImageForCivitAIPayload | SchedulerSelectorPayload | ShuffleJSONKeysPayload | SortJSONKeysPayload | StringPayload | SwitchImagePayload | SwitchIntegerPayload | SwitchJSONPayload | SwitchStringPayload | UpdateUsageStatisticsPayload | UpscaleModelSelectorPayload | UrandomSeedGeneratorPayload | VAESelectorPayload | WriteJSONPayload;
export interface BlurImagesPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
}
export interface BooleanPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: boolean;
}
export interface CheckpointSelectorPayload extends BaseEventPayload {
    dataset: KulDataDataset;
    apiFlag: boolean;
    hash: string;
    path: string;
}
export interface CivitAIMetadataSetupPayload extends BaseEventPayload {
    metadataString: string;
}
export interface ClarityEffectPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface DisplayPrimitiveAsJSONPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface DisplayBooleanPayload extends BaseEventPayload {
    value: string;
}
export interface DisplayFloatPayload extends BaseEventPayload {
    value: string;
}
export interface DisplayIntegerPayload extends BaseEventPayload {
    value: string;
}
export interface DisplayJSONPayload extends BaseEventPayload {
    json: Record<string, unknown>;
}
export interface DisplayStringPayload extends BaseEventPayload {
    value: string;
}
export interface EmbeddingSelectorPayload extends BaseEventPayload {
    dataset: KulDataDataset;
    apiFlag: boolean;
    hash: string;
    path: string;
}
export interface ExtractorPayload extends BaseEventPayload {
    result: string;
}
export interface FloatPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: number;
}
export interface ImageListFromJSONPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
}
export interface ImageHistogramPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface IntegerPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: number;
}
export interface KeywordCounterPayload extends BaseEventPayload {
    chartDataset: KulDataDataset;
    chipDataset: KulDataDataset;
}
export interface LoadFileOncePayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface LoadImagesPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
    selectedIndex: number;
    selectedName: string;
}
export interface LoadLoraTagsPayload extends BaseEventPayload {
    datasets: KulDataDataset[];
    apiFlags: boolean[];
    hashes: string[];
    paths: string[];
    chipDataset: KulDataDataset;
}
export interface LoraSelectorPayload extends BaseEventPayload {
    dataset: KulDataDataset;
    apiFlag: boolean;
    hash: string;
    path: string;
}
export interface LoraAndEmbeddingSelectorPayload extends BaseEventPayload {
    datasets: KulDataDataset[];
    apiFlags: boolean[];
    hashes: string[];
    paths: string[];
}
export interface MathOperationPayload extends BaseEventPayload {
    log: string;
}
export interface MultipleImageResizeForWebPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface NotifyPayload extends BaseEventPayload {
    action: 'none' | 'focus tab' | 'interrupt' | 'interrupt and queue' | 'queue prompt';
    image: string;
    message: string;
    silent: boolean;
    tag: string;
    title: string;
}
export interface RandomBooleanPayload extends BaseEventPayload {
    bool: boolean;
    roll: number;
}
export interface ResizeImageByEdgePayload extends BaseEventPayload {
    dataset: KulDataDataset;
    heights: number[];
    original_heights: number[];
    original_widths: number[];
    widths: number[];
}
export interface ResizeImageToDimensionPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface ResizeImageToSquarePayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface ResolutionSwitcherPayload extends BaseEventPayload {
    bool: boolean;
    roll: number;
}
export interface SamplerSelectorPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface SaveImageForCivitAIPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
}
export interface SchedulerSelectorPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface ShuffleJSONKeysPayload extends BaseEventPayload {
    json: Record<string, unknown>;
}
export interface SortJSONKeysPayload extends BaseEventPayload {
    json: Record<string, unknown>;
}
export interface StringPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface SwitchFloatPayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchImagePayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchIntegerPayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchJSONPayload extends BaseEventPayload {
    bool: boolean;
}
export interface SwitchStringPayload extends BaseEventPayload {
    bool: boolean;
}
export interface UpdateUsageStatisticsPayload extends BaseEventPayload {
    log: string;
}
export interface UpscaleModelSelectorPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface UrandomSeedGeneratorPayload extends BaseEventPayload {
    dataset: KulDataDataset;
    isHistoryEnabled: boolean;
}
export interface VAESelectorPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: string;
}
export interface WriteJSONPayload extends BaseEventPayload {
    error: string;
    json: Record<string, unknown>;
}
