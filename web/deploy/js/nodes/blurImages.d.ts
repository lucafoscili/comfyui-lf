import { BlurImagesPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetsSetter } from '../types/widgets';
export declare const blurImagesFactory: {
    eventHandler: (event: CustomEvent<BlurImagesPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
};
