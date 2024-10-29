import { BlurImagesPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type MasonryWidgetSetter } from '../types/widgets';
export declare const blurImagesFactory: {
    eventHandler: (event: CustomEvent<BlurImagesPayload>, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
    register: (setW: MasonryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
};
