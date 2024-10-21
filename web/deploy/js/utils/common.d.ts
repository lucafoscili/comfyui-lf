import { BaseWidgetCallback, ComfyWidgetMap, ComfyWidgetName, CustomWidgetMap, CustomWidgetName, CustomWidgetOptions } from '../types/widgets';
import { LogSeverity } from '../types/manager';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import { KulChart } from '../types/ketchup-lite/components/kul-chart/kul-chart';
import { KulDataDataset } from '../types/ketchup-lite/components';
import { KulList } from '../types/ketchup-lite/components/kul-list/kul-list';
import { KulSwitch } from '../types/ketchup-lite/components/kul-switch/kul-switch';
import { KulComponent, KulComponentName } from '../types/ketchup-lite/types/GenericTypes';
export declare const areJSONEqual: (a: unknown, b: unknown) => boolean;
export declare const capitalize: (input: string) => string;
export declare const createDOMWidget: (name: string, type: CustomWidgetName, element: HTMLDivElement, node: NodeType, options?: CustomWidgetOptions) => Widget;
export declare const deserializeValue: (input: any) => {
    validJson: boolean;
    parsedJson?: {};
    unescapedStr: string;
};
export declare const findWidget: <T extends CustomWidgetName>(node: NodeType, type: T) => CustomWidgetMap[T];
export declare const getApiRoutes: () => import("../types/manager").ComfyAPIs;
export declare const getCustomWidget: <T extends CustomWidgetName>(node: NodeType, type: T, addW?: BaseWidgetCallback) => CustomWidgetMap[T];
export declare const getInput: (node: NodeType, type: ComfyWidgetName | CustomWidgetName) => SlotInfo;
export declare const getKulManager: () => import("../types/ketchup-lite/managers/kul-manager/kul-manager").KulManager;
export declare const getKulThemes: () => KulDataDataset;
export declare const getLFManager: () => import("../managers/manager").LFManager;
export declare const getOutput: (node: NodeType, type: ComfyWidgetName | CustomWidgetName) => SlotInfo;
export declare const getWidget: <T extends ComfyWidgetName>(node: NodeType, type: T) => ComfyWidgetMap[T];
export declare const isButton: (comp: KulComponent<KulComponentName>) => comp is KulButton;
export declare const isChart: (comp: KulComponent<KulComponentName>) => comp is KulChart;
export declare const isList: (comp: KulComponent<KulComponentName>) => comp is KulList;
export declare const isSwitch: (comp: KulComponent<KulComponentName>) => comp is KulSwitch;
export declare const isValidJSON: (value: unknown) => boolean;
export declare const kulManagerExists: () => boolean;
export declare const log: () => (message: string, args?: Record<string, unknown>, severity?: LogSeverity) => void;
export declare const refreshChart: (node: NodeType) => void;
export declare const serializeValue: <T extends {}>(value: T) => string;
export declare const splitByLastSpaceBeforeAnyBracket: (input: string) => string;
