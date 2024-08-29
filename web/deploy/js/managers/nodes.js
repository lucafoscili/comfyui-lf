import { NodeName } from '../types/nodes.js';
import { controlPanelFactory } from '../nodes/controlPanel.js';
import { displayJsonFactory } from '../nodes/displayJson.js';
import { imageHistogramFactory } from '../nodes/imageHistogram.js';
import { loadImagesFactory } from '../nodes/loadImages.js';
import { switchImageFactory } from '../nodes/switchImage.js';
import { switchIntegerFactory } from '../nodes/switchInteger.js';
import { switchJsonFactory } from '../nodes/switchJson.js';
import { switchStringFactory } from '../nodes/switchString.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        this.eventHandler = {
            [NodeName.displayJson]: displayJsonFactory.eventHandler,
            [NodeName.imageHistogram]: imageHistogramFactory.eventHandler,
            [NodeName.loadImages]: loadImagesFactory.eventHandler,
            [NodeName.switchImage]: switchImageFactory.eventHandler,
            [NodeName.switchInteger]: switchIntegerFactory.eventHandler,
            [NodeName.switchJson]: switchJsonFactory.eventHandler,
            [NodeName.switchString]: switchStringFactory.eventHandler,
        };
        this.register = {
            [NodeName.controlPanel]: controlPanelFactory.register,
            [NodeName.displayJson]: displayJsonFactory.register,
            [NodeName.imageHistogram]: imageHistogramFactory.register,
            [NodeName.loadImages]: loadImagesFactory.register,
            [NodeName.switchImage]: switchImageFactory.register,
            [NodeName.switchInteger]: switchIntegerFactory.register,
            [NodeName.switchJson]: switchJsonFactory.register,
            [NodeName.switchString]: switchStringFactory.register,
        };
        this.get = {
            eventHandlers: this.eventHandler,
            registrations: this.register,
        };
    }
}
