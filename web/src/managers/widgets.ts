import { app } from '/scripts/app.js';
import { renderControlPanel } from '../widgets/controlPanel.js';
import { renderCode } from '../widgets/code.js';
import { getLFManager } from '../utils/utils.js';

/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/

export class LFWidgets {
  #NAMES: { [index: string]: CustomWidgetNames } = {
    controlPanel: 'KUL_CONTROL_PANEL',
    displayJson: 'KUL_CODE',
  };

  constructor() {}

  add = {
    controlPanel: (nodeType: NodeType) => {
      const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, this.#NAMES.controlPanel).widget;
      return widget;
    },
    code: (nodeType: NodeType) => {
      const widget = app.widgets.KUL_CODE(nodeType, this.#NAMES.displayJson).widget;
      return widget;
    },
  };

  option = {
    code: (code: HTMLKulCodeElement) => {
      return {
        hideOnZoom: false,
        getComp() {
          return code;
        },
        getProps() {
          return code.getProps();
        },
        getValue() {
          return code.kulValue;
        },
        refresh: () => {},
        setProps(props: Partial<HTMLKulCodeElement>) {
          for (const key in props) {
            if (Object.prototype.hasOwnProperty.call(props, key)) {
              const prop = props[key];
              code[prop] = prop;
            }
          }
        },
        setValue(value: JSON | string) {
          if (value === undefined || value === '') {
            code.kulValue = 'Wow. Such empty!';
          } else {
            if (value === typeof 'string') {
              code.kulValue = value;
            } else {
              try {
                code.kulValue = JSON.stringify(value, null, 2);
              } catch (error) {
                getLFManager().log('Error when setting value!', { error }, 'error');
              }
            }
          }
        },
      };
    },
  };

  set = {
    controlPanel: () => {
      const type = this.#NAMES.controlPanel;
      return {
        KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
          return renderControlPanel(nodeType, name, type);
        },
      };
    },
    code: () => {
      const type = this.#NAMES.displayJson;
      return {
        KUL_CODE: (nodeType: NodeType, name: string) => {
          return renderCode(nodeType, name, type, this.option.code);
        },
      };
    },
  };

  get = {
    adders: this.add,
    options: this.option,
    setters: this.set,
  };
}
