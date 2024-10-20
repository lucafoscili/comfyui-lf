import { KulDataDataset } from '../types/ketchup-lite/components';
import { NodeName } from '../types/nodes';
import { CompareWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, deserializeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-compare';
const TYPE = CustomWidgetName.compare;

export const compareFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    compare: `${BASE_CSS_CLASS}__widget`,
  },
  options: (compare: HTMLKulCompareElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return compare;
      },
      getValue() {},
      setValue(value) {
        compare.kulData = deserializeValue(value).parsedJson as KulDataDataset;
      },
    } as CompareWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
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
