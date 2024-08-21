export declare const DisplayJSONAdapter: () => {
    eventCb: (event: CustomEvent<DisplayJSONPayload>) => void;
    eventName: "lf-displayjson";
    updateCb: (node: NodeType) => void;
    widgets: unknown[];
};
