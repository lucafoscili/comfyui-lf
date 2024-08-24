/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/
declare interface Window {
  lfManager: LFManager;
}
declare interface DOMWidget extends HTMLDivElement {
  refresh: () => void;
}
declare interface LFManager {
  isDebug: () => boolean;
  log: (message: string, args?: Record<string, unknown>, severity?: LogSeverity) => void;
  toggleDebug: () => boolean;
}
declare interface BaseLFProps {
  isInitialized: boolean;
  payload: NodePayload;
}
declare type LogSeverity = 'info' | 'success' | 'warning' | 'error';
/*-------------------------------------------------------------------*/
/*               E v e n t s    D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/
declare interface BaseEventPayload {
  id: string;
}
/*-------------------------------------------------------------------*/
/*           D i c t i o n a r y   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/
declare interface NodeDictionary {
  [index: string]: NodeDictionaryEntry;
}
declare interface BaseNodeDictionaryEntry {
  beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
  eventCb: EventCallback;
  eventName: EventNames;
  getCustomWidgets?: () => Record<KeyOfCustomWidgets, Function>;
  nodeCreated?: (node) => void;
  updateCb: UpdateCallback;
}
declare interface CustomWidgets {
  IMAGE_PREVIEW_B64;
  KUL_CHART;
  KUL_CODE;
}
declare type KeyOfCustomWidgets = KeyOfExistsIn<BaseNodeDictionaryEntry, CustomWidgets>;
type KeyOfExistsIn<T, U> = {
  [K in keyof T]: K extends keyof U ? K : never;
}[keyof T];
declare type EventCallback = (e: CustomEvent<NodePayload>) => void;
declare type UpdateCallback = (node: NodeType) => void;
declare interface Extension extends Partial<BaseNodeDictionaryEntry> {
  name: string;
}
