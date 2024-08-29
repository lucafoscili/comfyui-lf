import { controlPanelFactory } from '../nodes/controlPanel.js';
import { displayJsonFactory } from '../nodes/displayJson.js';
import { imageHistogramFactory } from '../nodes/imageHistogram.js';
import { loadImagesFactory } from '../nodes/loadImages.js';
import { NodeName } from '../types/nodes.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        this.eventHandler = {
            [NodeName.displayJson]: displayJsonFactory.eventHandler,
            [NodeName.imageHistogram]: imageHistogramFactory.eventHandler,
            [NodeName.loadImages]: loadImagesFactory.eventHandler,
        };
        this.register = {
            [NodeName.controlPanel]: controlPanelFactory.register,
            [NodeName.displayJson]: displayJsonFactory.register,
            [NodeName.imageHistogram]: imageHistogramFactory.register,
            [NodeName.loadImages]: loadImagesFactory.register,
        };
        this.get = {
            eventHandlers: this.eventHandler,
            registrations: this.register,
        };
    }
}
