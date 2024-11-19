import { handleInputChange } from '../helpers/textarea';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { TextareaDeserializedValue, TextareaFactory } from '../types/widgets/textarea';
import { createDOMWidget, findWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-textarea';
const TYPE = CustomWidgetName.textarea;

//#region Textarea
export const textareaFactory: TextareaFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
    widgetError: `${BASE_CSS_CLASS}__widget--error`,
  },
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
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const parsedJson = u.parsedJson as TextareaDeserializedValue;
          textarea.value = JSON.stringify(parsedJson, null, 2) || '{}';
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const w = findWidget(node, TYPE);
    if (findWidget(node, TYPE) && node.comfyClass === NodeName.writeJson) {
      return w.element;
    }

    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const textarea = document.createElement(TagName.Textarea);
    const options = textareaFactory.options(textarea);

    content.classList.add(textareaFactory.cssClasses.content);
    textarea.classList.add(textareaFactory.cssClasses.widget);

    content.appendChild(textarea);
    wrapper.appendChild(content);

    textarea.addEventListener('input', (e) => {
      handleInputChange(e);
    });

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
