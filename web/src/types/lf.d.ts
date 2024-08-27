/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/
declare interface DOMWidget extends HTMLDivElement {
  refresh: () => void;
}
declare interface BaseLFProps {
  isInitialized: boolean;
  payload: NodePayload;
}
declare interface BaseWidgetOptions {
  refresh: () => void;
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
declare type EventCallback = (e: CustomEvent<NodePayload>) => void;
declare type UpdateCallback = (node: NodeType) => void;
declare interface Extension extends Partial<BaseNodeDictionaryEntry> {
  name: string;
}

/*-------------------------------------------------------------------*/
/*                    C o n t r o l   P a n e l                      */
/*-------------------------------------------------------------------*/
declare interface ControlPanelDictionary {
  eventName: EventNames;
  nodeName: NodeNames;
  cssName: string;
  widgetName: string;
  extension?: ControlPanelExtension;
}
declare interface ControlPanelExtension {
  beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
  getCustomWidgets: ControlPanelWidgets;
  name: string;
}
declare type ControlPanelWidgetsSetter = () => {
  KUL_CONTROL_PANEL: ControlPanelWidgetCallback;
};
declare type ControlPanelWidgetCallback = (
  node: Partial<NodeType>,
  name: string,
) => { widget: Widget };
