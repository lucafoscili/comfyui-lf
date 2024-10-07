import { UpdateUsageStatisticsPayload } from '../types/events';
import { TabBarChartWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const usageStatisticsFactory: {
    eventHandler: (event: CustomEvent<UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TabBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
};
