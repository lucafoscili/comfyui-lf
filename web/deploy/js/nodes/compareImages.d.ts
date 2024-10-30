import { BaseDatasetPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CompareWidgetSetter } from '../types/widgets';
export declare const compareImagesFactory: {
    eventHandler: (event: CustomEvent<BaseDatasetPayload>, addW: BaseWidgetCallback<CustomWidgetName.compare>) => void;
    register: (setW: CompareWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.compare>) => void;
};
