declare interface DisplayJSONDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<DisplayJSONPayload>) => void;
  eventName: 'lf-displayjson';
  getCustomWidgets: DisplayJSONWidgetsSetter;
}

declare interface DisplayJSONPayload extends BaseEventPayload {
  json: Record<string, unknown>;
}

declare type DisplayJSONWidgetsSetter = () => {
  KUL_CODE: WidgetCallback;
};
