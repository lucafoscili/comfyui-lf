import { NodeName } from '../types/nodes';
import { controlPanelFactory } from '../nodes/controlPanel';
import { displayJsonFactory } from '../nodes/displayJson';
import { imageHistogramFactory } from '../nodes/imageHistogram';
import { loadImagesFactory } from '../nodes/loadImages';
import { switchImageFactory } from '../nodes/switchImage';
import { switchIntegerFactory } from '../nodes/switchInteger';
import { switchJsonFactory } from '../nodes/switchJson';
import { switchStringFactory } from '../nodes/switchString';
import { BaseWidgetCallback } from '../types/widgets';
import { writeJsonFactory } from '../nodes/writeJson';
import { multipleImageResizeForWebFactory } from '../nodes/multipleImageResizeForWeb';
import { blurImagesFactory } from '../nodes/blurImages';
import { resizeImageByEdgeFactory } from '../nodes/resizeImageByEdge';
import { resizeImageToSquareFactory } from '../nodes/resizeImageToSquare';
import { llmChatFactory } from '../nodes/llmChat';
import { stringFactory } from '../nodes/string';
import { integerFactory } from '../nodes/integer';
import { floatFactory } from '../nodes/float';
import { booleanFactory } from '../nodes/boolean';
import { uRandomSeedGeneratorFactory } from '../nodes/urandomSeedGenerator';
import { randomBooleanFactory } from '../nodes/randomBoolean';
import { keywordCounterFactory } from '../nodes/keywordCounter';
import { saveImageForCivitaiFactory } from '../nodes/saveImageForCivitai';
import { civitaiMetadataSetupFactory } from '../nodes/civitaiMetadataSetup';
import { loadMetadataFactory } from '../nodes/loadMetadata';
import { keywordToggleFromJsonFactory } from '../nodes/keywordToggleFromJson';
import { llmMessengerFactory } from '../nodes/llmMessenger';
import { switchFloatFactory } from '../nodes/switchFloat';
import { displayPrimitiveAsJsonFactory } from '../nodes/displayPrimitiveAsJson';
import { imageListFromJsonFactory } from '../nodes/imageListFromJson';
import { loadFileOnceFactory } from '../nodes/loadFileOnce';
import { extractorFactory } from '../nodes/extractor';
import { resolutionSwitcherFactory } from '../nodes/resolutionSwitcher';
import { displayBooleanFactory } from '../nodes/displayBoolean';
import { displayFloatFactory } from '../nodes/displayFloat';
import { displayIntegerFactory } from '../nodes/displayInteger';
import { displayStringFactory } from '../nodes/displayString';
import { checkpointSelectorFactory } from '../nodes/checkpointSelector';
import { loraSelectorFactory } from '../nodes/loraSelector';
import { embeddingSelectorFactory } from '../nodes/embeddingSelector';
import { loraAndEmbeddingSelectorFactory } from '../nodes/loraAndEmbeddingSelector';
import { loadLoraTagsFactory } from '../nodes/loadLoraTags';
import { samplerSelectorFactory } from '../nodes/samplerSelector';
import { schedulerSelectorFactory } from '../nodes/schedulerSelector';
import { notifyFactory } from '../nodes/notify';
import { upscaleModelSelectorFactory } from '../nodes/upscaleModelSelector';
import { vaeSelectorFactory } from '../nodes/vaeSelector';
import { updateUsageStatisticsFactory } from '../nodes/updateUsageStatistics';
import { usageStatisticsFactory } from '../nodes/usageStatistics';
import { resizeImageToDimensionFactory } from '../nodes/resizeImageToDimension';
import { mathOperationFactory } from '../nodes/mathOperation';
import { sortJsonKeysFactory } from '../nodes/sortJsonKeys';
import { shuffleJsonKeysFactory } from '../nodes/shuffleJsonKeys';
import { clarityEffectFactory } from '../nodes/clarityEffect';
import { compareImagesFactory } from '../nodes/compareImages';
import { isLandscapeFactory } from '../nodes/isLandscape';
import { something2NumberFactory } from '../nodes/something2Number';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  eventHandler = {
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

  register = {
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

  get = {
    eventHandlers: this.eventHandler,
    registrations: this.register,
  };
}
