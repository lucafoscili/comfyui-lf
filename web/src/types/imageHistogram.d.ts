declare interface ImageHistogramDictionaryEntry extends BaseNodeDictionaryEntry {
  eventCb: (e: CustomEvent<ImageHistogramPayload>) => void;
  eventName: 'lf-imagehistogram';
  getCustomWidgets: ImageHistogramWidgetsSetter;
}

declare interface ImageHistogramPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}

declare type ImageHistogramWidgetsSetter = () => {
  KUL_CHART: WidgetCallback;
};
