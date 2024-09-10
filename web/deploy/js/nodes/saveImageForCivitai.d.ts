import { SaveImageForCivitAIPayload } from '../types/events';
import { type BaseWidgetCallback, type ImagePreviewWidgetsSetter } from '../types/widgets';
export declare const saveImageForCivitaiFactory: {
    eventHandler: (event: CustomEvent<SaveImageForCivitAIPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ImagePreviewWidgetsSetter, addW: BaseWidgetCallback) => void;
};
