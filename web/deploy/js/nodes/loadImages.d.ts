import { LoadImagesPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const loadImagesFactory: {
    eventHandler: (event: CustomEvent<LoadImagesPayload>, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
    register: (setW: ImagePreviewWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
};
