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

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  eventHandler = {
    [NodeName.blurImages]: blurImagesFactory.eventHandler,
    [NodeName.boolean]: booleanFactory.eventHandler,
    [NodeName.civitaiMetadataSetup]: civitaiMetadataSetupFactory.eventHandler,
    [NodeName.displayBoolean]: displayBooleanFactory.eventHandler,
    [NodeName.displayFloat]: displayFloatFactory.eventHandler,
    [NodeName.displayInteger]: displayIntegerFactory.eventHandler,
    [NodeName.displayJson]: displayJsonFactory.eventHandler,
    [NodeName.displayPrimitiveAsJson]: displayPrimitiveAsJsonFactory.eventHandler,
    [NodeName.float]: floatFactory.eventHandler,
    [NodeName.extractor]: extractorFactory.eventHandler,
    [NodeName.imageListFromJSON]: imageListFromJsonFactory.eventHandler,
    [NodeName.imageHistogram]: imageHistogramFactory.eventHandler,
    [NodeName.integer]: integerFactory.eventHandler,
    [NodeName.keywordCounter]: keywordCounterFactory.eventHandler,
    [NodeName.loadFileOnce]: loadFileOnceFactory.eventHandler,
    [NodeName.loadImages]: loadImagesFactory.eventHandler,
    [NodeName.multipleImageResizeForWeb]: multipleImageResizeForWebFactory.eventHandler,
    [NodeName.randomBoolean]: randomBooleanFactory.eventHandler,
    [NodeName.resizeImageByEdge]: resizeImageByEdgeFactory.eventHandler,
    [NodeName.resizeImageToSquare]: resizeImageToSquareFactory.eventHandler,
    [NodeName.resolutionSwitcher]: resolutionSwitcherFactory.eventHandler,
    [NodeName.saveImageForCivitai]: saveImageForCivitaiFactory.eventHandler,
    [NodeName.string]: stringFactory.eventHandler,
    [NodeName.switchFloat]: switchFloatFactory.eventHandler,
    [NodeName.switchImage]: switchImageFactory.eventHandler,
    [NodeName.switchInteger]: switchIntegerFactory.eventHandler,
    [NodeName.switchJson]: switchJsonFactory.eventHandler,
    [NodeName.switchString]: switchStringFactory.eventHandler,
    [NodeName.urandomSeedGenerator]: uRandomSeedGeneratorFactory.eventHandler,
    [NodeName.writeJson]: writeJsonFactory.eventHandler,
  };

  register = {
    [NodeName.blurImages]: blurImagesFactory.register,
    [NodeName.boolean]: booleanFactory.register,
    [NodeName.civitaiMetadataSetup]: civitaiMetadataSetupFactory.register,
    [NodeName.controlPanel]: controlPanelFactory.register,
    [NodeName.displayBoolean]: displayBooleanFactory.register,
    [NodeName.displayFloat]: displayFloatFactory.register,
    [NodeName.displayInteger]: displayIntegerFactory.register,
    [NodeName.displayJson]: displayJsonFactory.register,
    [NodeName.displayPrimitiveAsJson]: displayPrimitiveAsJsonFactory.register,
    [NodeName.float]: floatFactory.register,
    [NodeName.extractor]: extractorFactory.register,
    [NodeName.imageListFromJSON]: imageListFromJsonFactory.register,
    [NodeName.imageHistogram]: imageHistogramFactory.register,
    [NodeName.integer]: integerFactory.register,
    [NodeName.keywordCounter]: keywordCounterFactory.register,
    [NodeName.keywordToggleFromJson]: keywordToggleFromJsonFactory.register,
    [NodeName.llmChat]: llmChatFactory.register,
    [NodeName.llmMessenger]: llmMessengerFactory.register,
    [NodeName.loadFileOnce]: loadFileOnceFactory.register,
    [NodeName.loadImages]: loadImagesFactory.register,
    [NodeName.loadMetadata]: loadMetadataFactory.register,
    [NodeName.multipleImageResizeForWeb]: multipleImageResizeForWebFactory.register,
    [NodeName.randomBoolean]: randomBooleanFactory.register,
    [NodeName.resizeImageByEdge]: resizeImageByEdgeFactory.register,
    [NodeName.resizeImageToSquare]: resizeImageToSquareFactory.register,
    [NodeName.resolutionSwitcher]: resolutionSwitcherFactory.register,
    [NodeName.saveImageForCivitai]: saveImageForCivitaiFactory.register,
    [NodeName.string]: stringFactory.register,
    [NodeName.switchFloat]: switchFloatFactory.register,
    [NodeName.switchImage]: switchImageFactory.register,
    [NodeName.switchInteger]: switchIntegerFactory.register,
    [NodeName.switchJson]: switchJsonFactory.register,
    [NodeName.switchString]: switchStringFactory.register,
    [NodeName.urandomSeedGenerator]: uRandomSeedGeneratorFactory.register,
    [NodeName.writeJson]: writeJsonFactory.register,
  };

  get = {
    eventHandlers: this.eventHandler,
    registrations: this.register,
  };
}
