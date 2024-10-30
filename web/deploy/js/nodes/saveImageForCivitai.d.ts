import { BaseDatasetPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type MasonryWidgetSetter } from '../types/widgets';
export declare const saveImageForCivitaiFactory: {
    eventHandler: (event: CustomEvent<BaseDatasetPayload>, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
    register: (setW: MasonryWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.masonry>) => void;
};
