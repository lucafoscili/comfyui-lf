import { SaveImageForCivitAIPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetSetter } from '../types/widgets';
export declare const saveImageForCivitaiFactory: {
    eventHandler: (event: CustomEvent<SaveImageForCivitAIPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetSetter, addW: BaseWidgetCallback) => void;
};
