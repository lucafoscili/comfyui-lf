import { NodeWidgetMap } from '../types/widgets/_common';
export declare const NODE_WIDGET_MAP: NodeWidgetMap;
export declare const onConnectionsChange: (nodeType: NodeType) => Promise<void>;
export declare const onDrawBackground: (nodeType: NodeType) => Promise<void>;
export declare const onNodeCreated: (nodeType: NodeType) => Promise<void>;
export declare const getLogStyle: () => {
    fontFamily: string;
    margin: string;
    maxWidth: string;
    overflow: string;
    padding: string;
    textOverflow: string;
};
