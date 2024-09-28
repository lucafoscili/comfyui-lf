import { KulDataDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { CustomWidgetName, TreeWidgetOptions } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

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
      setValue(value: KulDataDataset | string) {
        try {
          if (typeof value === 'string') {
            tree.kulData = unescapeJson(value).parsedJson;
          } else {
            tree.kulData = value;
          }
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

    content.classList.add(treeFactory.cssClasses.content);
    tree.classList.add(treeFactory.cssClasses.tree);

    content.appendChild(tree);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
