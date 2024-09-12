import { UrandomSeedGeneratorPayload } from '../types/events';
import { TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const uRandomSeedGeneratorFactory: {
    eventHandler: (event: CustomEvent<UrandomSeedGeneratorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => void;
};
