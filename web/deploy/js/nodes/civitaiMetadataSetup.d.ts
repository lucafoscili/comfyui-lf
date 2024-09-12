import { CivitAIMetadataSetupPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const civitaiMetadataSetupFactory: {
    eventHandler: (event: CustomEvent<CivitAIMetadataSetupPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => void;
};
