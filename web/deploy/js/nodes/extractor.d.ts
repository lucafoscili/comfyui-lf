import { ExtractorPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const extractorFactory: {
    eventHandler: (event: CustomEvent<ExtractorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter) => void;
};
