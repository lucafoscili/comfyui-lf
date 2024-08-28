declare interface ControlPanelExtension extends Extension {
  beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
  getCustomWidgets: ControlPanelWidgets;
}

declare interface ControlPanelPayload extends BaseEventPayload {
  isDebug: boolean;
}

declare interface ControlPanelWidgetOptions {
  getValue(): Promise<ControlPanelWidgetValue>;
  onReady(cb: (isReady: boolean) => HTMLDivElement): void;
  setValue(value: ControlPanelWidgetValue): Promise<void>;
}

declare interface ControlPanelWidgetValue {
  debug: boolean;
  themes: string;
}

declare type ControlPanelWidgetsSetter = () => {
  KUL_CONTROL_PANEL: WidgetCallback;
};
