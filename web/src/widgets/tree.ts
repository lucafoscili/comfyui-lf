import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { TreeCSS, TreeFactory, TreeValueDeserializedValue } from '../types/widgets/tree';
import { createDOMWidget, normalizeValue } from '../utils/common';

//#region Tree
export const treeFactory: TreeFactory = {
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
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.tree> | string
        > = (_, u) => {
          tree.kulData = (u.parsedJson as TreeValueDeserializedValue) || {};
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

    switch (node.comfyClass as NodeName) {
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
