import { KulDataDataset } from '../types/ketchup-lite/components';
import {
  CompareCSS,
  CompareFactory,
  CompareNormalizeCallback,
  CompareState,
} from '../types/widgets/compare';
import { CustomWidgetName, TagName } from '../types/widgets/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, CompareState>();

export const compareFactory: CompareFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { compare } = STATE.get(wrapper);

        return compare.kulData || {};
      },
      setValue(value) {
        const { compare } = STATE.get(wrapper);

        const callback: CompareNormalizeCallback = (_, u) => {
          compare.kulData = (u.parsedJson as KulDataDataset) || {};
        };

        normalizeValue(value, callback, CustomWidgetName.compare);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const compare = document.createElement(TagName.KulCompare);

    content.classList.add(CompareCSS.Content);
    compare.classList.add(CompareCSS.Widget);

    switch (node.comfyClass) {
      default:
        compare.kulShape = 'image';
        break;
    }

    content.appendChild(compare);
    wrapper.appendChild(content);

    const options = compareFactory.options(wrapper);

    STATE.set(wrapper, { compare, node, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.compare, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
