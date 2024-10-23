import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  TreeWidgetOptions,
  TreeWidgetValuetDeserializedValue,
} from '../types/widgets';
import { createDOMWidget, getLFManager, deserializeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-tree';
const TYPE = CustomWidgetName.tree;

export const treeFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    tree: `${BASE_CSS_CLASS}__widget`,
  },
  options: (tree: HTMLKulTreeElement) => {
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
          tree.kulData = deserializeValue(value).parsedJson as TreeWidgetValuetDeserializedValue;
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, tree }, LogSeverity.Error);
          tree.kulData = null;
        }
      },
    } as TreeWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const tree = document.createElement('kul-tree');
    const options = treeFactory.options(tree);

    switch (node.comfyClass as NodeName) {
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

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
