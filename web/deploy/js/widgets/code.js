import { createDOMWidget, getLFManager, unescapeJson } from '../utils/utils.js';
const BASE_CSS_CLASS = 'lf-code';
const EMPTY = '{ "Wow": "Such empty!" }';
const TYPE = 'KUL_CODE';
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
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        code[prop] = prop;
                    }
                }
            },
            setValue(value) {
                if (value === '' ||
                    value === null ||
                    value === undefined ||
                    value === '{}' ||
                    !Object.keys(value).length) {
                    code.kulValue = EMPTY;
                }
                else {
                    try {
                        if (typeof value === 'string') {
                            code.kulValue = JSON.stringify(unescapeJson(value));
                        }
                        else {
                            code.kulValue = JSON.stringify(value);
                        }
                    }
                    catch (error) {
                        getLFManager().log('Error when setting value!', { error }, 'error');
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
        code.kulLanguage = 'json';
        code.kulValue = EMPTY;
        content.appendChild(code);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
