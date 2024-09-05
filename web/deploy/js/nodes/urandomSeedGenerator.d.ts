import { UrandomSeedGeneratorPayload } from '../types/events';
import { TreeWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const uRandomSeedGeneratorFactory: {
    eventHandler: (event: CustomEvent<UrandomSeedGeneratorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TreeWidgetsSetter, addW: BaseWidgetCallback) => void;
};
