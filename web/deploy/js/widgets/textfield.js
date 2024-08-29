import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-textfield';
const LABEL = 'True or False?';
const TYPE = CustomWidgetName.textfield;
export const textfieldFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
    },
    options: (textfield) => {
        return {
            hideOnZoom: false,
            getComp() {
                return textfield;
            },
            getValue() {
                return textfield?.kulLabel;
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        textfield[prop] = prop;
                    }
                }
            },
            setValue(value) {
                const isFalse = value?.toLowerCase()?.includes('false');
                const isTrue = value?.toLowerCase()?.includes('true');
                if (isTrue) {
                    textfield.classList.add('kul-success');
                    textfield.kulIcon = 'check';
                    textfield.kulLabel = 'True!';
                }
                else if (isFalse) {
                    textfield.classList.add('kul-danger');
                    textfield.kulIcon = 'clear';
                    textfield.kulLabel = 'False!';
                }
                else {
                    textfield.classList.remove('kul-danger');
                    textfield.classList.remove('kul-success');
                    textfield.kulIcon = '';
                    textfield.kulLabel = LABEL;
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const textfield = document.createElement('kul-textfield');
        const options = textfieldFactory.options(textfield);
        content.classList.add(textfieldFactory.cssClasses.content);
        textfield.kulDisabled = true;
        textfield.kulLabel = LABEL;
        content.appendChild(textfield);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
