export declare const createDOMWidget: (name: string, type: string, element: Partial<DOMWidget>, node: NodeType, options?: WidgetOptions) => unknown;
export declare const getNode: (id: string) => any;
export declare const getWidget: (node: NodeType, name: string) => Widget;
export declare const initProps: (event: CustomEvent<ControlPanelPayload>) => any;
export declare const redrawCanvas: () => number;
