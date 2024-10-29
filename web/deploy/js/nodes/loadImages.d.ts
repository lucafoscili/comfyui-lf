import { LoadImagesPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type MasonryWidgetSetter } from '../types/widgets';
export declare const loadImagesFactory: {
    eventHandler: (event: CustomEvent<LoadImagesPayload>, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
    register: (setW: MasonryWidgetSetter) => void;
};
