import { KulDataDataset } from './ketchup-lite/components';
export interface BaseEventPayload {
    id: string;
}
export type EventCallback<T extends EventPayload> = (e: CustomEvent<T>) => void;
export declare enum EventName {
    blurImages = "lf-blurimages",
    boolean = "lf-boolean",
    civitAIMetadataSetup = "lf-civitaimetadatasetup",
    controlPanel = "lf-controlpanel",
    displayBoolean = "lf-displayboolean",
    displayFloat = "lf-displayfloat",
    displayJson = "lf-displayjson",
    displayPrimitiveAsJson = "lf-displayprimitiveasjson",
    extractor = "lf-extractor",
    float = "lf-float",
    imageListFromJSON = "lf-imagelistfromjson",
    imageHistogram = "lf-imagehistogram",
    integer = "lf-integer",
    keywordCounter = "lf-keywordcounter",
    loadFileOnce = "lf-loadfileonce",
    loadImages = "lf-loadimages",
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
export type EventPayload = BlurImagesPayload | BooleanPayload | CivitAIMetadataSetupPayload | DisplayBooleanPayload | DisplayJSONPayload | ExtractorPayload | FloatPayload | ImageListFromJSONPayload | ImageHistogramPayload | IntegerPayload | KeywordCounterPayload | LoadImagesPayload | MultipleImageResizeForWebPayload | RandomBooleanPayload | ResizeImageByEdgePayload | ResizeImageToSquarePayload | ResolutionSwitcherPayload | SaveImageForCivitAIPayload | StringPayload | SwitchImagePayload | SwitchIntegerPayload | SwitchJSONPayload | SwitchStringPayload | UrandomSeedGeneratorPayload | WriteJSONPayload;
export interface BlurImagesPayload extends BaseEventPayload {
    fileNames: Array<string>;
    images: Array<string>;
}
export interface BooleanPayload extends BaseEventPayload {
    isHistoryEnabled: boolean;
    value: boolean;
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
export interface DisplayJSONPayload extends BaseEventPayload {
    json: Record<string, unknown>;
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
