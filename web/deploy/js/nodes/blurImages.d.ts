import { BlurImagesPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const blurImagesFactory: {
    eventHandler: (event: CustomEvent<BlurImagesPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
};
