export declare const getNode: (event: CustomEvent<ControlPanelPayload>) => NodeType;
export declare const getWidget: (node: NodeType, name: string) => Widget;
export declare const redrawCanvas: () => number;
export declare const refreshWidget: (domWidget: DOMWidget, widgetCb: (props?: BaseLFProps) => HTMLElement) => void;
