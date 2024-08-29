import { controlPanelFactory } from '../nodes/controlPanel';
import { displayJsonFactory } from '../nodes/displayJson';
import { imageHistogramFactory } from '../nodes/imageHistogram';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  register = {
    controlPanel: controlPanelFactory.register,
    displayJson: displayJsonFactory.register,
    imageHistogram: imageHistogramFactory.register,
  };
}
