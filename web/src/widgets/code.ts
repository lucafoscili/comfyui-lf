import { createDOMWidget, getLFManager, unescapeJson } from '../utils/utils';

const BASE_CSS_CLASS = 'lf-code';

export const codeWidget = {
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
      getProps() {
        return code.getProps();
      },
      async getValue() {
        return code.kulValue;
      },
      setProps(props: Partial<HTMLKulCodeElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            code[prop] = prop;
          }
        }
      },
      async setValue(value: Record<string, unknown> | string) {
        const empty = 'Wow. Such empty!';
        if (value === '' || value === null || value === undefined) {
          code.kulValue = empty;
        } else {
          try {
            if (typeof value === 'string') {
              code.kulValue = JSON.stringify(unescapeJson(value));
            } else {
              code.kulValue = JSON.stringify(value);
            }
          } catch (error) {
            getLFManager().log('Error when setting value!', { error }, 'error');
            if (value === undefined || value === '') {
              code.kulValue = empty;
            }
          }
        }
      },
    } as CodeWidgetOptions;
  },
  render: (node: NodeType, name: string, wType: CustomWidgetNames) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const code = document.createElement('kul-code');
    const options = codeWidget.options(code);

    content.classList.add(codeWidget.cssClasses.content);
    code.classList.add(codeWidget.cssClasses.code);
    code.kulLanguage = 'json';

    content.appendChild(code);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, wType, wrapper, node, options) };
  },
};
