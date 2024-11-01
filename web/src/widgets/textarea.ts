import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  TextareaWidgetDeserializedValue,
  TextareaWidgetFactory,
  NormalizeValueCallback,
} from '../types/widgets';
import { createDOMWidget, findWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-textarea';
const TYPE = CustomWidgetName.textarea;
let VALIDATION_TIMEOUT: NodeJS.Timeout;

export const textareaFactory: TextareaWidgetFactory = {
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
          const parsedJson = u.parsedJson as TextareaWidgetDeserializedValue;
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

    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const textarea = document.createElement('textarea');
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

function handleInputChange(e: Event) {
  const textarea = e.currentTarget as HTMLTextAreaElement;

  const startValidationTimer = () => {
    const validateAndFormatJSON = async () => {
      try {
        const jsonObject = JSON.parse(textarea.value);
        const formattedJson = JSON.stringify(jsonObject, null, 2);
        if (formattedJson !== '{}') {
          textarea.title = '';
          textarea.value = formattedJson;
          textarea.classList.remove(textareaFactory.cssClasses.widgetError);
        }
      } catch (error) {
        getLFManager().log('Error parsing JSON', { error }, LogSeverity.Warning);
        textarea.classList.add(textareaFactory.cssClasses.widgetError);
        textarea.title = error;
      }
    };

    VALIDATION_TIMEOUT = setTimeout(validateAndFormatJSON, 2500);
  };

  clearTimeout(VALIDATION_TIMEOUT);
  startValidationTimer();
}
