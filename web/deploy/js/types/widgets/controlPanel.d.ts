import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface ControlPanel extends Widget {
    options: ControlPanelOptions;
    type: [CustomWidgetName.controlPanel];
}
export interface ControlPanelFactory extends BaseWidgetFactory<ControlPanelOptions> {
    options: ControlPanelOptionsCallback;
}
export type ControlPanelOptionsCallback = () => ControlPanelOptions;
export interface ControlPanelOptions extends BaseWidgetOptions<ControlPanelDeserializedValue> {
}
export type ControlPanelSetter = () => {
    [CustomWidgetName.controlPanel]: BaseWidgetCallback<CustomWidgetName.controlPanel>;
};
export type ControlPanelDeserializedValue = {
    backup: boolean;
    debug: boolean;
    themes: string;
};
