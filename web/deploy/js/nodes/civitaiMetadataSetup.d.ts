import { CivitAIMetadataSetupPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const civitaiMetadataSetupFactory: {
    eventHandler: (event: CustomEvent<CivitAIMetadataSetupPayload>, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.code>) => void;
};
