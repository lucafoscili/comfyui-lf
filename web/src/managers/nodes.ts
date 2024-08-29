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

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  eventHandler = {
    [NodeName.displayJson]: displayJsonFactory.eventHandler,
    [NodeName.imageHistogram]: imageHistogramFactory.eventHandler,
    [NodeName.loadImages]: loadImagesFactory.eventHandler,
    [NodeName.switchImage]: switchImageFactory.eventHandler,
    [NodeName.switchInteger]: switchIntegerFactory.eventHandler,
    [NodeName.switchJson]: switchJsonFactory.eventHandler,
    [NodeName.switchString]: switchStringFactory.eventHandler,
    [NodeName.writeJson]: writeJsonFactory.eventHandler,
  };

  register = {
    [NodeName.controlPanel]: controlPanelFactory.register,
    [NodeName.displayJson]: displayJsonFactory.register,
    [NodeName.imageHistogram]: imageHistogramFactory.register,
    [NodeName.loadImages]: loadImagesFactory.register,
    [NodeName.switchImage]: switchImageFactory.register,
    [NodeName.switchInteger]: switchIntegerFactory.register,
    [NodeName.switchJson]: switchJsonFactory.register,
    [NodeName.switchString]: switchStringFactory.register,
    [NodeName.writeJson]: writeJsonFactory.register,
  };

  get = {
    eventHandlers: this.eventHandler,
    registrations: this.register,
  };
}
