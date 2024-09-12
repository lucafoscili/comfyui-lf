import { ResizeImageByEdgePayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resizeImageByEdgeFactory: {
    eventHandler: (event: CustomEvent<ResizeImageByEdgePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
