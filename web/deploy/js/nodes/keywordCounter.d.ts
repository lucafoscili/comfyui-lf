import { KeywordCounterPayload } from '../types/events';
import { type BaseWidgetCallback, type CountBarChartWidgetSetter } from '../types/widgets';
export declare const keywordCounterFactory: {
    eventHandler: (event: CustomEvent<KeywordCounterPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CountBarChartWidgetSetter, addW: BaseWidgetCallback) => void;
};
