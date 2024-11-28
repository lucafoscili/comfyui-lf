import { CompareCSS, } from '../types/widgets/compare.js';
import { CustomWidgetName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const compareFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { compare } = STATE.get(wrapper);
                return compare.kulData || {};
            },
            setValue(value) {
                const { compare } = STATE.get(wrapper);
                const callback = (_, u) => {
                    compare.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, CustomWidgetName.compare);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const compare = document.createElement(TagName.KulCompare);
        content.classList.add(CompareCSS.Content);
        compare.classList.add(CompareCSS.Widget);
        switch (node.comfyClass) {
            default:
                compare.kulShape = 'image';
                break;
        }
        content.appendChild(compare);
        wrapper.appendChild(content);
        const options = compareFactory.options(wrapper);
        STATE.set(wrapper, { compare, node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.compare, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
