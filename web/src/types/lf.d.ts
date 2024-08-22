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
  file_names: Array<string>;
  images: Array<string>;
}
declare interface SwitchImagePayload extends BaseEventPayload {
  bool: boolean;
}
declare interface SwitchIntegerPayload extends BaseEventPayload {
  bool: boolean;
}
declare interface SwitchJSONPayload extends BaseEventPayload {
  bool: boolean;
}
declare interface SwitchStringPayload extends BaseEventPayload {
  bool: boolean;
}
declare type EventNames =
  | 'lf-displayjson'
  | 'lf-loadimages'
  | 'lf-switchimage'
  | 'lf-switchinteger'
  | 'lf-switchjson'
  | 'lf-switchstring';
declare type EventPayload =
  | DisplayJSONPayload
  | LoadImagesPayload
  | SwitchImagePayload
  | SwitchIntegerPayload
  | SwitchJSONPayload
  | SwitchStringPayload;
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
declare interface SwitchImageProps extends BaseLFProps {
  payload: SwitchImagePayload;
}
declare interface SwitchIntegerProps extends BaseLFProps {
  payload: SwitchIntegerPayload;
}
declare interface SwitchJSONProps extends BaseLFProps {
  payload: SwitchJSONPayload;
}
declare interface SwitchStringProps extends BaseLFProps {
  payload: SwitchStringPayload;
}
declare type LFProps =
  | DisplayJSONProps
  | LoadImagesProps
  | SwitchImageProps
  | SwitchIntegerProps
  | SwitchJSONProps
  | SwitchStringProps;
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
declare interface SwitchImageDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<SwitchImagePayload>) => void;
  eventName: 'lf-switchimage';
}
declare interface SwitchIntegerDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<SwitchIntegerPayload>) => void;
  eventName: 'lf-switchinteger';
}
declare interface SwitchJSONDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<SwitchJSONPayload>) => void;
  eventName: 'lf-switchjson';
}
declare interface SwitchStringDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<SwitchStringPayload>) => void;
  eventName: 'lf-switchstring';
}
declare interface LoadImagesWidget extends HTMLElement {
  refresh: () => void;
}
declare type NodeDictionaryEntry =
  | DisplayJSONDictionaryEntry
  | LoadImagesDictionaryEntry
  | SwitchImageDictionaryEntry
  | SwitchIntegerDictionaryEntry
  | SwitchJSONDictionaryEntry
  | SwitchStringDictionaryEntry;
declare type EventCallback = (e: CustomEvent<NodePayload>) => void;
declare type UpdateCallback = (node: NodeType) => void;
