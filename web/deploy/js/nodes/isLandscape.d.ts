import { IsLandscapePayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const isLandscapeFactory: {
    eventHandler: (event: CustomEvent<IsLandscapePayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
