import { DisplayJSONPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetsSetter } from '../types/widgets';
export declare const displayJsonFactory: {
    eventHandler: (event: CustomEvent<DisplayJSONPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetsSetter, addW: BaseWidgetCallback) => void;
};
