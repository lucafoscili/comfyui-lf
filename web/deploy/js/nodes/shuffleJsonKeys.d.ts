import { ShuffleJSONKeysPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const shuffleJsonKeysFactory: {
    eventHandler: (event: CustomEvent<ShuffleJSONKeysPayload>, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
};
