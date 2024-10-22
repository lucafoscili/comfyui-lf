import { CompareImagesPayload } from '../types/events';
import { type BaseWidgetCallback, type CompareWidgetSetter } from '../types/widgets';
export declare const compareImagesFactory: {
    eventHandler: (event: CustomEvent<CompareImagesPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CompareWidgetSetter, addW: BaseWidgetCallback) => void;
};
