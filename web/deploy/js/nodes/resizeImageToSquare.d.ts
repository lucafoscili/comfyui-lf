import { ResizeImageToSquarePayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resizeImageToSquareFactory: {
    eventHandler: (event: CustomEvent<ResizeImageToSquarePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
