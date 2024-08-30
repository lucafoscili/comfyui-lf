import { ImageResizeByEdgePayload } from '../types/events';
import { TreeWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const imageResizeByEdgeFactory: {
    eventHandler: (event: CustomEvent<ImageResizeByEdgePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetsSetter, addW: BaseWidgetCallback) => void;
};
