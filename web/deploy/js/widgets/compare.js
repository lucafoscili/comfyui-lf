import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, deserializeValue } from '../utils/common.js';
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
            getValue() { },
            setValue(value) {
                compare.kulData = deserializeValue(value).parsedJson;
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const compare = document.createElement('kul-compare');
        const options = compareFactory.options(compare);
        content.classList.add(compareFactory.cssClasses.content);
        compare.classList.add(compareFactory.cssClasses.compare);
        switch (node.comfyClass) {
            case NodeName.clarityEffect:
                compare.kulShape = 'image';
                break;
        }
        content.appendChild(compare);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
