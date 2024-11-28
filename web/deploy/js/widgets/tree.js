import { TreeCSS, } from '../types/widgets/tree.js';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const treeFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: true,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { tree } = STATE.get(wrapper);
                return tree.kulData || {};
            },
            setValue(value) {
                const { tree } = STATE.get(wrapper);
                const callback = (_, u) => {
                    tree.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, CustomWidgetName.tree);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const tree = document.createElement(TagName.KulTree);
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
        tree.classList.add(TreeCSS.Widget);
        content.classList.add(TreeCSS.Content);
        content.appendChild(tree);
        wrapper.appendChild(content);
        const options = treeFactory.options(wrapper);
        STATE.set(wrapper, { node, tree, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.tree, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
