/*-------------------------------------------------*/
/*             D e c l a r a t i o n s             */
/*-------------------------------------------------*/
declare interface DisplayJSONPayload {
  id: string;
  json: Record<string, unknown>;
}
declare interface LFManager {
  getDebug: () => boolean;
  log: (message: string) => void;
  toggleDebug: () => boolean;
}
declare interface LFProps {
  isInitialized: boolean;
  json: string;
}
declare interface NodeDictionary {
  [index: string]: NodeDictionaryEntry;
}
declare interface NodeDictionaryEntry {
  eventCb: (e: CustomEvent<EventPayloads>) => void;
  eventName: EventNames;
  updateCb: (node: NodeType) => void;
  widgets: Array<unknown>;
}
declare interface Window {
  lfManager: LFManager;
}

declare module '../helpers/displayJson' {
  export function DisplayJSONAdapter(): NodeDictionaryEntry;
}

declare type EventNames = 'lf-displayjson';
declare type EventPayloads = DisplayJSONPayload;
