import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import { CustomWidgetName, JsonInputWidgetOptions } from '../types/widgets';
import { createDOMWidget, findWidget, getLFManager, deserializeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-jsoninput';
const TYPE = CustomWidgetName.jsonInput;
let VALIDATION_TIMEOUT: NodeJS.Timeout;

export const jsonInputFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
    widgetError: `${BASE_CSS_CLASS}__widget--error`,
  },
  options: (jsonInput: HTMLTextAreaElement) => {
    return {
      hideOnZoom: false,
      getValue() {
        return jsonInput?.value;
      },
      setValue(value) {
        if (jsonInput) {
          try {
            const { unescapedStr, validJson, parsedJson } = deserializeValue(value);
            const parsedValue = validJson ? parsedJson : JSON.parse(unescapedStr);
            jsonInput.value = JSON.stringify(parsedValue, null, 2);
          } catch (error) {
            getLFManager().log(
              'Error setting WriteJSON value',
              { error, value },
              LogSeverity.Warning,
            );
          }
        }
      },
    } as JsonInputWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
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
