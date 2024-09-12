import { MultipleImageResizeForWebPayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const multipleImageResizeForWebFactory: {
    eventHandler: (event: CustomEvent<MultipleImageResizeForWebPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
