import { KulDataDataset } from '../ketchup-lite/components';
import { KulMasonry } from '../ketchup-lite/components/kul-masonry/kul-masonry';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from '../widgets';
export interface Masonry extends Widget {
    options: MasonryOptions;
    type: [CustomWidgetName.masonry];
}
export interface MasonryFactory extends BaseWidgetFactory<MasonryOptions> {
    options: MasonryOptionsCallback;
}
export type MasonryOptionsCallback = (masonry: HTMLKulMasonryElement) => MasonryOptions;
export interface MasonryOptions extends BaseWidgetOptions<MasonryDeserializedValue> {
    getComp(): HTMLKulMasonryElement;
}
export type MasonrySetter = () => {
    [CustomWidgetName.masonry]: BaseWidgetCallback<CustomWidgetName.masonry>;
};
export interface MasonryDeserializedValue {
    columns?: KulMasonry['kulColumns'];
    dataset: KulDataDataset;
    index?: number;
    name?: string;
    view?: KulMasonry['kulView'];
}
