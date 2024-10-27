import { ImageListFromJSONPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const imageListFromJsonFactory: {
    eventHandler: (event: CustomEvent<ImageListFromJSONPayload>, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
    register: (setW: ImagePreviewWidgetSetter) => void;
};
