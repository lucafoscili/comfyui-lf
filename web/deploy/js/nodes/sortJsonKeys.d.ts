import { SortJSONKeysPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const sortJsonKeysFactory: {
    eventHandler: (event: CustomEvent<SortJSONKeysPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => void;
};
