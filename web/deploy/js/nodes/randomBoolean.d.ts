import { RandomBooleanPayload } from '../types/events';
import { RollViewerWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const randomBooleanFactory: {
    eventHandler: (event: CustomEvent<RandomBooleanPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: RollViewerWidgetsSetter, addW: BaseWidgetCallback) => void;
};
