var _LFNodes_NAMES;
import { controlPanelFactory } from '../nodes/controlPanel.js';
import { displayJsonFactory } from '../nodes/displayJson.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        _LFNodes_NAMES.set(this, {
            controlPanel: 'LF_ControlPanel',
            displayJson: 'LF_DisplayJSON',
            imageHistogram: 'LF_ImageHistogram',
            loadImages: 'LF_LoadImages',
            switchImage: 'LF_SwitchImage',
            switchInteger: 'LF_SwitchInteger',
            switchJSON: 'LF_SwitchJSON',
            switchString: 'LF_SwitchString',
        });
        this.register = {
            controlPanel: controlPanelFactory.register,
            displayJson: displayJsonFactory.register,
        };
    }
}
_LFNodes_NAMES = new WeakMap();
