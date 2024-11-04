import { NodeWidgetMap } from '../types/nodes';
export declare const NODE_WIDGET_MAP: NodeWidgetMap;
export declare const onConnectionsChange: (nodeType: NodeType) => Promise<void>;
export declare const onDrawBackground: (nodeType: NodeType) => Promise<void>;
export declare const onNodeCreated: (nodeType: NodeType) => Promise<void>;
