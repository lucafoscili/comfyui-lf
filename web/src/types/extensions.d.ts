/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/
declare interface ControlPanelProps extends BaseLFProps {
  payload: ControlPanelPayload;
}
declare interface DisplayJSONProps extends BaseLFProps {
  payload: DisplayJSONPayload;
}
declare interface ImageHistogramProps extends BaseLFProps {
  payload: ImageHistogramPayload;
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
/*-------------------------------------------------------------------*/
/*               E v e n t s    D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/
declare interface ControlPanelPayload extends BaseEventPayload {
  isDebug: boolean;
}
declare interface DisplayJSONPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}
declare interface ImageHistogramPayload extends BaseEventPayload {
  dataset: KulDataDataset;
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
/*-------------------------------------------------------------------*/
/*           D i c t i o n a r y   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/
interface NodeDictionary {
  controlPanel: ControlPanelDictionaryEntry;
  displayJson: DisplayJSONDictionaryEntry;
  imageHistogram: ImageHistogramDictionaryEntry;
  loadImages: LoadImagesDictionaryEntry;
  switchImage: SwitchImageDictionaryEntry;
  switchInteger: SwitchIntegerDictionaryEntry;
  switchJson: SwitchJSONDictionaryEntry;
  switchString: SwitchStringDictionaryEntry;
}
declare interface ControlPanelDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<ControlPanelPayload>) => void;
  eventName: 'lf-controlpanel';
  getCustomWidgets: () => {
    KUL_BUTTON(
      node: NodeType,
      name: string,
    ): {
      widget: Partial<Widget>;
    };
  };
}
declare interface DisplayJSONDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<DisplayJSONPayload>) => void;
  eventName: 'lf-displayjson';
  getCustomWidgets: () => {
    KUL_CODE(
      node: NodeType,
      name: string,
    ): {
      widget: Partial<Widget>;
    };
  };
}
declare interface ImageHistogramDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<ImageHistogramPayload>) => void;
  eventName: 'lf-imagehistogram';
  getCustomWidgets: () => {
    KUL_CHART(
      node: NodeType,
      name: string,
    ): {
      widget: Partial<Widget>;
    };
  };
}
declare interface LoadImagesDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<LoadImages>) => void;
  eventName: 'lf-loadimages';
  getCustomWidgets: () => {
    IMAGE_PREVIEW_B64(
      node: NodeType,
      name: string,
    ): {
      widget: Partial<Widget>;
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
