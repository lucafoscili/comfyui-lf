import { CustomWidgetName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
import { CarouselCSS, } from './../types/widgets/carousel.js';
const STATE = new WeakMap();
export const carouselFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: true,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { carousel } = STATE.get(wrapper);
                return carousel?.kulData || {};
            },
            setValue(value) {
                const { carousel } = STATE.get(wrapper);
                const callback = (_, u) => {
                    const dataset = u.parsedJson;
                    carousel.kulData = dataset || {};
                };
                normalizeValue(value, callback, CustomWidgetName.carousel);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const carousel = document.createElement(TagName.KulCarousel);
        carousel.kulAutoPlay = true;
        content.classList.add(CarouselCSS.Content);
        carousel.classList.add(CarouselCSS.Widget);
        content.appendChild(carousel);
        wrapper.appendChild(content);
        const options = carouselFactory.options(wrapper);
        STATE.set(wrapper, { carousel, node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.carousel, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
