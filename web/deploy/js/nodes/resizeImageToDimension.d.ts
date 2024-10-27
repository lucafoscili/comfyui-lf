import { ResizeImageToDimensionPayload } from '../types/events';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resizeImageToDimensionFactory: {
    eventHandler: (event: CustomEvent<ResizeImageToDimensionPayload>, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
};
