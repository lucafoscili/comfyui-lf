import { BaseWidgetCallback } from '../types/widgets';
export declare class LFNodes {
    eventHandler: {
        LF_BlurImages: (event: CustomEvent<import("../types/events").BlurImagesPayload>, addW: BaseWidgetCallback) => void;
        LF_Boolean: (event: CustomEvent<import("../types/events").BooleanPayload>, addW: BaseWidgetCallback) => void;
        LF_CheckpointSelector: (event: CustomEvent<import("../types/events").CheckpointSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_CivitAIMetadataSetup: (event: CustomEvent<import("../types/events").CivitAIMetadataSetupPayload>, addW: BaseWidgetCallback) => void;
        LF_ClarityEffect: (event: CustomEvent<import("../types/events").ClarityEffectPayload>, addW: BaseWidgetCallback) => void;
        LF_DisplayBoolean: (event: CustomEvent<import("../types/events").DisplayBooleanPayload>, addW: BaseWidgetCallback) => void;
        LF_DisplayFloat: (event: CustomEvent<import("../types/events").DisplayFloatPayload>, addW: BaseWidgetCallback) => void;
        LF_DisplayInteger: (event: CustomEvent<import("../types/events").DisplayIntegerPayload>, addW: BaseWidgetCallback) => void;
        LF_DisplayJSON: (event: CustomEvent<import("../types/events").DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
        LF_DisplayPrimitiveAsJSON: (event: CustomEvent<import("../types/events").DisplayPrimitiveAsJSONPayload>, addW: BaseWidgetCallback) => void;
        LF_DisplayString: (event: CustomEvent<import("../types/events").DisplayStringPayload>, addW: BaseWidgetCallback) => void;
        LF_EmbeddingSelector: (event: CustomEvent<import("../types/events").EmbeddingSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_Extractor: (event: CustomEvent<import("../types/events").ExtractorPayload>, addW: BaseWidgetCallback) => void;
        LF_Float: (event: CustomEvent<import("../types/events").FloatPayload>, addW: BaseWidgetCallback) => void;
        LF_ImageHistogram: (event: CustomEvent<import("../types/events").ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
        LF_ImageListFromJSON: (event: CustomEvent<import("../types/events").ImageListFromJSONPayload>, addW: BaseWidgetCallback) => void;
        LF_Integer: (event: CustomEvent<import("../types/events").IntegerPayload>, addW: BaseWidgetCallback) => void;
        LF_KeywordCounter: (event: CustomEvent<import("../types/events").KeywordCounterPayload>, addW: BaseWidgetCallback) => void;
        LF_LoadFileOnce: (event: CustomEvent<import("../types/events").LoadFileOncePayload>, addW: BaseWidgetCallback) => void;
        LF_LoadImages: (event: CustomEvent<import("../types/events").LoadImagesPayload>, addW: BaseWidgetCallback) => void;
        LF_LoadLoraTags: (event: CustomEvent<import("../types/events").LoadLoraTagsPayload>, addW: BaseWidgetCallback) => void;
        LF_LoraAndEmbeddingSelector: (event: CustomEvent<import("../types/events").LoraAndEmbeddingSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_LoraSelector: (event: CustomEvent<import("../types/events").LoraSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_MathOperation: (event: CustomEvent<import("../types/events").MathOperationPayload>, addW: BaseWidgetCallback) => void;
        LF_MultipleImageResizeForWeb: (event: CustomEvent<import("../types/events").MultipleImageResizeForWebPayload>, addW: BaseWidgetCallback) => void;
        LF_Notify: (event: CustomEvent<import("../types/events").NotifyPayload>) => void;
        LF_RandomBoolean: (event: CustomEvent<import("../types/events").RandomBooleanPayload>, addW: BaseWidgetCallback) => void;
        LF_ResizeImageByEdge: (event: CustomEvent<import("../types/events").ResizeImageByEdgePayload>, addW: BaseWidgetCallback) => void;
        LF_ResizeImageToDimension: (event: CustomEvent<import("../types/events").ResizeImageToDimensionPayload>, addW: BaseWidgetCallback) => void;
        LF_ResizeImageToSquare: (event: CustomEvent<import("../types/events").ResizeImageToSquarePayload>, addW: BaseWidgetCallback) => void;
        LF_ResolutionSwitcher: (event: CustomEvent<import("../types/events").ResolutionSwitcherPayload>, addW: BaseWidgetCallback) => void;
        LF_SamplerSelector: (event: CustomEvent<import("../types/events").SamplerSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_SaveImageForCivitAI: (event: CustomEvent<import("../types/events").SaveImageForCivitAIPayload>, addW: BaseWidgetCallback) => void;
        LF_SchedulerSelector: (event: CustomEvent<import("../types/events").SchedulerSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_ShuffleJSONKeys: (event: CustomEvent<import("../types/events").ShuffleJSONKeysPayload>, addW: BaseWidgetCallback) => void;
        LF_SortJSONKeys: (event: CustomEvent<import("../types/events").SortJSONKeysPayload>, addW: BaseWidgetCallback) => void;
        LF_String: (event: CustomEvent<import("../types/events").StringPayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchFloat: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchImage: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchInteger: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchJSON: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_SwitchString: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
        LF_UpdateUsageStatistics: (event: CustomEvent<import("../types/events").UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => void;
        LF_UpscaleModelSelector: (event: CustomEvent<import("../types/events").UpscaleModelSelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_UrandomSeedGenerator: (event: CustomEvent<import("../types/events").UrandomSeedGeneratorPayload>, addW: BaseWidgetCallback) => void;
        LF_UsageStatistics: (event: CustomEvent<import("../types/events").UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => void;
        LF_VAESelector: (event: CustomEvent<import("../types/events").VAESelectorPayload>, addW: BaseWidgetCallback) => void;
        LF_WriteJSON: (event: CustomEvent<import("../types/events").WriteJSONPayload>, addW: BaseWidgetCallback) => void;
    };
    register: {
        LF_BlurImages: (setW: import("../types/widgets").ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_Boolean: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_CheckpointSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_CivitAIMetadataSetup: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ClarityEffect: (setW: import("../types/widgets").CompareWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayBoolean: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayFloat: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayInteger: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_DisplayPrimitiveAsJSON: (setW: import("../types/widgets").CodeWidgetSetter) => void;
        LF_DisplayString: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_EmbeddingSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_Extractor: (setW: import("../types/widgets").CodeWidgetSetter) => void;
        LF_Float: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ImageHistogram: (setW: import("../types/widgets").HistogramWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ImageListFromJSON: (setW: import("../types/widgets").ImagePreviewWidgetSetter) => void;
        LF_Integer: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_KeywordCounter: (setW: import("../types/widgets").CountBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_KeywordToggleFromJSON: (setW: import("../types/widgets").ChipWidgetSetter) => void;
        LF_LLMChat: (setW: import("../types/widgets").ChatWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_LLMMessenger: (setW: import("../types/widgets").MessengerWidgetSetter) => void;
        LF_LoadFileOnce: (setW: import("../types/widgets").HistoryWidgetSetter) => void;
        LF_LoadImages: (setW: import("../types/widgets").ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_LoadLoraTags: (setW: import("../types/widgets").CardsWithChipWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_LoraAndEmbeddingSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_LoadMetadata: (setW: import("../types/widgets").UploadWidgetSetter) => void;
        LF_LoraSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_MathOperation: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_MultipleImageResizeForWeb: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_Notify: () => void;
        LF_RandomBoolean: (setW: import("../types/widgets").RollViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ResizeImageByEdge: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ResizeImageToDimension: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ResizeImageToSquare: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ResolutionSwitcher: (setW: import("../types/widgets").RollViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SamplerSelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SaveImageForCivitAI: (setW: import("../types/widgets").ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SchedulerSelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_ShuffleJSONKeys: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SortJSONKeys: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_String: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchFloat: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchImage: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchInteger: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchJSON: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_SwitchString: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_UpdateUsageStatistics: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_UpscaleModelSelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_UrandomSeedGenerator: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_UsageStatistics: (setW: import("../types/widgets").TabBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_VAESelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
        LF_WriteJSON: (setW: import("../types/widgets").JsonInputWidgetSetter) => void;
    };
    get: {
        eventHandlers: {
            LF_BlurImages: (event: CustomEvent<import("../types/events").BlurImagesPayload>, addW: BaseWidgetCallback) => void;
            LF_Boolean: (event: CustomEvent<import("../types/events").BooleanPayload>, addW: BaseWidgetCallback) => void;
            LF_CheckpointSelector: (event: CustomEvent<import("../types/events").CheckpointSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_CivitAIMetadataSetup: (event: CustomEvent<import("../types/events").CivitAIMetadataSetupPayload>, addW: BaseWidgetCallback) => void;
            LF_ClarityEffect: (event: CustomEvent<import("../types/events").ClarityEffectPayload>, addW: BaseWidgetCallback) => void;
            LF_DisplayBoolean: (event: CustomEvent<import("../types/events").DisplayBooleanPayload>, addW: BaseWidgetCallback) => void;
            LF_DisplayFloat: (event: CustomEvent<import("../types/events").DisplayFloatPayload>, addW: BaseWidgetCallback) => void;
            LF_DisplayInteger: (event: CustomEvent<import("../types/events").DisplayIntegerPayload>, addW: BaseWidgetCallback) => void;
            LF_DisplayJSON: (event: CustomEvent<import("../types/events").DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
            LF_DisplayPrimitiveAsJSON: (event: CustomEvent<import("../types/events").DisplayPrimitiveAsJSONPayload>, addW: BaseWidgetCallback) => void;
            LF_DisplayString: (event: CustomEvent<import("../types/events").DisplayStringPayload>, addW: BaseWidgetCallback) => void;
            LF_EmbeddingSelector: (event: CustomEvent<import("../types/events").EmbeddingSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_Extractor: (event: CustomEvent<import("../types/events").ExtractorPayload>, addW: BaseWidgetCallback) => void;
            LF_Float: (event: CustomEvent<import("../types/events").FloatPayload>, addW: BaseWidgetCallback) => void;
            LF_ImageHistogram: (event: CustomEvent<import("../types/events").ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
            LF_ImageListFromJSON: (event: CustomEvent<import("../types/events").ImageListFromJSONPayload>, addW: BaseWidgetCallback) => void;
            LF_Integer: (event: CustomEvent<import("../types/events").IntegerPayload>, addW: BaseWidgetCallback) => void;
            LF_KeywordCounter: (event: CustomEvent<import("../types/events").KeywordCounterPayload>, addW: BaseWidgetCallback) => void;
            LF_LoadFileOnce: (event: CustomEvent<import("../types/events").LoadFileOncePayload>, addW: BaseWidgetCallback) => void;
            LF_LoadImages: (event: CustomEvent<import("../types/events").LoadImagesPayload>, addW: BaseWidgetCallback) => void;
            LF_LoadLoraTags: (event: CustomEvent<import("../types/events").LoadLoraTagsPayload>, addW: BaseWidgetCallback) => void;
            LF_LoraAndEmbeddingSelector: (event: CustomEvent<import("../types/events").LoraAndEmbeddingSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_LoraSelector: (event: CustomEvent<import("../types/events").LoraSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_MathOperation: (event: CustomEvent<import("../types/events").MathOperationPayload>, addW: BaseWidgetCallback) => void;
            LF_MultipleImageResizeForWeb: (event: CustomEvent<import("../types/events").MultipleImageResizeForWebPayload>, addW: BaseWidgetCallback) => void;
            LF_Notify: (event: CustomEvent<import("../types/events").NotifyPayload>) => void;
            LF_RandomBoolean: (event: CustomEvent<import("../types/events").RandomBooleanPayload>, addW: BaseWidgetCallback) => void;
            LF_ResizeImageByEdge: (event: CustomEvent<import("../types/events").ResizeImageByEdgePayload>, addW: BaseWidgetCallback) => void;
            LF_ResizeImageToDimension: (event: CustomEvent<import("../types/events").ResizeImageToDimensionPayload>, addW: BaseWidgetCallback) => void;
            LF_ResizeImageToSquare: (event: CustomEvent<import("../types/events").ResizeImageToSquarePayload>, addW: BaseWidgetCallback) => void;
            LF_ResolutionSwitcher: (event: CustomEvent<import("../types/events").ResolutionSwitcherPayload>, addW: BaseWidgetCallback) => void;
            LF_SamplerSelector: (event: CustomEvent<import("../types/events").SamplerSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_SaveImageForCivitAI: (event: CustomEvent<import("../types/events").SaveImageForCivitAIPayload>, addW: BaseWidgetCallback) => void;
            LF_SchedulerSelector: (event: CustomEvent<import("../types/events").SchedulerSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_ShuffleJSONKeys: (event: CustomEvent<import("../types/events").ShuffleJSONKeysPayload>, addW: BaseWidgetCallback) => void;
            LF_SortJSONKeys: (event: CustomEvent<import("../types/events").SortJSONKeysPayload>, addW: BaseWidgetCallback) => void;
            LF_String: (event: CustomEvent<import("../types/events").StringPayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchFloat: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchImage: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchInteger: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchJSON: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_SwitchString: (event: CustomEvent<import("../types/events").SwitchImagePayload>, addW: BaseWidgetCallback) => void;
            LF_UpdateUsageStatistics: (event: CustomEvent<import("../types/events").UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => void;
            LF_UpscaleModelSelector: (event: CustomEvent<import("../types/events").UpscaleModelSelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_UrandomSeedGenerator: (event: CustomEvent<import("../types/events").UrandomSeedGeneratorPayload>, addW: BaseWidgetCallback) => void;
            LF_UsageStatistics: (event: CustomEvent<import("../types/events").UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => void;
            LF_VAESelector: (event: CustomEvent<import("../types/events").VAESelectorPayload>, addW: BaseWidgetCallback) => void;
            LF_WriteJSON: (event: CustomEvent<import("../types/events").WriteJSONPayload>, addW: BaseWidgetCallback) => void;
        };
        registrations: {
            LF_BlurImages: (setW: import("../types/widgets").ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_Boolean: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_CheckpointSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_CivitAIMetadataSetup: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ClarityEffect: (setW: import("../types/widgets").CompareWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ControlPanel: (setW: import("../types/widgets").ControlPanelWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayBoolean: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayFloat: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayInteger: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayJSON: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_DisplayPrimitiveAsJSON: (setW: import("../types/widgets").CodeWidgetSetter) => void;
            LF_DisplayString: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_EmbeddingSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_Extractor: (setW: import("../types/widgets").CodeWidgetSetter) => void;
            LF_Float: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ImageHistogram: (setW: import("../types/widgets").HistogramWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ImageListFromJSON: (setW: import("../types/widgets").ImagePreviewWidgetSetter) => void;
            LF_Integer: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_KeywordCounter: (setW: import("../types/widgets").CountBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_KeywordToggleFromJSON: (setW: import("../types/widgets").ChipWidgetSetter) => void;
            LF_LLMChat: (setW: import("../types/widgets").ChatWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_LLMMessenger: (setW: import("../types/widgets").MessengerWidgetSetter) => void;
            LF_LoadFileOnce: (setW: import("../types/widgets").HistoryWidgetSetter) => void;
            LF_LoadImages: (setW: import("../types/widgets").ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_LoadLoraTags: (setW: import("../types/widgets").CardsWithChipWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_LoraAndEmbeddingSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_LoadMetadata: (setW: import("../types/widgets").UploadWidgetSetter) => void;
            LF_LoraSelector: (setW: import("../types/widgets").CardWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_MathOperation: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_MultipleImageResizeForWeb: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_Notify: () => void;
            LF_RandomBoolean: (setW: import("../types/widgets").RollViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ResizeImageByEdge: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ResizeImageToDimension: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ResizeImageToSquare: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ResolutionSwitcher: (setW: import("../types/widgets").RollViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SamplerSelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SaveImageForCivitAI: (setW: import("../types/widgets").ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SchedulerSelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_ShuffleJSONKeys: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SortJSONKeys: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_String: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchFloat: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchImage: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchInteger: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchJSON: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_SwitchString: (setW: import("../types/widgets").BooleanViewerWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_UpdateUsageStatistics: (setW: import("../types/widgets").CodeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_UpscaleModelSelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_UrandomSeedGenerator: (setW: import("../types/widgets").TreeWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_UsageStatistics: (setW: import("../types/widgets").TabBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_VAESelector: (setW: import("../types/widgets").HistoryWidgetSetter, addW: BaseWidgetCallback) => void;
            LF_WriteJSON: (setW: import("../types/widgets").JsonInputWidgetSetter) => void;
        };
    };
}
