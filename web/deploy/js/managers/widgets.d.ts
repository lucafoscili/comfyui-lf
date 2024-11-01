import { CardWidget, CustomWidgetName, CustomWidgetOptionsCallbacksMap } from '../types/widgets.js';
import { NodeName } from '../types/nodes.js';
import { CardPayload, WidgetPayloadMap } from '../types/events.js';
export declare class LFWidgets {
    constructor();
    decorators: {
        card: (payload: CardPayload, widget: CardWidget) => void;
    };
    option: {
        [K in CustomWidgetName]: CustomWidgetOptionsCallbacksMap<K>;
    };
    set: {
        KUL_CARD: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_CARDS_WITH_CHIP: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_CHAT: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_CHIP: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_CODE: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_COMPARE: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_CONTROL_PANEL: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_COUNT_BAR_CHART: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_HISTORY: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_MASONRY: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_MESSENGER: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_PROGRESSBAR: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_TAB_BAR_CHART: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_TEXTAREA: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_TREE: (nodeType: NodeType) => {
            widget: Widget;
        };
        KUL_UPLOAD: (nodeType: NodeType) => {
            widget: Widget;
        };
    };
    onEvent: <N extends NodeName, W extends CustomWidgetName>(name: N, event: CustomEvent<WidgetPayloadMap[W]>, widgets: Array<W>) => void;
}
