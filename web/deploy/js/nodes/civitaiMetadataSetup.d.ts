import { CivitAIMetadataSetupPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetsSetter } from '../types/widgets';
export declare const civitaiMetadataSetupFactory: {
    eventHandler: (event: CustomEvent<CivitAIMetadataSetupPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetsSetter, addW: BaseWidgetCallback) => void;
};
