import { controlPanelFactory } from '../nodes/controlPanel.js';
import { displayJsonFactory } from '../nodes/displayJson.js';
import { imageHistogramFactory } from '../nodes/imageHistogram.js';
import { NodeName } from '../types/nodes.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        this.register = {
            [NodeName.controlPanel]: controlPanelFactory.register,
            [NodeName.displayJson]: displayJsonFactory.register,
            [NodeName.imageHistogram]: imageHistogramFactory.register,
        };
    }
}
