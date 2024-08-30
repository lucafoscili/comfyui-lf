import { MultipleImageResizeForWebPayload } from '../types/events';
import { TreeWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const multipleImageResizeForWebFactory: {
    eventHandler: (event: CustomEvent<MultipleImageResizeForWebPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetsSetter, addW: BaseWidgetCallback) => void;
};
