import { KeywordCounterPayload } from '../types/events';
import { CustomWidgetName, type BaseWidgetCallback, type CountBarChartWidgetSetter } from '../types/widgets';
export declare const keywordCounterFactory: {
    eventHandler: (event: CustomEvent<KeywordCounterPayload>, addW: BaseWidgetCallback<CustomWidgetName.countBarChart>) => void;
    register: (setW: CountBarChartWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.countBarChart>) => void;
};
