import { CheckpointSelectorPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
export declare const checkpointSelectorFactory: {
    eventHandler: (event: CustomEvent<CheckpointSelectorPayload>, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
    register: (setW: CardWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.card>) => void;
};
