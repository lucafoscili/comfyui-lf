import { CompareImagesPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CompareWidgetSetter } from '../types/widgets';
export declare const compareImagesFactory: {
    eventHandler: (event: CustomEvent<CompareImagesPayload>, addW: BaseWidgetCallback<CustomWidgetName.compare>) => void;
    register: (setW: CompareWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.compare>) => void;
};
