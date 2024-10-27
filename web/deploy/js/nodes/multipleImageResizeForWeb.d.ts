import { MultipleImageResizeForWebPayload } from '../types/events';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const multipleImageResizeForWebFactory: {
    eventHandler: (event: CustomEvent<MultipleImageResizeForWebPayload>, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
};
