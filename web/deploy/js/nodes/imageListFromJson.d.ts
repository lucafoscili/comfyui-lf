import { ImageListFromJSONPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type MasonryWidgetSetter } from '../types/widgets';
export declare const imageListFromJsonFactory: {
    eventHandler: (event: CustomEvent<ImageListFromJSONPayload>, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
    register: (setW: MasonryWidgetSetter) => void;
};
