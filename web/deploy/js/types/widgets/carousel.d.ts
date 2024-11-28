import { KulDataDataset } from '../../types/ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum CarouselCSS {
    Content = "lf-carousel",
    Widget = "lf-carousel__widget"
}
export type Carousel = Widget<CustomWidgetName.carousel>;
export type CarouselFactory = WidgetFactory<CarouselDeserializedValue, CarouselState>;
export type CarouselNormalizeCallback = NormalizeValueCallback<CarouselDeserializedValue | string>;
export type CarouselDeserializedValue = KulDataDataset;
export interface CarouselState extends BaseWidgetState {
    carousel: HTMLKulCarouselElement;
}
