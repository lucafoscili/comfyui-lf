import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-booleanviewer';
const LABEL = 'True or False?';
const TYPE = CustomWidgetName.booleanViewer;
export const booleanViewerFactory = {
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
                return textfield?.kulLabel || '';
            },
            setValue(value) {
                const callback = (v) => {
                    const isFalse = v.toLowerCase().includes('false');
                    const isTrue = v.toLowerCase().includes('true');
                    if (isTrue) {
                        textfield.kulIcon = 'check';
                        textfield.kulLabel = 'True!';
                    }
                    else if (isFalse) {
                        textfield.kulIcon = 'clear';
                        textfield.kulLabel = 'False!';
                    }
                    else {
                        textfield.kulIcon = '';
                        textfield.kulLabel = LABEL;
                    }
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const textfield = document.createElement('kul-textfield');
        const options = booleanViewerFactory.options(textfield);
        content.classList.add(booleanViewerFactory.cssClasses.content);
        textfield.kulDisabled = true;
        textfield.kulLabel = LABEL;
        content.appendChild(textfield);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
