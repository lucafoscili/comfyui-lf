import { ResolutionSwitcherPayload } from '../types/events';
import { CustomWidgetName, RollViewerWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const resolutionSwitcherFactory: {
    eventHandler: (event: CustomEvent<ResolutionSwitcherPayload>, addW: BaseWidgetCallback<CustomWidgetName.rollViewer>) => void;
    register: (setW: RollViewerWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.rollViewer>) => void;
};
