import { LoadImagesPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetsSetter } from '../types/widgets';
export declare const loadImagesFactory: {
    eventHandler: (event: CustomEvent<LoadImagesPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
};
