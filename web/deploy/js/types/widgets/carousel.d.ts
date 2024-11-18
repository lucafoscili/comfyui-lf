import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from '../widgets';
export interface Carousel extends Widget {
    options: CarouselOptions;
    type: [CustomWidgetName.carousel];
}
export interface CarouselFactory extends BaseWidgetFactory<CarouselOptions> {
    options: CarouselOptionsCallback;
}
export type CarouselOptionsCallback = (masonry: HTMLKulCarouselElement) => CarouselOptions;
export interface CarouselOptions extends BaseWidgetOptions<CarouselDeserializedValue> {
    getComp(): HTMLKulCarouselElement;
}
export type CarouselSetter = () => {
    [CustomWidgetName.carousel]: BaseWidgetCallback<CustomWidgetName.carousel>;
};
export type CarouselDeserializedValue = KulDataDataset;
