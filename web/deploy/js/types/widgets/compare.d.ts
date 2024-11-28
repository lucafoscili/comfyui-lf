import { KulDataDataset } from '../../types/ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum CompareCSS {
    Content = "lf-compare",
    Widget = "lf-compare__widget"
}
export type Compare = Widget<CustomWidgetName.compare>;
export type CompareFactory = WidgetFactory<CompareDeserializedValue, CompareState>;
export type CompareNormalizeCallback = NormalizeValueCallback<CompareDeserializedValue | string>;
export type CompareDeserializedValue = KulDataDataset;
export interface CompareState extends BaseWidgetState {
    compare: HTMLKulCompareElement;
}
