import { KeywordCounterPayload } from '../types/events';
import { type BaseWidgetCallback, type CountBarChartWidgetsSetter } from '../types/widgets';
export declare const keywordCounterFactory: {
    eventHandler: (event: CustomEvent<KeywordCounterPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: CountBarChartWidgetsSetter, addW: BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
};
