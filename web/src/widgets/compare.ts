import { KulDataDataset } from '../types/ketchup-lite/components';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { CompareCSS, CompareFactory } from '../types/widgets/compare';
import { createDOMWidget, normalizeValue } from '../utils/common';

//#region Compare
export const compareFactory: CompareFactory = {
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
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.compare> | string
        > = (_, u) => {
          compare.kulData = (u.parsedJson as KulDataDataset) || {};
        };

        normalizeValue(value, callback, CustomWidgetName.compare);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const compare = document.createElement(TagName.KulCompare);
    const options = compareFactory.options(compare);

    content.classList.add(CompareCSS.Content);
    compare.classList.add(CompareCSS.Widget);

    switch (node.comfyClass) {
      default:
        compare.kulShape = 'image';
        break;
    }

    content.appendChild(compare);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(CustomWidgetName.compare, wrapper, node, options) };
  },
};
//#endregion
