import { BlurImagesPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const blurImagesFactory: {
    eventHandler: (event: CustomEvent<BlurImagesPayload>, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
    register: (setW: ImagePreviewWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
};
