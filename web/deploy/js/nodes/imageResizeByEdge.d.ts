import { ImageResizeByEdgePayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const imageResizeByEdgeFactory: {
    eventHandler: (event: CustomEvent<ImageResizeByEdgePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
