import { SaveImageForCivitAIPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type MasonryWidgetSetter } from '../types/widgets';
export declare const saveImageForCivitaiFactory: {
    eventHandler: (event: CustomEvent<SaveImageForCivitAIPayload>, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
    register: (setW: MasonryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
};
