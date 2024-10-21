import { ImageHistogramPayload } from '../types/events';
import { type BaseWidgetCallback, type TabBarChartWidgetSetter } from '../types/widgets';
export declare const imageHistogramFactory: {
    eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: TabBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
};
