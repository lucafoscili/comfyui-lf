import { ImageListFromJSONPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const imageListFromJsonFactory: {
    eventHandler: (event: CustomEvent<ImageListFromJSONPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetSetter) => void;
};
