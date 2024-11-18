//#region Manager
export type ExtensionCallback = (node: NodeType) => void;
//#endregion
//#region Log
export enum LogSeverity {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}
//#endregion
//#region Tooltip
export type TooltipUploadCallback = (b64image: string) => void;
export type TooltipCallbacks = TooltipUploadCallback;
export type TooltipLayouts = 'upload';
//#endregion
