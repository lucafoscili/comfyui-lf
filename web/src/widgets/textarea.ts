import { handleInputChange } from '../helpers/textarea';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { TextareaCSS, TextareaDeserializedValue, TextareaFactory } from '../types/widgets/textarea';
import { createDOMWidget, findWidget, normalizeValue } from '../utils/common';

//#region Textarea
export const textareaFactory: TextareaFactory = {
  options: (textarea) => {
    return {
      hideOnZoom: false,
      getValue() {
        try {
          return JSON.parse(textarea?.value || '{}') || {};
        } catch (error) {
          return { invalid_json: error };
        }
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.textarea> | string
        > = (_, u) => {
          const parsedJson = u.parsedJson as TextareaDeserializedValue;
          textarea.value = JSON.stringify(parsedJson, null, 2) || '{}';
        };

        normalizeValue(value, callback, CustomWidgetName.textarea);
      },
    };
  },
  render: (node) => {
    const w = findWidget(node, CustomWidgetName.textarea);
    if (findWidget(node, CustomWidgetName.textarea) && node.comfyClass === NodeName.writeJson) {
      return w.element;
    }

    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const textarea = document.createElement(TagName.Textarea);
    const options = textareaFactory.options(textarea);

    content.classList.add(TextareaCSS.Content);
    textarea.classList.add(TextareaCSS.Widget);

    content.appendChild(textarea);
    wrapper.appendChild(content);

    textarea.addEventListener('input', (e) => {
      handleInputChange(e);
    });

    return { widget: createDOMWidget(CustomWidgetName.textarea, wrapper, node, options) };
  },
};
//#endregion
