import { RandomBooleanPayload } from '../types/events';
import { RollViewerWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const randomBooleanFactory: {
    eventHandler: (event: CustomEvent<RandomBooleanPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: RollViewerWidgetSetter, addW: BaseWidgetCallback) => void;
};
