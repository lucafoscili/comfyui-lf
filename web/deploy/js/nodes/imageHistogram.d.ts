import { ImageHistogramPayload } from '../types/events';
import { type BaseWidgetCallback, type ChartWidgetsSetter } from '../types/widgets';
export declare const imageHistogramFactory: {
    eventHandler: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => void;
    register: (setW: ChartWidgetsSetter, addW: BaseWidgetCallback, resizeHandlerW: (node: NodeType) => void) => void;
};
