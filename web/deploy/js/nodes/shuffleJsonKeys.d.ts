import { ShuffleJSONKeysPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const shuffleJsonKeysFactory: {
    eventHandler: (event: CustomEvent<ShuffleJSONKeysPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => void;
};
