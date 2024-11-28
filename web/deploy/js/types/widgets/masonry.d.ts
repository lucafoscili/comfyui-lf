import { KulDataDataset } from '../../types/ketchup-lite/components';
import { KulMasonry } from '../../types/ketchup-lite/components/kul-masonry/kul-masonry';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum MasonryCSS {
    Content = "lf-masonry",
    Widget = "lf-masonry__widget"
}
export type Masonry = Widget<CustomWidgetName.masonry>;
export type MasonryFactory = WidgetFactory<MasonryDeserializedValue, MasonryState>;
export type MasonryNormalizeCallback = NormalizeValueCallback<MasonryDeserializedValue | string>;
export interface MasonryDeserializedValue {
    columns?: KulMasonry['kulColumns'];
    dataset: KulDataDataset;
    index?: number;
    name?: string;
    view?: KulMasonry['kulView'];
}
export interface MasonryState extends BaseWidgetState {
    masonry: HTMLKulMasonryElement;
    selected: {
        index?: number;
        name?: string;
    };
}
