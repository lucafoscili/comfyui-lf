import { LogSeverity } from '../types/manager/manager.js';
import { ComfyWidgetName, CustomWidgetName, NodeName, } from '../types/widgets/widgets.js';
import { MessengerCSS } from '../types/widgets/messenger.js';
import { areJSONEqual, getApiRoutes, getCustomWidget, getInput, getLFManager, isValidJSON, refreshChart, unescapeJson, } from '../utils/common.js';
//#region Node-Widget map
export const NODE_WIDGET_MAP = {
    LF_BlurImages: [CustomWidgetName.masonry],
    LF_Boolean: [CustomWidgetName.history],
    LF_Brightness: [CustomWidgetName.compare],
    LF_Brush: [CustomWidgetName.compare],
    LF_CharacterImpersonator: [CustomWidgetName.code],
    LF_CheckpointSelector: [CustomWidgetName.card],
    LF_CivitAIMetadataSetup: [CustomWidgetName.code],
    LF_Clarity: [CustomWidgetName.compare],
    LF_ColorAnalysis: [CustomWidgetName.tabBarChart],
    LF_CompareImages: [CustomWidgetName.compare],
    LF_Contrast: [CustomWidgetName.compare],
    LF_ControlPanel: [CustomWidgetName.controlPanel],
    LF_Desaturation: [CustomWidgetName.compare],
    LF_DisplayBoolean: [CustomWidgetName.code],
    LF_DisplayFloat: [CustomWidgetName.code],
    LF_DisplayInteger: [CustomWidgetName.code],
    LF_DisplayJSON: [CustomWidgetName.code],
    LF_DisplayPrimitiveAsJSON: [CustomWidgetName.code],
    LF_DisplayString: [CustomWidgetName.code],
    LF_EmbeddingSelector: [CustomWidgetName.card],
    LF_ExtractString: [CustomWidgetName.code],
    LF_ExtractPromptFromLoraTag: [CustomWidgetName.code],
    LF_Float: [CustomWidgetName.history],
    LF_GaussianBlur: [CustomWidgetName.compare],
    LF_GetRandomKeyFromJSON: [CustomWidgetName.code],
    LF_GetValueFromJSON: [CustomWidgetName.code],
    LF_ImageClassifier: [CustomWidgetName.code],
    LF_ImageHistogram: [CustomWidgetName.tabBarChart],
    LF_ImageListFromJSON: [CustomWidgetName.masonry],
    LF_ImagesEditingBreakpoint: [CustomWidgetName.imageEditor],
    LF_ImagesSlideshow: [CustomWidgetName.carousel],
    LF_Integer: [CustomWidgetName.history],
    LF_IsLandscape: [CustomWidgetName.tree],
    LF_KeywordCounter: [CustomWidgetName.countBarChart],
    LF_KeywordToggleFromJSON: [CustomWidgetName.chip],
    LF_Line: [CustomWidgetName.compare],
    LF_LLMChat: [CustomWidgetName.chat],
    LF_LLMMessenger: [CustomWidgetName.messenger],
    LF_LoadAndEditImages: [CustomWidgetName.imageEditor],
    LF_LoadFileOnce: [CustomWidgetName.history],
    LF_LoadImages: [CustomWidgetName.masonry],
    LF_LoadLoraTags: [CustomWidgetName.cardsWithChip],
    LF_LoadMetadata: [CustomWidgetName.code, CustomWidgetName.upload],
    LF_LoraAndEmbeddingSelector: [CustomWidgetName.card],
    LF_LoraSelector: [CustomWidgetName.card],
    LF_LUTApplication: [CustomWidgetName.compare],
    LF_LUTGeneration: [CustomWidgetName.tabBarChart],
    LF_MarkdownDocGenerator: [CustomWidgetName.code],
    LF_MathOperation: [CustomWidgetName.code],
    LF_MultipleImageResizeForWeb: [CustomWidgetName.masonry],
    LF_Notify: [],
    LF_ParsePromptWithLoraTags: [CustomWidgetName.code],
    LF_RandomBoolean: [CustomWidgetName.progressbar],
    LF_RegionExtractor: [CustomWidgetName.code],
    LF_ResizeImageByEdge: [CustomWidgetName.tree],
    LF_ResizeImageToDimension: [CustomWidgetName.tree],
    LF_ResizeImageToSquare: [CustomWidgetName.tree],
    LF_ResolutionSwitcher: [CustomWidgetName.progressbar],
    LF_SamplerSelector: [CustomWidgetName.history],
    LF_SaveImageForCivitAI: [CustomWidgetName.masonry],
    LF_SaveJSON: [CustomWidgetName.tree],
    LF_SaveMarkdown: [CustomWidgetName.tree],
    LF_SchedulerSelector: [CustomWidgetName.history],
    LF_SequentialSeedsGenerator: [CustomWidgetName.history],
    LF_SetValueInJSON: [CustomWidgetName.code],
    LF_ShuffleJSONKeys: [CustomWidgetName.code],
    LF_Something2Number: [CustomWidgetName.code],
    LF_Something2String: [CustomWidgetName.code],
    LF_SortJSONKeys: [CustomWidgetName.code],
    LF_String: [CustomWidgetName.history],
    LF_StringToJSON: [CustomWidgetName.code],
    LF_SwitchFloat: [CustomWidgetName.progressbar],
    LF_SwitchImage: [CustomWidgetName.progressbar],
    LF_SwitchInteger: [CustomWidgetName.progressbar],
    LF_SwitchJSON: [CustomWidgetName.progressbar],
    LF_SwitchString: [CustomWidgetName.progressbar],
    LF_UpdateUsageStatistics: [CustomWidgetName.code],
    LF_UpscaleModelSelector: [CustomWidgetName.history],
    LF_UsageStatistics: [CustomWidgetName.tabBarChart],
    LF_UrandomSeedGenerator: [CustomWidgetName.tree],
    LF_VAESelector: [CustomWidgetName.history],
    LF_ViewImages: [CustomWidgetName.masonry],
    LF_Vignette: [CustomWidgetName.compare],
    LF_WallOfText: [CustomWidgetName.code],
    LF_WriteJSON: [CustomWidgetName.textarea],
};
//#endregion
//#region onConnectionsChange
export const onConnectionsChange = async (nodeType) => {
    const onConnectionsChange = nodeType.prototype.onConnectionsChange;
    nodeType.prototype.onConnectionsChange = function () {
        const r = onConnectionsChange?.apply(this, arguments);
        const node = this;
        switch (node.comfyClass) {
            case NodeName.keywordToggleFromJson:
                chipCb(node);
                break;
            case NodeName.llmMessenger:
                messengerCb(node);
                break;
        }
        return r;
    };
};
//#endregion
//#region onDrawBackground
export const onDrawBackground = async (nodeType) => {
    const onDrawBackground = nodeType.prototype.onDrawBackground;
    nodeType.prototype.onDrawBackground = function () {
        const r = onDrawBackground?.apply(this, arguments);
        const node = this;
        refreshChart(node);
        return r;
    };
};
//#endregion
//#region onNodeCreated
export const onNodeCreated = async (nodeType) => {
    const onNodeCreated = nodeType.prototype.onNodeCreated;
    nodeType.prototype.onNodeCreated = function () {
        const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : void 0;
        const node = this;
        for (let index = 0; index < node.widgets?.length; index++) {
            const w = node.widgets[index];
            switch (w.type.toUpperCase()) {
                case ComfyWidgetName.customtext:
                case ComfyWidgetName.string:
                case ComfyWidgetName.text:
                    w.serializeValue = () => {
                        const comfy = getApiRoutes().comfy.comfyUi();
                        return comfy.utils.applyTextReplacements(comfy, w.value);
                    };
                    break;
            }
        }
        return r;
    };
};
//#endregion
//#region chipCb
const chipCb = (node) => {
    const lfManager = getLFManager();
    const routes = getApiRoutes().comfy;
    const textarea = getInput(node, ComfyWidgetName.json);
    const linkInput = routes.getLinkById(textarea?.link?.toString());
    const nodeInput = routes.getNodeById(linkInput?.origin_id?.toString());
    if (!textarea || !linkInput || !nodeInput) {
        return;
    }
    const chipW = getCustomWidget(node, CustomWidgetName.chip);
    const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
    if (!chipW || !datasetW) {
        return;
    }
    const dataset = datasetW.options.getValue();
    const chip = chipW.options.getState().chip;
    try {
        const newData = unescapeJson(dataset).parsedJson;
        if (isValidJSON(newData) && isValidJSON(chip.kulData)) {
            if (!areJSONEqual(newData, chip.kulData)) {
                chip.kulData = newData;
                lfManager.log('Updated chip data', { dataset }, LogSeverity.Info);
            }
        }
        else {
            if (isValidJSON(newData)) {
                chip.kulData = newData;
                lfManager.log('Set chip data', { dataset }, LogSeverity.Info);
            }
            else {
                lfManager.log('Invalid JSON data', { dataset, error: 'Invalid JSON' }, LogSeverity.Warning);
            }
        }
    }
    catch (error) {
        lfManager.log('Error processing chip data', { dataset, error }, LogSeverity.Error);
    }
};
//#endregion
//#region messengerCb
const messengerCb = (node) => {
    const textarea = getInput(node, ComfyWidgetName.json);
    const linkInput = getApiRoutes().comfy.getLinkById(textarea?.link?.toString());
    const nodeInput = getApiRoutes().comfy.getNodeById(linkInput?.origin_id?.toString());
    if (!textarea || !linkInput || !nodeInput) {
        return;
    }
    const messengerW = getCustomWidget(node, CustomWidgetName.messenger);
    const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
    if (!datasetW?.options?.getValue) {
        return;
    }
    const dataset = datasetW.options.getValue();
    const messenger = (messengerW?.options?.getState()).elements.messenger;
    try {
        const newData = unescapeJson(dataset).parsedJson;
        if (isValidJSON(newData) && isValidJSON(messenger.kulData)) {
            if (!areJSONEqual(newData, messenger.kulData)) {
                messenger.kulData = newData;
                messenger.reset();
                getLFManager().log('Updated messenger data', { dataset }, LogSeverity.Info);
            }
        }
        else {
            if (isValidJSON(newData)) {
                messenger.kulData = newData;
                messenger.reset();
                getLFManager().log('Set messenger data', { dataset }, LogSeverity.Info);
            }
            else {
                getLFManager().log('Invalid JSON data', { dataset, error: 'Invalid JSON' }, LogSeverity.Warning);
            }
        }
        const placeholder = messenger.nextSibling || messenger.previousSibling;
        if (messenger.kulData?.nodes?.[0]) {
            placeholder.classList.add(MessengerCSS.PlaceholderHidden);
        }
        else {
            placeholder.classList.remove(MessengerCSS.PlaceholderHidden);
        }
    }
    catch (error) {
        getLFManager().log('Error processing messenger data', { dataset, error }, LogSeverity.Error);
    }
};
//#endregion
//#region logStyle
export const getLogStyle = () => {
    return {
        fontFamily: 'var(--kul-font-family-monospace)',
        margin: '0',
        maxWidth: '100%',
        overflow: 'hidden',
        padding: '4px 8px',
        textOverflow: 'ellipsis',
    };
};
//#endregion
