import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
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
                return tree.kulData || {};
            },
            setValue(value) {
                const callback = (_, u) => {
                    tree.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const tree = document.createElement('kul-tree');
        const options = treeFactory.options(tree);
        switch (node.comfyClass) {
            case NodeName.isLandscape:
                tree.kulAccordionLayout = false;
                tree.kulSelectable = false;
                break;
            case NodeName.multipleImageResizeForWeb:
            case NodeName.resizeImageByEdge:
            case NodeName.resizeImageToDimension:
            case NodeName.resizeImageToSquare:
            case NodeName.urandomSeedGenerator:
                tree.kulAccordionLayout = true;
                tree.kulSelectable = false;
                break;
        }
        content.classList.add(treeFactory.cssClasses.content);
        tree.classList.add(treeFactory.cssClasses.tree);
        content.appendChild(tree);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
