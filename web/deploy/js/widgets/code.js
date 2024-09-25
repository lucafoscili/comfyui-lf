import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-code';
const EMPTY = '{ "Wow": "Such empty!" }';
const TYPE = CustomWidgetName.code;
export const codeFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        code: `${BASE_CSS_CLASS}__widget`,
    },
    options: (code) => {
        return {
            hideOnZoom: false,
            getComp() {
                return code;
            },
            getValue() {
                return code.kulValue;
            },
            setValue(value) {
                if (value === '' ||
                    value === null ||
                    value === undefined ||
                    value === '{}' ||
                    !Object.keys(value).length) {
                    code.kulValue = code.kulLanguage === 'json' ? EMPTY : '';
                }
                else {
                    try {
                        if (typeof value === 'string') {
                            code.kulValue = unescapeJson(value).unescapedStr;
                        }
                        else {
                            code.kulValue = JSON.stringify(value);
                        }
                    }
                    catch (error) {
                        getLFManager().log('Error when setting value!', { error, code }, LogSeverity.Error);
                        if (value === undefined || value === '') {
                            code.kulValue = EMPTY;
                        }
                    }
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const code = document.createElement('kul-code');
        const options = codeFactory.options(code);
        content.classList.add(codeFactory.cssClasses.content);
        code.classList.add(codeFactory.cssClasses.code);
        switch (node.comfyClass) {
            case NodeName.displayJson:
            case NodeName.displayPrimitiveAsJson:
                code.kulLanguage = 'json';
                code.kulValue = EMPTY;
                break;
            default:
                code.kulLanguage = 'text';
        }
        content.appendChild(code);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
