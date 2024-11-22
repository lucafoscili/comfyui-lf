import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { CarouselCSS } from '../types/widgets/carousel.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
//#region Carousel
export const carouselFactory = {
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
