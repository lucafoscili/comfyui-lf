import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, deserializeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-tree';
const TYPE = CustomWidgetName.tree;
export const treeFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        tree: `${BASE_CSS_CLASS}__widget`,
    },
    options: (tree) => {
        return {
            hideOnZoom: true,
            getComp() {
                return tree;
            },
            getValue() {
                return '';
            },
            setValue(value) {
                try {
                    if (typeof value === 'string') {
                        tree.kulData = deserializeValue(value).parsedJson;
                    }
                    else {
                        tree.kulData = value;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, tree }, LogSeverity.Error);
                    tree.kulData = null;
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const tree = document.createElement('kul-tree');
        const options = treeFactory.options(tree);
        content.classList.add(treeFactory.cssClasses.content);
        tree.classList.add(treeFactory.cssClasses.tree);
        content.appendChild(tree);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
