/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/
declare type LFProps =
  | ControlPanelProps
  | DisplayJSONProps
  | ImageHistogramProps
  | LoadImagesProps
  | SwitchImageProps
  | SwitchIntegerProps
  | SwitchJSONProps
  | SwitchStringProps;
declare type WidgetOptions = ControlPanelOptions;
/*-------------------------------------------------------------------*/
/*               E v e n t s    D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/
declare type EventNames =
  | 'lf-controlpanel'
  | 'lf-displayjson'
  | 'lf-imagehistogram'
  | 'lf-loadimages'
  | 'lf-switchimage'
  | 'lf-switchinteger'
  | 'lf-switchjson'
  | 'lf-switchstring';
declare type EventPayload =
  | ControlPanelPayload
  | DisplayJSONPayload
  | ImageHistogramPayload
  | LoadImagesPayload
  | SwitchImagePayload
  | SwitchIntegerPayload
  | SwitchJSONPayload
  | SwitchStringPayload;
/*-------------------------------------------------------------------*/
/*           D i c t i o n a r y   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/
declare type NodeDictionaryEntry =
  | DisplayJSONDictionaryEntry
  | ImageHistogramDictionaryEntry
  | LoadImagesDictionaryEntry
  | SwitchImageDictionaryEntry
  | SwitchIntegerDictionaryEntry
  | SwitchJSONDictionaryEntry
  | SwitchStringDictionaryEntry;
declare type NodeNames =
  | 'LF_ControlPanel'
  | 'LF_DisplayJSON'
  | 'LF_ImageHistogram'
  | 'LF_LoadImages'
  | 'LF_SwitchImage'
  | 'LF_SwitchInteger'
  | 'LF_SwitchJSON'
  | 'LF_SwitchString';
declare interface CustomWidgets {
  KUL_CHART(node: NodeType, name: string): { widget: Partial<Widget> };
  KUL_CODE(node: NodeType, name: string): { widget: Partial<Widget> };
  KUL_CONTROL_PANEL(node: NodeType, name: string): { widget: Partial<Widget> };
  IMAGE_PREVIEW_B64(node: NodeType, name: string): { widget: Partial<Widget> };
}
declare type CustomWidgetNames =
  | 'KUL_CHART'
  | 'KUL_CODE'
  | 'KUL_CONTROL_PANEL'
  | 'IMAGE_PREVIEW_B64';
