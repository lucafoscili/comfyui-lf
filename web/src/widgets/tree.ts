import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { TreeFactory, TreeValueDeserializedValue } from '../types/widgets/tree';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-tree';
const TYPE = CustomWidgetName.tree;

//#region Tree
export const treeFactory: TreeFactory = {
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
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          tree.kulData = (u.parsedJson as TreeValueDeserializedValue) || {};
        };

        normalizeValue(value, callback, TYPE);
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

    content.classList.add(treeFactory.cssClasses.content);
    tree.classList.add(treeFactory.cssClasses.tree);

    content.appendChild(tree);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
