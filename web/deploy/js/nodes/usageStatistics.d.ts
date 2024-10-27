import { UpdateUsageStatisticsPayload } from '../types/events';
import { CustomWidgetName, TabBarChartWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
export declare const usageStatisticsFactory: {
    eventHandler: (event: CustomEvent<UpdateUsageStatisticsPayload>, addW: BaseWidgetCallback<CustomWidgetName.tabBarChart>) => void;
    register: (setW: TabBarChartWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tabBarChart>) => void;
};
