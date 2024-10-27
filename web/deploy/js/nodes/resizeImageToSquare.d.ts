import { ResizeImageToSquarePayload } from '../types/events';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resizeImageToSquareFactory: {
    eventHandler: (event: CustomEvent<ResizeImageToSquarePayload>, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
};
