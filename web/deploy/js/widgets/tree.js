import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { TreeCSS } from '../types/widgets/tree.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
//#region Tree
export const treeFactory = {
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
                normalizeValue(value, callback, CustomWidgetName.tree);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const tree = document.createElement(TagName.KulTree);
        const options = treeFactory.options(tree);
        switch (node.comfyClass) {
            case NodeName.isLandscape:
                tree.kulAccordionLayout = false;
                tree.kulSelectable = false;
                break;
            default:
                tree.kulAccordionLayout = true;
                tree.kulSelectable = false;
                break;
        }
        content.classList.add(TreeCSS.Content);
        tree.classList.add(TreeCSS.Widget);
        content.appendChild(tree);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(CustomWidgetName.tree, wrapper, node, options) };
    },
};
//#endregion
