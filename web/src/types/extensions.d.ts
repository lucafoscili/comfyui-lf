/*-------------------------------------------------------------------*/
/*               E v e n t s    D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/
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
/*-------------------------------------------------------------------*/
/*           D i c t i o n a r y   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/
interface NodeDictionary {
  displayJson: DisplayJSONDictionaryEntry;
  imageHistogram: ImageHistogramDictionaryEntry;
  loadImages: LoadImagesDictionaryEntry;
  switchImage: SwitchImageDictionaryEntry;
  switchInteger: SwitchIntegerDictionaryEntry;
  switchJson: SwitchJSONDictionaryEntry;
  switchString: SwitchStringDictionaryEntry;
}
declare interface LoadImagesDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<LoadImages>) => void;
  eventName: 'lf-loadimages';
  getCustomWidgets: () => {
    IMAGE_PREVIEW_B64(
      node: NodeType,
      name: string,
    ): {
      widget: Widget;
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
