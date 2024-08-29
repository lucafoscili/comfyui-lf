import { controlPanelFactory } from '../nodes/controlPanel';
import { displayJsonFactory } from '../nodes/displayJson';
import { imageHistogramFactory } from '../nodes/imageHistogram';
import { NodeName } from '../types/nodes';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  register = {
    [NodeName.controlPanel]: controlPanelFactory.register,
    [NodeName.displayJson]: displayJsonFactory.register,
    [NodeName.imageHistogram]: imageHistogramFactory.register,
  };
}
