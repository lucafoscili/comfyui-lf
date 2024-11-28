import { CodeCSS } from '../types/widgets/code.js';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const codeFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { code } = STATE.get(wrapper);
                switch (code.kulLanguage) {
                    case 'json':
                        return code.kulValue || '{}';
                    default:
                        return code.kulValue || '';
                }
            },
            setValue(value) {
                const { code } = STATE.get(wrapper);
                const callback = (v, u) => {
                    switch (code.kulLanguage) {
                        case 'json':
                            code.kulValue = u.unescapedStr || '{}';
                            break;
                        default:
                            code.kulValue = typeof v === 'string' ? v : '';
                            break;
                    }
                };
                normalizeValue(value, callback, CustomWidgetName.code);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const code = document.createElement(TagName.KulCode);
        content.classList.add(CodeCSS.Content);
        code.classList.add(CodeCSS.Widget);
        switch (node.comfyClass) {
            case NodeName.displayJson:
            case NodeName.displayPrimitiveAsJson:
            case NodeName.shuffleJsonKeys:
            case NodeName.sortJsonKeys:
            case NodeName.stringToJson:
                code.kulLanguage = 'json';
                code.kulValue = '{}';
                break;
            default:
                code.kulLanguage = 'markdown';
                code.kulValue = '';
                break;
        }
        content.appendChild(code);
        wrapper.appendChild(content);
        const options = codeFactory.options(wrapper);
        STATE.set(wrapper, { code, node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.code, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
