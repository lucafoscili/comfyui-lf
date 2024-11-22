import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { CompareCSS } from '../types/widgets/compare.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
//#region Compare
export const compareFactory = {
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
                normalizeValue(value, callback, CustomWidgetName.compare);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const compare = document.createElement(TagName.KulCompare);
        const options = compareFactory.options(compare);
        content.classList.add(CompareCSS.Content);
        compare.classList.add(CompareCSS.Widget);
        switch (node.comfyClass) {
            default:
                compare.kulShape = 'image';
                break;
        }
        content.appendChild(compare);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(CustomWidgetName.compare, wrapper, node, options) };
    },
};
//#endregion
