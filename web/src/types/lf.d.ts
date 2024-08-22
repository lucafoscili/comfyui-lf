/*-------------------------------------------------------------------*/
/*               E v e n t s    D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

declare interface BaseEventPayload {
  id: string;
}
declare interface DisplayJSONPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}
declare interface LoadImagesPayload extends BaseEventPayload {
  images: Array<string>;
}
declare type EventNames = 'lf-displayjson' | 'lf-loadimages';
declare type EventPayload = DisplayJSONPayload | LoadImagesPayload;
/*-------------------------------------------------------------------*/
/*             M a n a g e r   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/
declare interface Window {
  lfManager: LFManager;
}
declare interface LFManager {
  getDebug: () => boolean;
  log: (message: string) => void;
  toggleDebug: () => boolean;
}
declare interface BaseLFProps {
  isInitialized: boolean;
  payload: NodePayload;
}
declare interface DisplayJSONProps extends BaseLFProps {
  payload: DisplayJSONPayload;
}
declare interface LoadImagesProps extends BaseLFProps {
  payload: LoadImagesPayload;
}
declare type LFProps = DisplayJSONProps | LoadImagesProps;
/*-------------------------------------------------------------------*/
/*           D i c t i o n a r y   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/
declare interface NodeDictionary {
  [index: string]: NodeDictionaryEntry;
}
declare interface BaseNodeDictionaryEntry {
  eventCb: EventCallback;
  eventName: EventNames;
  updateCb: UpdateCallback;
}
declare interface DisplayJSONDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<DisplayJSONPayload>) => void;
  eventName: 'lf-displayjson';
}
declare interface LoadImagesDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<LoadImages>) => void;
  eventName: 'lf-loadimages';
  getCustomWidgets: () => {
    IMAGE_PREVIEW_B64(
      node: NodeType,
      name: string,
    ): {
      widget: unknown;
    };
  };
}
declare interface LoadImagesWidget extends HTMLElement {
  refresh: () => void;
}
declare type NodeDictionaryEntry = DisplayJSONDictionaryEntry | LoadImagesDictionaryEntry;
declare type EventCallback = (e: CustomEvent<NodePayload>) => void;
declare type UpdateCallback = (node: NodeType) => void;
declare type NodeNames = 'LF_DisplayJSON' | 'LF_LoadImages';
