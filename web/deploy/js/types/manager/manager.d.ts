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
