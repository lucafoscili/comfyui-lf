import { RegionExtractorPayload } from '../types/events';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const regionExtractorFactory: {
    eventHandler: (event: CustomEvent<RegionExtractorPayload>, addW: BaseWidgetCallback<CustomWidgetName.history>) => void;
    register: (setW: HistoryWidgetSetter) => void;
};
