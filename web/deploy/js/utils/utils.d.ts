import type { KulDataDataset } from '../types/ketchup-lite/components';
export declare const capitalize: (input: string) => string;
export declare const createDOMWidget: (name: string, type: CustomWidgetNames, element: HTMLDivElement, node: NodeType, options?: WidgetOptions) => Widget;
export declare const getApiRoutes: () => ComfyAPIs;
export declare const getKulManager: () => import("../types/ketchup-lite/managers/kul-manager/kul-manager-declarations").KulManager;
export declare const getKulThemes: () => KulDataDataset;
export declare const getLFManager: () => import("../managers/manager").LFManager;
export declare const kulManagerExists: () => boolean;
export declare const log: () => (message: string, args?: Record<string, unknown>, severity?: LogSeverity) => void;
