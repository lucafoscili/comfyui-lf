import { CustomWidgetName } from './widgets';
export declare enum NodeName {
    blurImages = "LF_BlurImages",
    boolean = "LF_Boolean",
    controlPanel = "LF_ControlPanel",
    displayJson = "LF_DisplayJSON",
    float = "LF_Float",
    imageHistogram = "LF_ImageHistogram",
    integer = "LF_Integer",
    llmChat = "LF_LLMChat",
    loadImages = "LF_LoadImages",
    multipleImageResizeForWeb = "LF_MultipleImageResizeForWeb",
    imageResizeByEdge = "LF_ImageResizeByEdge",
    string = "LF_String",
    switchImage = "LF_SwitchImage",
    switchInteger = "LF_SwitchInteger",
    switchJson = "LF_SwitchJSON",
    switchString = "LF_SwitchString",
    writeJson = "LF_WriteJSON"
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
