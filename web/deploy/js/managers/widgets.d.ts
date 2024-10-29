import { CustomWidgetName, CustomWidgetOptionsCallbacksMap } from '../types/widgets.js';
export declare class LFWidgets {
    #private;
    constructor();
    add: {
        KUL_BOOLEAN_VIEWER: (nodeType: NodeType) => any;
        KUL_CARD: (nodeType: NodeType) => any;
        KUL_CARDS_WITH_CHIP: (nodeType: NodeType) => any;
        KUL_CHAT: (nodeType: NodeType) => any;
        KUL_CHIP: (nodeType: NodeType) => any;
        KUL_CODE: (nodeType: NodeType) => any;
        KUL_COMPARE: (nodeType: NodeType) => any;
        KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
        KUL_COUNT_BAR_CHART: (nodeType: NodeType) => any;
        KUL_HISTORY: (nodeType: NodeType) => any;
        KUL_JSON_INPUT: (nodeType: NodeType) => any;
        KUL_MASONRY: (nodeType: NodeType) => any;
        KUL_MESSENGER: (nodeType: NodeType) => any;
        KUL_ROLL_VIEWER: (nodeType: NodeType) => any;
        KUL_TAB_BAR_CHART: (nodeType: NodeType) => any;
        KUL_TREE: (nodeType: NodeType) => any;
        KUL_UPLOAD: (nodeType: NodeType) => any;
    };
    option: {
        [K in CustomWidgetName]: CustomWidgetOptionsCallbacksMap<K>;
    };
    set: {
        KUL_BOOLEAN_VIEWER: () => {
            KUL_BOOLEAN_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CARD: () => {
            KUL_CARD: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CARDS_WITH_CHIP: () => {
            KUL_CARDS_WITH_CHIP: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CHAT: () => {
            KUL_CHAT: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CHIP: () => {
            KUL_CHIP: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CODE: () => {
            KUL_CODE: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_COMPARE: () => {
            KUL_COMPARE: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CONTROL_PANEL: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_COUNT_BAR_CHART: () => {
            KUL_COUNT_BAR_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_HISTORY: () => {
            KUL_HISTORY: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_JSON_INPUT: () => {
            KUL_JSON_INPUT: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_MASONRY: () => {
            KUL_MASONRY: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_MESSENGER: () => {
            KUL_MESSENGER: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_ROLL_VIEWER: () => {
            KUL_ROLL_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_TAB_BAR_CHART: () => {
            KUL_TAB_BAR_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_TREE: () => {
            KUL_TREE: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_UPLOAD: () => {
            KUL_UPLOAD: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
    };
    get: {
        adders: {
            KUL_BOOLEAN_VIEWER: (nodeType: NodeType) => any;
            KUL_CARD: (nodeType: NodeType) => any;
            KUL_CARDS_WITH_CHIP: (nodeType: NodeType) => any;
            KUL_CHAT: (nodeType: NodeType) => any;
            KUL_CHIP: (nodeType: NodeType) => any;
            KUL_CODE: (nodeType: NodeType) => any;
            KUL_COMPARE: (nodeType: NodeType) => any;
            KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
            KUL_COUNT_BAR_CHART: (nodeType: NodeType) => any;
            KUL_HISTORY: (nodeType: NodeType) => any;
            KUL_JSON_INPUT: (nodeType: NodeType) => any;
            KUL_MASONRY: (nodeType: NodeType) => any;
            KUL_MESSENGER: (nodeType: NodeType) => any;
            KUL_ROLL_VIEWER: (nodeType: NodeType) => any;
            KUL_TAB_BAR_CHART: (nodeType: NodeType) => any;
            KUL_TREE: (nodeType: NodeType) => any;
            KUL_UPLOAD: (nodeType: NodeType) => any;
        };
        options: {
            KUL_BOOLEAN_VIEWER: import("../types/widgets.js").BooleanViewerWidgetOptionsCallback;
            KUL_CARD: import("../types/widgets.js").CardWidgetOptionsCallback;
            KUL_CARDS_WITH_CHIP: import("../types/widgets.js").CardsWithChipWidgetOptionsCallback;
            KUL_CHAT: import("../types/widgets.js").ChatWidgetOptionsCallback;
            KUL_CHIP: import("../types/widgets.js").ChipWidgetOptionsCallback;
            KUL_CODE: import("../types/widgets.js").CodeWidgetOptionsCallback;
            KUL_COMPARE: import("../types/widgets.js").CompareWidgetOptionsCallback;
            KUL_CONTROL_PANEL: import("../types/widgets.js").ControlPanelWidgetOptionsCallback;
            KUL_COUNT_BAR_CHART: import("../types/widgets.js").CountBarChartWidgetOptionsCallback;
            KUL_HISTORY: import("../types/widgets.js").HistoryWidgetOptionsCallback;
            KUL_JSON_INPUT: import("../types/widgets.js").JsonInputWidgetOptionsCallback;
            KUL_MASONRY: import("../types/widgets.js").MasonryWidgetOptionsCallback;
            KUL_MESSENGER: import("../types/widgets.js").MessengerWidgetOptionsCallback;
            KUL_ROLL_VIEWER: import("../types/widgets.js").RollViewerWidgetOptionsCallback;
            KUL_TAB_BAR_CHART: import("../types/widgets.js").TabBarChartWidgetOptionsCallback;
            KUL_TREE: import("../types/widgets.js").TreeWidgetOptionsCallback;
            KUL_UPLOAD: import("../types/widgets.js").UploadWidgetOptionsCallback;
        };
        setters: {
            KUL_BOOLEAN_VIEWER: () => {
                KUL_BOOLEAN_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CARD: () => {
                KUL_CARD: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CARDS_WITH_CHIP: () => {
                KUL_CARDS_WITH_CHIP: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CHAT: () => {
                KUL_CHAT: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CHIP: () => {
                KUL_CHIP: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CODE: () => {
                KUL_CODE: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_COMPARE: () => {
                KUL_COMPARE: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CONTROL_PANEL: () => {
                KUL_CONTROL_PANEL: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_COUNT_BAR_CHART: () => {
                KUL_COUNT_BAR_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_HISTORY: () => {
                KUL_HISTORY: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_JSON_INPUT: () => {
                KUL_JSON_INPUT: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_MASONRY: () => {
                KUL_MASONRY: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_MESSENGER: () => {
                KUL_MESSENGER: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_ROLL_VIEWER: () => {
                KUL_ROLL_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_TAB_BAR_CHART: () => {
                KUL_TAB_BAR_CHART: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_TREE: () => {
                KUL_TREE: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_UPLOAD: () => {
                KUL_UPLOAD: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
        };
    };
}
