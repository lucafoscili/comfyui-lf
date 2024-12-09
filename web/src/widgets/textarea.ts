import { EV_HANDLERS } from '../helpers/textarea';
import {
  TextareaCSS,
  TextareaDeserializedValue,
  TextareaFactory,
  TextareaNormalizeCallback,
  TextareaState,
} from '../types/widgets/textarea';
import { CustomWidgetName, TagName } from '../types/widgets/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, TextareaState>();

export const textareaFactory: TextareaFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { textarea } = STATE.get(wrapper);

        try {
          return textarea?.value || '{}';
        } catch (error) {
          return error;
        }
      },
      setValue(value) {
        const { textarea } = STATE.get(wrapper);

        const callback: TextareaNormalizeCallback = (_, u) => {
          const parsedJson = u.parsedJson as TextareaDeserializedValue;
          textarea.value = JSON.stringify(parsedJson, null, 2) || '{}';
        };

        normalizeValue(value, callback, CustomWidgetName.textarea);
      },
    };
  },
  //#endregion

  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const textarea = document.createElement(TagName.Textarea);

    content.classList.add(TextareaCSS.Content);
    content.appendChild(textarea);

    textarea.classList.add(TextareaCSS.Widget);
    textarea.addEventListener('input', EV_HANDLERS.input);

    wrapper.appendChild(content);

    const options = textareaFactory.options(wrapper);

    STATE.set(wrapper, { node, textarea, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.textarea, wrapper, node, options) };
  },
  //#endregion

  //#region State
  state: STATE,
  //#endregion
};
