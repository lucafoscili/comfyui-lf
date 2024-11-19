import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-carousel';
const TYPE = CustomWidgetName.carousel;
//#region Carousel
export const carouselFactory = {
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
                const callback = (_, u) => {
                    const dataset = u.parsedJson;
                    carousel.kulData = dataset || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const carousel = document.createElement(TagName.KulCarousel);
        const options = carouselFactory.options(carousel);
        carousel.kulAutoPlay = true;
        content.classList.add(carouselFactory.cssClasses.content);
        carousel.classList.add(carouselFactory.cssClasses.widget);
        content.appendChild(carousel);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
