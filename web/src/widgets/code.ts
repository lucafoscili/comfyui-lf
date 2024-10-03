import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import { CodeWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, deserializeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-code';
const EMPTY = '{ "Wow": "Such empty!" }';
const TYPE = CustomWidgetName.code;

export const codeFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    code: `${BASE_CSS_CLASS}__widget`,
  },
  options: (code: HTMLKulCodeElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return code;
      },
      getValue() {
        return code.kulValue;
      },
      setValue(value: Record<string, unknown> | string) {
        const isEmpty = () => {
          return (
            value === '' ||
            value === null ||
            value === undefined ||
            value === '{}' ||
            !Object.keys(value).length
          );
        };
        switch (code.kulLanguage) {
          case 'json':
            if (isEmpty()) {
              code.kulValue = EMPTY;
            }
            try {
              if (typeof value === 'string') {
                code.kulValue = deserializeValue(value).unescapedStr;
              } else {
                code.kulValue = JSON.stringify(value);
              }
            } catch (error) {
              getLFManager().log('Error when setting value!', { error, code }, LogSeverity.Error);
              if (value === undefined || value === '') {
                code.kulValue = EMPTY;
              }
            }
            break;
          default:
            if (isEmpty()) {
              code.kulValue = '';
            }
            if (typeof value === 'string') {
              code.kulValue = value;
            } else {
              code.kulValue = JSON.stringify(value);
            }
            break;
        }
      },
    } as CodeWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const code = document.createElement('kul-code');
    const options = codeFactory.options(code);

    content.classList.add(codeFactory.cssClasses.content);
    code.classList.add(codeFactory.cssClasses.code);

    switch (node.comfyClass) {
      case NodeName.displayJson:
      case NodeName.displayPrimitiveAsJson:
        code.kulLanguage = 'json';
        code.kulValue = EMPTY;
        break;
      default:
        code.kulLanguage = 'markdown';
    }

    content.appendChild(code);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
