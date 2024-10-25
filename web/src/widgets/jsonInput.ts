import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  JsonInputWidgetDeserializedValue,
  JsonInputWidgetFactory,
  NormalizeValueCallback,
} from '../types/widgets';
import { createDOMWidget, findWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-jsoninput';
const TYPE = CustomWidgetName.jsonInput;
let VALIDATION_TIMEOUT: NodeJS.Timeout;

export const jsonInputFactory: JsonInputWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
    widgetError: `${BASE_CSS_CLASS}__widget--error`,
  },
  options: (textarea) => {
    return {
      hideOnZoom: false,
      getValue() {
        return JSON.parse(textarea?.value || '{}') || {};
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const parsedJson = u.parsedJson as JsonInputWidgetDeserializedValue;
          textarea.value = JSON.stringify(parsedJson, null, 2) || '{}';
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node, name) => {
    const w = findWidget(node, TYPE);
    if (findWidget(node, TYPE) && node.comfyClass === NodeName.writeJson) {
      return w.element;
    }

    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const jsonInput = document.createElement('textarea');
    const options = jsonInputFactory.options(jsonInput);

    content.classList.add(jsonInputFactory.cssClasses.content);
    jsonInput.classList.add(jsonInputFactory.cssClasses.widget);

    content.appendChild(jsonInput);
    wrapper.appendChild(content);

    jsonInput.addEventListener('input', (e) => {
      handleInputChange(e);
    });

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

function handleInputChange(e: Event) {
  const jsonInput = e.currentTarget as HTMLTextAreaElement;

  const startValidationTimer = () => {
    const validateAndFormatJSON = async () => {
      try {
        const jsonObject = JSON.parse(jsonInput.value);
        const formattedJson = JSON.stringify(jsonObject, null, 2);
        if (formattedJson !== '{}') {
          jsonInput.title = '';
          jsonInput.value = formattedJson;
          jsonInput.classList.remove(jsonInputFactory.cssClasses.widgetError);
        }
      } catch (error) {
        getLFManager().log('Error parsing JSON', { error }, LogSeverity.Warning);
        jsonInput.classList.add(jsonInputFactory.cssClasses.widgetError);
        jsonInput.title = error;
      }
    };

    VALIDATION_TIMEOUT = setTimeout(validateAndFormatJSON, 2500);
  };

  clearTimeout(VALIDATION_TIMEOUT);
  startValidationTimer();
}
