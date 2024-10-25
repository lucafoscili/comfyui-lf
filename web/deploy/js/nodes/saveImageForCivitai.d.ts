import { SaveImageForCivitAIPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const saveImageForCivitaiFactory: {
    eventHandler: (event: CustomEvent<SaveImageForCivitAIPayload>, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
    register: (setW: ImagePreviewWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.imagePreview>) => void;
};
