import { CustomWidgetName, } from '../types/widgets/_common.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-compare';
const TYPE = CustomWidgetName.compare;
export const compareFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        compare: `${BASE_CSS_CLASS}__widget`,
    },
    options: (compare) => {
        return {
            hideOnZoom: false,
            getComp() {
                return compare;
            },
            getValue() {
                return {};
            },
            setValue(value) {
                const callback = (_, u) => {
                    compare.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const compare = document.createElement('kul-compare');
        const options = compareFactory.options(compare);
        content.classList.add(compareFactory.cssClasses.content);
        compare.classList.add(compareFactory.cssClasses.compare);
        switch (node.comfyClass) {
            default:
                compare.kulShape = 'image';
                break;
        }
        content.appendChild(compare);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
