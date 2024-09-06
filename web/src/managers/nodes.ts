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
import { imageResizeByEdgeFactory } from '../nodes/imageResizeByEdge';
import { llmChatFactory } from '../nodes/llmChat';
import { stringFactory } from '../nodes/string';
import { integerFactory } from '../nodes/integer';
import { floatFactory } from '../nodes/float';
import { booleanFactory } from '../nodes/boolean';
import { uRandomSeedGeneratorFactory } from '../nodes/urandomSeedGenerator';
import { randomBooleanFactory } from '../nodes/randomBoolean';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  eventHandler = {
    [NodeName.blurImages]: blurImagesFactory.eventHandler,
    [NodeName.boolean]: booleanFactory.eventHandler,
    [NodeName.displayJson]: displayJsonFactory.eventHandler,
    [NodeName.float]: floatFactory.eventHandler,
    [NodeName.imageHistogram]: imageHistogramFactory.eventHandler,
    [NodeName.imageResizeByEdge]: imageResizeByEdgeFactory.eventHandler,
    [NodeName.integer]: integerFactory.eventHandler,
    [NodeName.loadImages]: loadImagesFactory.eventHandler,
    [NodeName.multipleImageResizeForWeb]: multipleImageResizeForWebFactory.eventHandler,
    [NodeName.randomBoolean]: randomBooleanFactory.eventHandler,
    [NodeName.string]: stringFactory.eventHandler,
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
    [NodeName.controlPanel]: controlPanelFactory.register,
    [NodeName.displayJson]: displayJsonFactory.register,
    [NodeName.float]: floatFactory.register,
    [NodeName.imageHistogram]: imageHistogramFactory.register,
    [NodeName.imageResizeByEdge]: imageResizeByEdgeFactory.register,
    [NodeName.integer]: integerFactory.register,
    [NodeName.llmChat]: llmChatFactory.register,
    [NodeName.loadImages]: loadImagesFactory.register,
    [NodeName.multipleImageResizeForWeb]: multipleImageResizeForWebFactory.register,
    [NodeName.randomBoolean]: randomBooleanFactory.register,
    [NodeName.string]: stringFactory.register,
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
