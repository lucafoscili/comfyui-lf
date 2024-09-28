import { CheckpointSelectorPayload } from '../types/events';
import { type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
export declare const checkpointSelectorFactory: {
    eventHandler: (event: CustomEvent<CheckpointSelectorPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback) => void;
};
