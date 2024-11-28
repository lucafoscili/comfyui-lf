import { KulDataDataset } from '../../types/ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum HistoryCSS {
    Content = "lf-history",
    Widget = "lf-history__widget"
}
export type History = Widget<CustomWidgetName.history>;
export type HistoryFactory = WidgetFactory<HistoryDeserializedValue, HistoryState>;
export type HistoryNormalizeCallback = NormalizeValueCallback<HistoryDeserializedValue | string>;
export type HistoryDeserializedValue = KulDataDataset;
export interface HistoryState extends BaseWidgetState {
    list: HTMLKulListElement;
}
