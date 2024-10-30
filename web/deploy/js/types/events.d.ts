import { KulDataDataset } from './ketchup-lite/components';
import { TabBarChartWidgetDeserializedValue } from './widgets';
export interface BaseEventPayload {
    id: string;
}
export type EventCallback<T extends EventPayload> = (e: CustomEvent<T>) => void;
export declare enum EventName {
    blurImages = "lf-blurimages",
    boolean = "lf-boolean",
    characterImpersonator = "lf-characterimpersonator",
    checkpointSelector = "lf-checkpointselector",
    civitAIMetadataSetup = "lf-civitaimetadatasetup",
    clarityEffect = "lf-clarityeffect",
    compareImages = "lf-compareimages",
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
    imageClassifier = "lf-imageclassifier",
    imageListFromJSON = "lf-imagelistfromjson",
    imageHistogram = "lf-imagehistogram",
    isLandscape = "lf-islandscape",
    integer = "lf-integer",
    keywordCounter = "lf-keywordcounter",
    loadFileOnce = "lf-loadfileonce",
    loadImages = "lf-loadimages",
    loadLoraTags = "lf-loadloratags",
    loraAndEmbeddingSelector = "lf-loraandembeddingselector",
    loraSelector = "lf-loraselector",
    lora2Prompt = "lf-lora2prompt",
    loraTag2Prompt = "lf-loratag2prompt",
    mathOperation = "lf-mathoperation",
    multipleImageResizeForWeb = "lf-multipleimageresizeforweb",
    notify = "lf-notify",
    randomBoolean = "lf-randomboolean",
    regionExtractor = "lf-regionextractor",
    resizeimageByEdge = "lf-resizeimagebyedge",
    resizeimageToDimension = "lf-resizeimagetodimension",
    resizeimageToSquare = "lf-resizeimagetosquare",
    resolutionSwitcher = "lf-resolutionswitcher",
    samplerSelector = "lf-samplerselector",
    saveImageForCivitAI = "lf-saveimageforcivitai",
    saveJson = "lf-savejson",
    schedulerSelector = "lf-schedulerselector",
    sequentialSeedsGenerator = "lf-sequentialseedsgenerator",
    shuffleJsonKeys = "lf-shufflejsonkeys",
    something2Number = "lf-something2number",
    something2String = "lf-something2string",
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
export type EventPayload = BaseDatasetPayload | CheckpointSelectorPayload | CivitAIMetadataSetupPayload | DisplayJSONPayload | EmbeddingSelectorPayload | ImageHistogramPayload | KeywordCounterPayload | LoadImagesPayload | LoraAndEmbeddingSelectorPayload | LoraSelectorPayload | LoadLoraTagsPayload | NotifyPayload | RandomBooleanPayload | ResolutionSwitcherPayload | ShuffleJSONKeysPayload | SortJSONKeysPayload | SwitchImagePayload | SwitchIntegerPayload | SwitchJSONPayload | SwitchStringPayload | WriteJSONPayload;
export interface CodePayload extends BaseEventPayload {
    value: string;
}
export interface BaseDatasetPayload extends BaseEventPayload {
    dataset: KulDataDataset;
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
export interface DisplayJSONPayload extends BaseEventPayload {
    json: Record<string, unknown>;
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
export interface ImageHistogramPayload extends BaseEventPayload {
    datasets: TabBarChartWidgetDeserializedValue;
}
export interface KeywordCounterPayload extends BaseEventPayload {
    chartDataset: KulDataDataset;
    chipDataset: KulDataDataset;
}
export interface LoadImagesPayload extends BaseDatasetPayload {
    index: number;
    name: string;
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
export interface ResolutionSwitcherPayload extends BaseEventPayload {
    bool: boolean;
    roll: number;
}
export interface ShuffleJSONKeysPayload extends BaseEventPayload {
    json: Record<string, unknown>;
}
export interface SortJSONKeysPayload extends BaseEventPayload {
    json: Record<string, unknown>;
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
export interface WriteJSONPayload extends BaseEventPayload {
    error: string;
    json: Record<string, unknown>;
}
