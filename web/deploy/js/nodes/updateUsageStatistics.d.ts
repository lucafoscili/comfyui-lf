import { UpdateUsageStatisticsPayload } from '../types/events';
import { type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
export declare const updateUsageStatisticsFactory: {
    eventHandler: (event: CustomEvent<UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => void;
};
