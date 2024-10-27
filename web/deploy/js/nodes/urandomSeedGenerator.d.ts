import { UrandomSeedGeneratorPayload } from '../types/events';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const uRandomSeedGeneratorFactory: {
    eventHandler: (event: CustomEvent<UrandomSeedGeneratorPayload>, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
    register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tree>) => void;
};
