import type { KulDataDataset } from '../types/ketchup-lite/components';
import type { BaseWidgetCallback, CustomWidgetMap, CustomWidgetName, CustomWidgetOptions } from '../types/widgets';
export declare const capitalize: (input: string) => string;
export declare const createDOMWidget: (name: string, type: CustomWidgetName, element: HTMLDivElement, node: NodeType, options?: CustomWidgetOptions) => Widget;
export declare const findWidget: <T extends CustomWidgetName>(node: NodeType, name: T) => CustomWidgetMap[T];
export declare const getApiRoutes: () => import("../types/manager").ComfyAPIs;
export declare const getKulManager: () => import("../types/ketchup-lite/managers/kul-manager/kul-manager-declarations").KulManager;
export declare const getKulThemes: () => KulDataDataset;
export declare const getLFManager: () => import("../managers/manager").LFManager;
export declare const kulManagerExists: () => boolean;
export declare const getWidget: <T extends CustomWidgetName>(node: NodeType, name: T, addW?: BaseWidgetCallback) => CustomWidgetMap[T];
export declare const log: () => (message: string, args?: Record<string, unknown>, severity?: import("../types/manager").LogSeverity) => void;
export declare const splitByLastSpaceBeforeAnyBracket: (input: string) => string;
export declare const unescapeJson: (str: string) => {
    validJson: boolean;
    parsedJson?: Record<string, unknown>;
    unescapedStr: string;
};
