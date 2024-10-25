import { ImageHistogramPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type TabBarChartWidgetSetter } from '../types/widgets';
export declare const imageHistogramFactory: {
    eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback<CustomWidgetName.tabBarChart>) => void;
    register: (setW: TabBarChartWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.tabBarChart>) => void;
};
