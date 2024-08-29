import { controlPanelFactory } from '../nodes/controlPanel.js';
import { displayJsonFactory } from '../nodes/displayJson.js';
import { imageHistogramFactory } from '../nodes/imageHistogram.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        this.register = {
            controlPanel: controlPanelFactory.register,
            displayJson: displayJsonFactory.register,
            imageHistogram: imageHistogramFactory.register,
        };
    }
}
