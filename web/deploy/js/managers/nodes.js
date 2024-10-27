import { NodeName } from '../types/nodes.js';
import { controlPanelFactory } from '../nodes/controlPanel.js';
import { displayJsonFactory } from '../nodes/displayJson.js';
import { imageHistogramFactory } from '../nodes/imageHistogram.js';
import { loadImagesFactory } from '../nodes/loadImages.js';
import { switchImageFactory } from '../nodes/switchImage.js';
import { switchIntegerFactory } from '../nodes/switchInteger.js';
import { switchJsonFactory } from '../nodes/switchJson.js';
import { switchStringFactory } from '../nodes/switchString.js';
import { writeJsonFactory } from '../nodes/writeJson.js';
import { multipleImageResizeForWebFactory } from '../nodes/multipleImageResizeForWeb.js';
import { blurImagesFactory } from '../nodes/blurImages.js';
import { resizeImageByEdgeFactory } from '../nodes/resizeImageByEdge.js';
import { resizeImageToSquareFactory } from '../nodes/resizeImageToSquare.js';
import { llmChatFactory } from '../nodes/llmChat.js';
import { stringFactory } from '../nodes/string.js';
import { integerFactory } from '../nodes/integer.js';
import { floatFactory } from '../nodes/float.js';
import { booleanFactory } from '../nodes/boolean.js';
import { uRandomSeedGeneratorFactory } from '../nodes/urandomSeedGenerator.js';
import { randomBooleanFactory } from '../nodes/randomBoolean.js';
import { keywordCounterFactory } from '../nodes/keywordCounter.js';
import { saveImageForCivitaiFactory } from '../nodes/saveImageForCivitai.js';
import { civitaiMetadataSetupFactory } from '../nodes/civitaiMetadataSetup.js';
import { loadMetadataFactory } from '../nodes/loadMetadata.js';
import { keywordToggleFromJsonFactory } from '../nodes/keywordToggleFromJson.js';
import { llmMessengerFactory } from '../nodes/llmMessenger.js';
import { switchFloatFactory } from '../nodes/switchFloat.js';
import { displayPrimitiveAsJsonFactory } from '../nodes/displayPrimitiveAsJson.js';
import { imageListFromJsonFactory } from '../nodes/imageListFromJson.js';
import { loadFileOnceFactory } from '../nodes/loadFileOnce.js';
import { extractorFactory } from '../nodes/extractor.js';
import { resolutionSwitcherFactory } from '../nodes/resolutionSwitcher.js';
import { displayBooleanFactory } from '../nodes/displayBoolean.js';
import { displayFloatFactory } from '../nodes/displayFloat.js';
import { displayIntegerFactory } from '../nodes/displayInteger.js';
import { displayStringFactory } from '../nodes/displayString.js';
import { checkpointSelectorFactory } from '../nodes/checkpointSelector.js';
import { loraSelectorFactory } from '../nodes/loraSelector.js';
import { embeddingSelectorFactory } from '../nodes/embeddingSelector.js';
import { loraAndEmbeddingSelectorFactory } from '../nodes/loraAndEmbeddingSelector.js';
import { loadLoraTagsFactory } from '../nodes/loadLoraTags.js';
import { samplerSelectorFactory } from '../nodes/samplerSelector.js';
import { schedulerSelectorFactory } from '../nodes/schedulerSelector.js';
import { notifyFactory } from '../nodes/notify.js';
import { upscaleModelSelectorFactory } from '../nodes/upscaleModelSelector.js';
import { vaeSelectorFactory } from '../nodes/vaeSelector.js';
import { updateUsageStatisticsFactory } from '../nodes/updateUsageStatistics.js';
import { usageStatisticsFactory } from '../nodes/usageStatistics.js';
import { resizeImageToDimensionFactory } from '../nodes/resizeImageToDimension.js';
import { mathOperationFactory } from '../nodes/mathOperation.js';
import { sortJsonKeysFactory } from '../nodes/sortJsonKeys.js';
import { shuffleJsonKeysFactory } from '../nodes/shuffleJsonKeys.js';
import { clarityEffectFactory } from '../nodes/clarityEffect.js';
import { compareImagesFactory } from '../nodes/compareImages.js';
import { isLandscapeFactory } from '../nodes/isLandscape.js';
import { something2NumberFactory } from '../nodes/something2Number.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        this.eventHandler = {
            [NodeName.blurImages]: blurImagesFactory.eventHandler,
            [NodeName.boolean]: booleanFactory.eventHandler,
            [NodeName.checkpointSelector]: checkpointSelectorFactory.eventHandler,
            [NodeName.civitaiMetadataSetup]: civitaiMetadataSetupFactory.eventHandler,
            [NodeName.clarityEffect]: clarityEffectFactory.eventHandler,
            [NodeName.compareImages]: compareImagesFactory.eventHandler,
            [NodeName.displayBoolean]: displayBooleanFactory.eventHandler,
            [NodeName.displayFloat]: displayFloatFactory.eventHandler,
            [NodeName.displayInteger]: displayIntegerFactory.eventHandler,
            [NodeName.displayJson]: displayJsonFactory.eventHandler,
            [NodeName.displayPrimitiveAsJson]: displayPrimitiveAsJsonFactory.eventHandler,
            [NodeName.displayString]: displayStringFactory.eventHandler,
            [NodeName.embeddingSelector]: embeddingSelectorFactory.eventHandler,
            [NodeName.extractor]: extractorFactory.eventHandler,
            [NodeName.float]: floatFactory.eventHandler,
            [NodeName.imageHistogram]: imageHistogramFactory.eventHandler,
            [NodeName.imageListFromJSON]: imageListFromJsonFactory.eventHandler,
            [NodeName.integer]: integerFactory.eventHandler,
            [NodeName.isLandscape]: isLandscapeFactory.eventHandler,
            [NodeName.keywordCounter]: keywordCounterFactory.eventHandler,
            [NodeName.loadFileOnce]: loadFileOnceFactory.eventHandler,
            [NodeName.loadImages]: loadImagesFactory.eventHandler,
            [NodeName.loadLoraTags]: loadLoraTagsFactory.eventHandler,
            [NodeName.loraAndEmbeddingSelector]: loraAndEmbeddingSelectorFactory.eventHandler,
            [NodeName.loraSelector]: loraSelectorFactory.eventHandler,
            [NodeName.mathOperation]: mathOperationFactory.eventHandler,
            [NodeName.multipleImageResizeForWeb]: multipleImageResizeForWebFactory.eventHandler,
            [NodeName.notify]: notifyFactory.eventHandler,
            [NodeName.randomBoolean]: randomBooleanFactory.eventHandler,
            [NodeName.resizeImageByEdge]: resizeImageByEdgeFactory.eventHandler,
            [NodeName.resizeImageToDimension]: resizeImageToDimensionFactory.eventHandler,
            [NodeName.resizeImageToSquare]: resizeImageToSquareFactory.eventHandler,
            [NodeName.resolutionSwitcher]: resolutionSwitcherFactory.eventHandler,
            [NodeName.samplerSelector]: samplerSelectorFactory.eventHandler,
            [NodeName.saveImageForCivitai]: saveImageForCivitaiFactory.eventHandler,
            [NodeName.schedulerSelector]: schedulerSelectorFactory.eventHandler,
            [NodeName.shuffleJsonKeys]: shuffleJsonKeysFactory.eventHandler,
            [NodeName.something2Number]: something2NumberFactory.eventHandler,
            [NodeName.sortJsonKeys]: sortJsonKeysFactory.eventHandler,
            [NodeName.string]: stringFactory.eventHandler,
            [NodeName.switchFloat]: switchFloatFactory.eventHandler,
            [NodeName.switchImage]: switchImageFactory.eventHandler,
            [NodeName.switchInteger]: switchIntegerFactory.eventHandler,
            [NodeName.switchJson]: switchJsonFactory.eventHandler,
            [NodeName.switchString]: switchStringFactory.eventHandler,
            [NodeName.updateUsageStatistics]: updateUsageStatisticsFactory.eventHandler,
            [NodeName.upscaleModelSelector]: upscaleModelSelectorFactory.eventHandler,
            [NodeName.urandomSeedGenerator]: uRandomSeedGeneratorFactory.eventHandler,
            [NodeName.usageStatistics]: usageStatisticsFactory.eventHandler,
            [NodeName.vaeSelector]: vaeSelectorFactory.eventHandler,
            [NodeName.writeJson]: writeJsonFactory.eventHandler,
        };
        this.register = {
            [NodeName.blurImages]: blurImagesFactory.register,
            [NodeName.boolean]: booleanFactory.register,
            [NodeName.checkpointSelector]: checkpointSelectorFactory.register,
            [NodeName.civitaiMetadataSetup]: civitaiMetadataSetupFactory.register,
            [NodeName.clarityEffect]: clarityEffectFactory.register,
            [NodeName.compareImages]: compareImagesFactory.register,
            [NodeName.controlPanel]: controlPanelFactory.register,
            [NodeName.displayBoolean]: displayBooleanFactory.register,
            [NodeName.displayFloat]: displayFloatFactory.register,
            [NodeName.displayInteger]: displayIntegerFactory.register,
            [NodeName.displayJson]: displayJsonFactory.register,
            [NodeName.displayPrimitiveAsJson]: displayPrimitiveAsJsonFactory.register,
            [NodeName.displayString]: displayStringFactory.register,
            [NodeName.embeddingSelector]: embeddingSelectorFactory.register,
            [NodeName.extractor]: extractorFactory.register,
            [NodeName.float]: floatFactory.register,
            [NodeName.imageHistogram]: imageHistogramFactory.register,
            [NodeName.imageListFromJSON]: imageListFromJsonFactory.register,
            [NodeName.integer]: integerFactory.register,
            [NodeName.isLandscape]: isLandscapeFactory.register,
            [NodeName.keywordCounter]: keywordCounterFactory.register,
            [NodeName.keywordToggleFromJson]: keywordToggleFromJsonFactory.register,
            [NodeName.llmChat]: llmChatFactory.register,
            [NodeName.llmMessenger]: llmMessengerFactory.register,
            [NodeName.loadFileOnce]: loadFileOnceFactory.register,
            [NodeName.loadImages]: loadImagesFactory.register,
            [NodeName.loadLoraTags]: loadLoraTagsFactory.register,
            [NodeName.loraAndEmbeddingSelector]: loraAndEmbeddingSelectorFactory.register,
            [NodeName.loadMetadata]: loadMetadataFactory.register,
            [NodeName.loraSelector]: loraSelectorFactory.register,
            [NodeName.mathOperation]: mathOperationFactory.register,
            [NodeName.multipleImageResizeForWeb]: multipleImageResizeForWebFactory.register,
            [NodeName.notify]: notifyFactory.register,
            [NodeName.randomBoolean]: randomBooleanFactory.register,
            [NodeName.resizeImageByEdge]: resizeImageByEdgeFactory.register,
            [NodeName.resizeImageToDimension]: resizeImageToDimensionFactory.register,
            [NodeName.resizeImageToSquare]: resizeImageToSquareFactory.register,
            [NodeName.resolutionSwitcher]: resolutionSwitcherFactory.register,
            [NodeName.samplerSelector]: samplerSelectorFactory.register,
            [NodeName.saveImageForCivitai]: saveImageForCivitaiFactory.register,
            [NodeName.schedulerSelector]: schedulerSelectorFactory.register,
            [NodeName.shuffleJsonKeys]: shuffleJsonKeysFactory.register,
            [NodeName.something2Number]: something2NumberFactory.register,
            [NodeName.sortJsonKeys]: sortJsonKeysFactory.register,
            [NodeName.string]: stringFactory.register,
            [NodeName.switchFloat]: switchFloatFactory.register,
            [NodeName.switchImage]: switchImageFactory.register,
            [NodeName.switchInteger]: switchIntegerFactory.register,
            [NodeName.switchJson]: switchJsonFactory.register,
            [NodeName.switchString]: switchStringFactory.register,
            [NodeName.updateUsageStatistics]: updateUsageStatisticsFactory.register,
            [NodeName.upscaleModelSelector]: upscaleModelSelectorFactory.register,
            [NodeName.urandomSeedGenerator]: uRandomSeedGeneratorFactory.register,
            [NodeName.usageStatistics]: usageStatisticsFactory.register,
            [NodeName.vaeSelector]: vaeSelectorFactory.register,
            [NodeName.writeJson]: writeJsonFactory.register,
        };
        this.get = {
            eventHandlers: this.eventHandler,
            registrations: this.register,
        };
    }
}
