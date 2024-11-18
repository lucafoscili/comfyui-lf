import { KulDataDataset } from '../types/ketchup-lite/components';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
} from '../types/widgets';
import { CompareFactory } from '../types/widgets/compare';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-compare';
const TYPE = CustomWidgetName.compare;

export const compareFactory: CompareFactory = {
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
      getValue() {
        return {};
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          compare.kulData = (u.parsedJson as KulDataDataset) || {};
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
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

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
