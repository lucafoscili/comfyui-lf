import { CustomWidgetName } from './widgets';
export declare enum NodeName {
    controlPanel = "LF_ControlPanel",
    displayJson = "LF_DisplayJSON",
    imageHistogram = "LF_ImageHistogram",
    loadImages = "LF_LoadImages",
    switchImage = "LF_SwitchImage",
    switchInteger = "LF_SwitchInteger",
    switchJson = "LF_SwitchJSON",
    switchString = "LF_SwitchString"
}
type AtLeastOne<T, U = {
    [K in keyof T]: Pick<T, K>;
}> = Partial<T> & U[keyof U];
export interface Extension {
    beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
    getCustomWidgets?: () => AtLeastOne<Record<CustomWidgetName, Function>>;
    name: string;
    nodeCreated?: (node: NodeType) => void;
}
export {};
