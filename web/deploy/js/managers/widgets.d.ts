import { CustomWidgetName } from '../types/widgets.js';
export declare class LFWidgets {
    #private;
    constructor();
    add: {
        KUL_BOOLEAN_VIEWER: (nodeType: NodeType) => any;
        KUL_CHAT: (nodeType: NodeType) => any;
        KUL_CHIP: (nodeType: NodeType) => any;
        KUL_CODE: (nodeType: NodeType) => any;
        KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
        KUL_COUNT_BAR_CHART: (nodeType: NodeType) => any;
        KUL_HISTOGRAM: (nodeType: NodeType) => any;
        KUL_HISTORY: (nodeType: NodeType) => any;
        KUL_JSON_INPUT: (nodeType: NodeType) => any;
        KUL_IMAGE_PREVIEW_B64: (nodeType: NodeType) => any;
        KUL_ROLL_VIEWER: (nodeType: NodeType) => any;
        KUL_TREE: (nodeType: NodeType) => any;
        KUL_UPLOAD: (nodeType: NodeType) => any;
    };
    option: {
        KUL_BOOLEAN_VIEWER: (booleanViewer: HTMLKulTextfieldElement) => import("../types/widgets.js").BooleanViewerWidgetOptions;
        KUL_CHAT: (chat: HTMLKulChatElement) => import("../types/widgets.js").ChatWidgetOptions;
        KUL_CHIP: (chip: HTMLKulChipElement) => import("../types/widgets.js").ChipWidgetOptions;
        KUL_CODE: (code: HTMLKulCodeElement) => import("../types/widgets.js").CodeWidgetOptions;
        KUL_CONTROL_PANEL: () => import("../types/widgets.js").ControlPanelWidgetOptions;
        KUL_COUNT_BAR_CHART: (chart: HTMLKulChartElement, chip: HTMLKulChipElement, button: HTMLKulButtonElement) => import("../types/widgets.js").CountBarChartWidgetOptions;
        KUL_HISTOGRAM: (histogram: HTMLKulChartElement) => import("../types/widgets.js").HistogramWidgetOptions;
        KUL_HISTORY: (history: HTMLKulListElement) => import("../types/widgets.js").HistoryWidgetOptions;
        KUL_JSON_INPUT: (content: HTMLTextAreaElement) => import("../types/widgets.js").JsonInputWidgetOptions;
        KUL_IMAGE_PREVIEW_B64: (content: HTMLDivElement, isSelectable: boolean) => import("../types/widgets.js").ImagePreviewWidgetOptions;
        KUL_ROLL_VIEWER: (rollViewer: HTMLKulProgressbarElement) => import("../types/widgets.js").RollViewerWidgetOptions;
        KUL_TREE: (tree: HTMLKulTreeElement) => import("../types/widgets.js").TreeWidgetOptions;
        KUL_UPLOAD: (upload: HTMLKulUploadElement) => import("../types/widgets.js").UploadWidgetOptions;
    };
    set: {
        KUL_BOOLEAN_VIEWER: () => {
            KUL_BOOLEAN_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_CHAT: () => {
            KUL_CHAT: (nodeType: NodeType, name: CustomWidgetName) => any;
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
        KUL_HISTOGRAM: () => {
            KUL_HISTOGRAM: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_HISTORY: () => {
            KUL_HISTORY: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_JSON_INPUT: () => {
            KUL_JSON_INPUT: (nodeType: NodeType, name: CustomWidgetName) => any;
        };
        KUL_IMAGE_PREVIEW_B64: () => {
            KUL_IMAGE_PREVIEW_B64: (nodeType: NodeType, name: CustomWidgetName) => {
                widget: Widget;
            };
        };
        KUL_ROLL_VIEWER: () => {
            KUL_ROLL_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
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
            KUL_CHAT: (nodeType: NodeType) => any;
            KUL_CHIP: (nodeType: NodeType) => any;
            KUL_CODE: (nodeType: NodeType) => any;
            KUL_CONTROL_PANEL: (nodeType: NodeType) => any;
            KUL_COUNT_BAR_CHART: (nodeType: NodeType) => any;
            KUL_HISTOGRAM: (nodeType: NodeType) => any;
            KUL_HISTORY: (nodeType: NodeType) => any;
            KUL_JSON_INPUT: (nodeType: NodeType) => any;
            KUL_IMAGE_PREVIEW_B64: (nodeType: NodeType) => any;
            KUL_ROLL_VIEWER: (nodeType: NodeType) => any;
            KUL_TREE: (nodeType: NodeType) => any;
            KUL_UPLOAD: (nodeType: NodeType) => any;
        };
        options: {
            KUL_BOOLEAN_VIEWER: (booleanViewer: HTMLKulTextfieldElement) => import("../types/widgets.js").BooleanViewerWidgetOptions;
            KUL_CHAT: (chat: HTMLKulChatElement) => import("../types/widgets.js").ChatWidgetOptions;
            KUL_CHIP: (chip: HTMLKulChipElement) => import("../types/widgets.js").ChipWidgetOptions;
            KUL_CODE: (code: HTMLKulCodeElement) => import("../types/widgets.js").CodeWidgetOptions;
            KUL_CONTROL_PANEL: () => import("../types/widgets.js").ControlPanelWidgetOptions;
            KUL_COUNT_BAR_CHART: (chart: HTMLKulChartElement, chip: HTMLKulChipElement, button: HTMLKulButtonElement) => import("../types/widgets.js").CountBarChartWidgetOptions;
            KUL_HISTOGRAM: (histogram: HTMLKulChartElement) => import("../types/widgets.js").HistogramWidgetOptions;
            KUL_HISTORY: (history: HTMLKulListElement) => import("../types/widgets.js").HistoryWidgetOptions;
            KUL_JSON_INPUT: (content: HTMLTextAreaElement) => import("../types/widgets.js").JsonInputWidgetOptions;
            KUL_IMAGE_PREVIEW_B64: (content: HTMLDivElement, isSelectable: boolean) => import("../types/widgets.js").ImagePreviewWidgetOptions;
            KUL_ROLL_VIEWER: (rollViewer: HTMLKulProgressbarElement) => import("../types/widgets.js").RollViewerWidgetOptions;
            KUL_TREE: (tree: HTMLKulTreeElement) => import("../types/widgets.js").TreeWidgetOptions;
            KUL_UPLOAD: (upload: HTMLKulUploadElement) => import("../types/widgets.js").UploadWidgetOptions;
        };
        setters: {
            KUL_BOOLEAN_VIEWER: () => {
                KUL_BOOLEAN_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_CHAT: () => {
                KUL_CHAT: (nodeType: NodeType, name: CustomWidgetName) => any;
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
            KUL_HISTOGRAM: () => {
                KUL_HISTOGRAM: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_HISTORY: () => {
                KUL_HISTORY: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_JSON_INPUT: () => {
                KUL_JSON_INPUT: (nodeType: NodeType, name: CustomWidgetName) => any;
            };
            KUL_IMAGE_PREVIEW_B64: () => {
                KUL_IMAGE_PREVIEW_B64: (nodeType: NodeType, name: CustomWidgetName) => {
                    widget: Widget;
                };
            };
            KUL_ROLL_VIEWER: () => {
                KUL_ROLL_VIEWER: (nodeType: NodeType, name: CustomWidgetName) => {
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
