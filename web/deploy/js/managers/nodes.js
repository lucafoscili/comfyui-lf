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
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        this.eventHandler = {
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
        this.register = {
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
        this.get = {
            eventHandlers: this.eventHandler,
            registrations: this.register,
        };
    }
}
