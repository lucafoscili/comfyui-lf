import { CustomWidgetName, type BaseWidgetCallback, type ControlPanelWidgetSetter } from '../types/widgets';
export declare const controlPanelFactory: {
    register: (setW: ControlPanelWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.controlPanel>) => void;
};
