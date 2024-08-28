declare interface ControlPanelWidgetOptions {
  getValue(): ControlPanelWidgetValue;
  setValue(value: ControlPanelWidgetValue): void;
}

declare interface ControlPanelWidgetValue {
  debug: boolean;
  themes: string;
}

declare type ControlPanelWidgetsSetter = () => {
  KUL_CONTROL_PANEL: WidgetCallback;
};
