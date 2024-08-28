import { controlPanelFactory } from '../nodes/controlPanel';
import { displayJsonFactory } from '../nodes/displayJson';
import { getApiRoutes } from '../utils/utils';

/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/

export class LFNodes {
  #NAMES: { [index: string]: NodeNames } = {
    controlPanel: 'LF_ControlPanel',
    displayJson: 'LF_DisplayJSON',
    imageHistogram: 'LF_ImageHistogram',
    loadImages: 'LF_LoadImages',
    switchImage: 'LF_SwitchImage',
    switchInteger: 'LF_SwitchInteger',
    switchJSON: 'LF_SwitchJSON',
    switchString: 'LF_SwitchString',
  };

  constructor() {}

  register = {
    controlPanel: controlPanelFactory.register,
    displayJson: displayJsonFactory.register,
  };
}
