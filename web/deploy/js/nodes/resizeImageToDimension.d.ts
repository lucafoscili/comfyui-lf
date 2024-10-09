import { ResizeImageToDimensionPayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resizeImageToDimensionFactory: {
    eventHandler: (event: CustomEvent<ResizeImageToDimensionPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
