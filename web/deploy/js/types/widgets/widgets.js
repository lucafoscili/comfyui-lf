//#region Enums
export var ComfyWidgetName;
(function (ComfyWidgetName) {
    ComfyWidgetName["boolean"] = "BOOLEAN";
    ComfyWidgetName["combo"] = "COMBO";
    ComfyWidgetName["customtext"] = "CUSTOMTEXT";
    ComfyWidgetName["float"] = "FLOAT";
    ComfyWidgetName["integer"] = "INTEGER";
    ComfyWidgetName["json"] = "JSON";
    ComfyWidgetName["number"] = "NUMBER";
    ComfyWidgetName["seed"] = "SEED";
    ComfyWidgetName["string"] = "STRING";
    ComfyWidgetName["text"] = "TEXT";
    ComfyWidgetName["toggle"] = "TOGGLE";
})(ComfyWidgetName || (ComfyWidgetName = {}));
export var CustomWidgetName;
(function (CustomWidgetName) {
    CustomWidgetName["card"] = "KUL_CARD";
    CustomWidgetName["cardsWithChip"] = "KUL_CARDS_WITH_CHIP";
    CustomWidgetName["carousel"] = "KUL_CAROUSEL";
    CustomWidgetName["chat"] = "KUL_CHAT";
    CustomWidgetName["chip"] = "KUL_CHIP";
    CustomWidgetName["code"] = "KUL_CODE";
    CustomWidgetName["compare"] = "KUL_COMPARE";
    CustomWidgetName["controlPanel"] = "KUL_CONTROL_PANEL";
    CustomWidgetName["countBarChart"] = "KUL_COUNT_BAR_CHART";
    CustomWidgetName["history"] = "KUL_HISTORY";
    CustomWidgetName["imageEditor"] = "KUL_IMAGE_EDITOR";
    CustomWidgetName["masonry"] = "KUL_MASONRY";
    CustomWidgetName["messenger"] = "KUL_MESSENGER";
    CustomWidgetName["progressbar"] = "KUL_PROGRESSBAR";
    CustomWidgetName["tabBarChart"] = "KUL_TAB_BAR_CHART";
    CustomWidgetName["textarea"] = "KUL_TEXTAREA";
    CustomWidgetName["tree"] = "KUL_TREE";
    CustomWidgetName["upload"] = "KUL_UPLOAD";
})(CustomWidgetName || (CustomWidgetName = {}));
export var NodeName;
(function (NodeName) {
    NodeName["blend"] = "LF_Blend";
    NodeName["blurImages"] = "LF_BlurImages";
    NodeName["boolean"] = "LF_Boolean";
    NodeName["brightness"] = "LF_Brightness";
    NodeName["brush"] = "LF_Brush";
    NodeName["characterImpersonator"] = "LF_CharacterImpersonator";
    NodeName["checkpointSelector"] = "LF_CheckpointSelector";
    NodeName["civitaiMetadataSetup"] = "LF_CivitAIMetadataSetup";
    NodeName["clarity"] = "LF_Clarity";
    NodeName["colorAnalysis"] = "LF_ColorAnalysis";
    NodeName["compareImages"] = "LF_CompareImages";
    NodeName["contrast"] = "LF_Contrast";
    NodeName["controlPanel"] = "LF_ControlPanel";
    NodeName["desaturation"] = "LF_Desaturation";
    NodeName["displayBoolean"] = "LF_DisplayBoolean";
    NodeName["displayFloat"] = "LF_DisplayFloat";
    NodeName["displayInteger"] = "LF_DisplayInteger";
    NodeName["displayJson"] = "LF_DisplayJSON";
    NodeName["displayPrimitiveAsJson"] = "LF_DisplayPrimitiveAsJSON";
    NodeName["displayString"] = "LF_DisplayString";
    NodeName["markdownDocGenerator"] = "LF_MarkdownDocGenerator";
    NodeName["float"] = "LF_Float";
    NodeName["embeddingSelector"] = "LF_EmbeddingSelector";
    NodeName["extractString"] = "LF_ExtractString";
    NodeName["extractPromptFromLoraTag"] = "LF_ExtractPromptFromLoraTag";
    NodeName["gaussianBlur"] = "LF_GaussianBlur";
    NodeName["getValueFromJson"] = "LF_GetValueFromJSON";
    NodeName["getRandomKeyFromJson"] = "LF_GetRandomKeyFromJSON";
    NodeName["imageClassifier"] = "LF_ImageClassifier";
    NodeName["imageListFromJSON"] = "LF_ImageListFromJSON";
    NodeName["imageHistogram"] = "LF_ImageHistogram";
    NodeName["imagesEditingBreakpoint"] = "LF_ImagesEditingBreakpoint";
    NodeName["imagesSlideshow"] = "LF_ImagesSlideshow";
    NodeName["integer"] = "LF_Integer";
    NodeName["isLandscape"] = "LF_IsLandscape";
    NodeName["keywordCounter"] = "LF_KeywordCounter";
    NodeName["keywordToggleFromJson"] = "LF_KeywordToggleFromJSON";
    NodeName["line"] = "LF_Line";
    NodeName["llmChat"] = "LF_LLMChat";
    NodeName["llmMessenger"] = "LF_LLMMessenger";
    NodeName["loadAndEditImages"] = "LF_LoadAndEditImages";
    NodeName["loadFileOnce"] = "LF_LoadFileOnce";
    NodeName["loadImages"] = "LF_LoadImages";
    NodeName["loadLoraTags"] = "LF_LoadLoraTags";
    NodeName["loadMetadata"] = "LF_LoadMetadata";
    NodeName["loraAndEmbeddingSelector"] = "LF_LoraAndEmbeddingSelector";
    NodeName["loraSelector"] = "LF_LoraSelector";
    NodeName["lutApplication"] = "LF_LUTApplication";
    NodeName["lutGeneration"] = "LF_LUTGeneration";
    NodeName["mathOperation"] = "LF_MathOperation";
    NodeName["multipleImageResizeForWeb"] = "LF_MultipleImageResizeForWeb";
    NodeName["notify"] = "LF_Notify";
    NodeName["parsePromptWithLoraTags"] = "LF_ParsePromptWithLoraTags";
    NodeName["randomBoolean"] = "LF_RandomBoolean";
    NodeName["regionExtractor"] = "LF_RegionExtractor";
    NodeName["resizeImageByEdge"] = "LF_ResizeImageByEdge";
    NodeName["resizeImageToDimension"] = "LF_ResizeImageToDimension";
    NodeName["resizeImageToSquare"] = "LF_ResizeImageToSquare";
    NodeName["resolutionSwitcher"] = "LF_ResolutionSwitcher";
    NodeName["samplerSelector"] = "LF_SamplerSelector";
    NodeName["saveImageForCivitai"] = "LF_SaveImageForCivitAI";
    NodeName["saveJson"] = "LF_SaveJSON";
    NodeName["saveMarkdown"] = "LF_SaveMarkdown";
    NodeName["schedulerSelector"] = "LF_SchedulerSelector";
    NodeName["sequentialSeedsGenerator"] = "LF_SequentialSeedsGenerator";
    NodeName["setValueInJson"] = "LF_SetValueInJSON";
    NodeName["shuffleJsonKeys"] = "LF_ShuffleJSONKeys";
    NodeName["something2Number"] = "LF_Something2Number";
    NodeName["something2String"] = "LF_Something2String";
    NodeName["sortJsonKeys"] = "LF_SortJSONKeys";
    NodeName["string"] = "LF_String";
    NodeName["stringReplace"] = "LF_StringReplace";
    NodeName["stringToJson"] = "LF_StringToJSON";
    NodeName["switchFloat"] = "LF_SwitchFloat";
    NodeName["switchImage"] = "LF_SwitchImage";
    NodeName["switchInteger"] = "LF_SwitchInteger";
    NodeName["switchJson"] = "LF_SwitchJSON";
    NodeName["switchString"] = "LF_SwitchString";
    NodeName["updateUsageStatistics"] = "LF_UpdateUsageStatistics";
    NodeName["upscaleModelSelector"] = "LF_UpscaleModelSelector";
    NodeName["urandomSeedGenerator"] = "LF_UrandomSeedGenerator";
    NodeName["usageStatistics"] = "LF_UsageStatistics";
    NodeName["vaeSelector"] = "LF_VAESelector";
    NodeName["viewImages"] = "LF_ViewImages";
    NodeName["vignette"] = "LF_Vignette";
    NodeName["wallOfText"] = "LF_WallOfText";
    NodeName["writeJson"] = "LF_WriteJSON";
})(NodeName || (NodeName = {}));
export var TagName;
(function (TagName) {
    TagName["Div"] = "div";
    TagName["KulAccordion"] = "kul-accordion";
    TagName["KulArticle"] = "kul-article";
    TagName["KulButton"] = "kul-button";
    TagName["KulCard"] = "kul-card";
    TagName["KulCarousel"] = "kul-carousel";
    TagName["KulChat"] = "kul-chat";
    TagName["KulChart"] = "kul-chart";
    TagName["KulChip"] = "kul-chip";
    TagName["KulCode"] = "kul-code";
    TagName["KulCompare"] = "kul-compare";
    TagName["KulImageviewer"] = "kul-imageviewer";
    TagName["KulList"] = "kul-list";
    TagName["KulMasonry"] = "kul-masonry";
    TagName["KulMessenger"] = "kul-messenger";
    TagName["KulProgressbar"] = "kul-progressbar";
    TagName["KulSlider"] = "kul-slider";
    TagName["KulSpinner"] = "kul-spinner";
    TagName["KulTabbar"] = "kul-tabbar";
    TagName["KulTextfield"] = "kul-textfield";
    TagName["KulToggle"] = "kul-toggle";
    TagName["KulTree"] = "kul-tree";
    TagName["KulUpload"] = "kul-upload";
    TagName["Textarea"] = "textarea";
})(TagName || (TagName = {}));
//#endregion
