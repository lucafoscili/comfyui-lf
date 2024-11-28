import { CustomWidgetName } from '../widgets/widgets';
type AtLeastOne<T, U = {
    [K in keyof T]: Pick<T, K>;
}> = Partial<T> & U[keyof U];
export type CustomWidgetGetter = Record<CustomWidgetName, Function>;
export interface Extension {
    beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
    getCustomWidgets?: () => AtLeastOne<Partial<CustomWidgetGetter>>;
    name: string;
    nodeCreated?: (node: NodeType) => void;
}
export type ExtensionCallback = (node: NodeType) => void;
export declare enum LogSeverity {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error"
}
export type TooltipUploadCallback = (b64image: string) => void;
export type TooltipCallbacks = TooltipUploadCallback;
export type TooltipLayouts = 'upload';
export {};
