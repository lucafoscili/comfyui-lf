import { KulDataDataset } from '../../types/ketchup-lite/components';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-carousel';
export enum CarouselCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
//#region Widget
export type Carousel = Widget<CustomWidgetName.carousel>;
export type CarouselFactory = WidgetFactory<CarouselDeserializedValue, CarouselState>;
export type CarouselNormalizeCallback = NormalizeValueCallback<CarouselDeserializedValue | string>;
//#endregion
//#region Value
export type CarouselDeserializedValue = KulDataDataset;
//#endregion
//#region State
export interface CarouselState extends BaseWidgetState {
  carousel: HTMLKulCarouselElement;
}
//#endregion
