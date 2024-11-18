import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
} from '../types/widgets';
import { CarouselDeserializedValue, CarouselFactory } from '../types/widgets/carousel';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-carousel';
const TYPE = CustomWidgetName.carousel;

export const carouselFactory: CarouselFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
  },
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
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const dataset = u.parsedJson as CarouselDeserializedValue;
          carousel.kulData = dataset || {};
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const carousel = document.createElement('kul-carousel');
    const options = carouselFactory.options(carousel);

    carousel.kulAutoPlay = true;

    content.classList.add(carouselFactory.cssClasses.content);
    carousel.classList.add(carouselFactory.cssClasses.widget);

    content.appendChild(carousel);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
