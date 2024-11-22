import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { CarouselCSS, CarouselDeserializedValue, CarouselFactory } from '../types/widgets/carousel';
import { createDOMWidget, normalizeValue } from '../utils/common';

//#region Carousel
export const carouselFactory: CarouselFactory = {
  options: (carousel) => {
    return {
      hideOnZoom: true,
      getComp() {
        return carousel;
      },
      getValue() {
        return carousel?.kulData || {};
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.carousel> | string
        > = (_, u) => {
          const dataset = u.parsedJson as CarouselDeserializedValue;
          carousel.kulData = dataset || {};
        };

        normalizeValue(value, callback, CustomWidgetName.carousel);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const carousel = document.createElement(TagName.KulCarousel);
    const options = carouselFactory.options(carousel);

    carousel.kulAutoPlay = true;

    content.classList.add(CarouselCSS.Content);
    carousel.classList.add(CarouselCSS.Widget);

    content.appendChild(carousel);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(CustomWidgetName.carousel, wrapper, node, options) };
  },
};
//#endregion
