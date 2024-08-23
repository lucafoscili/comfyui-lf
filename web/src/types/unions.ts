/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/
declare type LFProps =
  | DisplayJSONProps
  | ImageHistogramProps
  | LoadImagesProps
  | SwitchImageProps
  | SwitchIntegerProps
  | SwitchJSONProps
  | SwitchStringProps;
/*-------------------------------------------------------------------*/
/*               E v e n t s    D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/
declare type EventNames =
  | 'lf-displayjson'
  | 'lf-imagehistogram'
  | 'lf-loadimages'
  | 'lf-switchimage'
  | 'lf-switchinteger'
  | 'lf-switchjson'
  | 'lf-switchstring';
declare type EventPayload =
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
