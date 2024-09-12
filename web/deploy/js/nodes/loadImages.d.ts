import { LoadImagesPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const loadImagesFactory: {
    eventHandler: (event: CustomEvent<LoadImagesPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
};
