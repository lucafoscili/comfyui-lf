import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-carousel';

//#region Carousel
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
export enum CarouselCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
