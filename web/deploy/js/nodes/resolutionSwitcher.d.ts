import { ResolutionSwitcherPayload } from '../types/events';
import { RollViewerWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resolutionSwitcherFactory: {
    eventHandler: (event: CustomEvent<ResolutionSwitcherPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: RollViewerWidgetSetter, addW: BaseWidgetCallback) => void;
};
