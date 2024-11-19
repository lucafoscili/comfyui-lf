import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { CodeFactory } from '../types/widgets/code';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-code';
const TYPE = CustomWidgetName.code;

//#region Code
export const codeFactory: CodeFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    code: `${BASE_CSS_CLASS}__widget`,
  },
  options: (code) => {
    return {
      hideOnZoom: false,
      getComp() {
        return code;
      },
      getValue() {
        switch (code.kulLanguage) {
          case 'json':
            return code.kulValue || '{}';
          default:
            return code.kulValue || '';
        }
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (v, u) => {
          switch (code.kulLanguage) {
            case 'json':
              code.kulValue = u.unescapedStr || '{}';
              break;
            default:
              code.kulValue = typeof v === 'string' ? v : '';
              break;
          }
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const code = document.createElement(TagName.KulCode);
    const options = codeFactory.options(code);

    content.classList.add(codeFactory.cssClasses.content);
    code.classList.add(codeFactory.cssClasses.code);

    switch (node.comfyClass) {
      case NodeName.displayJson:
      case NodeName.displayPrimitiveAsJson:
      case NodeName.shuffleJsonKeys:
      case NodeName.sortJsonKeys:
      case NodeName.stringToJson:
        code.kulLanguage = 'json';
        code.kulValue = '{}';
        break;
      default:
        code.kulLanguage = 'markdown';
        code.kulValue = '';
        break;
    }

    content.appendChild(code);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
