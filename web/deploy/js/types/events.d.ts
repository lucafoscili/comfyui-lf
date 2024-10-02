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
    multipleImageResizeForWeb = "lf-multipleimageresizeforweb",
    randomBoolean = "lf-randomboolean",
    resizeimageByEdge = "lf-resizeimagebyedge",
    resizeimageToSquare = "lf-resizeimagetosquare",
    resolutionSwitcher = "lf-resolutionswitcher",
    saveImageForCivitAI = "lf-saveimageforcivitai",
    string = "lf-string",
    switchFloat = "lf-switchfloat",
    switchImage = "lf-switchimage",
    switchInteger = "lf-switchinteger",
    switchJson = "lf-switchjson",
    switchString = "lf-switchstring",
    urandomSeedGenerator = "lf-urandomseedgenerator",
    writeJson = "lf-writejson"
}
export type EventPayload = BlurImagesPayload | BooleanPayload | CheckpointSelectorPayload | CivitAIMetadataSetupPayload | DisplayBooleanPayload | DisplayJSONPayload | EmbeddingSelectorPayload | ExtractorPayload | FloatPayload | ImageListFromJSONPayload | ImageHistogramPayload | IntegerPayload | KeywordCounterPayload | LoadImagesPayload | LoraAndEmbeddingSelectorPayload | LoraSelectorPayload | LoadLoraTagsPayload | MultipleImageResizeForWebPayload | RandomBooleanPayload | ResizeImageByEdgePayload | ResizeImageToSquarePayload | ResolutionSwitcherPayload | SaveImageForCivitAIPayload | StringPayload | SwitchImagePayload | SwitchIntegerPayload | SwitchJSONPayload | SwitchStringPayload | UrandomSeedGeneratorPayload | WriteJSONPayload;
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
    hash: string;
    civitaiInfo: boolean;
    modelPath: string;
}
export interface CivitAIMetadataSetupPayload extends BaseEventPayload {
    metadataString: string;
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
    hash: string;
    civitaiInfo: boolean;
    modelPath: string;
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
    cardDatasets: KulDataDataset[];
    chipDataset: KulDataDataset;
    hashes: string[];
    loraPaths: string[];
    civitaiInfo: boolean;
}
export interface LoraSelectorPayload extends BaseEventPayload {
    dataset: KulDataDataset;
    hash: string;
    civitaiInfo: boolean;
    modelPath: string;
}
export interface LoraAndEmbeddingSelectorPayload extends BaseEventPayload {
    civitaiInfo: boolean;
    loraDataset: KulDataDataset;
    loraHash: string;
    loraModelPath: string;
    embeddingDataset: KulDataDataset;
    embeddingHash: string;
    embeddingModelPath: string;
}
export interface MultipleImageResizeForWebPayload extends BaseEventPayload {
    dataset: KulDataDataset;
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
export interface ResizeImageToSquarePayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface ResolutionSwitcherPayload extends BaseEventPayload {
    bool: boolean;
    roll: number;
}
export interface SaveImageForCivitAIPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
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
export interface UrandomSeedGeneratorPayload extends BaseEventPayload {
    dataset: KulDataDataset;
    isHistoryEnabled: boolean;
}
export interface WriteJSONPayload extends BaseEventPayload {
    error: string;
    json: Record<string, unknown>;
}
