import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface History extends Widget {
    options: HistoryOptions;
    type: [CustomWidgetName.history];
}
export interface HistoryFactory extends BaseWidgetFactory<HistoryOptions> {
    options: HistoryOptionsCallback;
}
export type HistoryOptionsCallback = (list: HTMLKulListElement) => HistoryOptions;
export interface HistoryOptions extends BaseWidgetOptions<HistoryDeserializedValue> {
    getComp(): HTMLKulListElement;
}
export type HistorySetter = () => {
    [CustomWidgetName.history]: BaseWidgetCallback<CustomWidgetName.history>;
};
export type HistoryDeserializedValue = KulDataDataset;
