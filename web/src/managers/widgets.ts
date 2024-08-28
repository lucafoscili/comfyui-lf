import { app } from '/scripts/app.js';
import { codeWidget } from '../widgets/code.js';
import { controlPanelWidget } from '../widgets/controlPanel.js';

/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/

export class LFWidgets {
  #NAMES: { [index: string]: CustomWidgetNames } = {
    code: 'KUL_CODE',
    controlPanel: 'KUL_CONTROL_PANEL',
  };

  constructor() {}

  add = {
    code: (nodeType: NodeType) => {
      const widget = app.widgets.KUL_CODE(nodeType, this.#NAMES.displayJson).widget;
      return widget;
    },
    controlPanel: (nodeType: NodeType) => {
      const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, this.#NAMES.controlPanel).widget;
      return widget;
    },
  };

  option = {
    code: (code: HTMLKulCodeElement) => codeWidget.options(code),
    controlPanel: () => controlPanelWidget.options(),
  };

  set = {
    code: () => {
      const type = this.#NAMES.displayJson;
      return {
        KUL_CODE: (nodeType: NodeType, name: string) => {
          return codeWidget.render(nodeType, name, type);
        },
      };
    },
    controlPanel: () => {
      const type = this.#NAMES.controlPanel;
      return {
        KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
          return controlPanelWidget.render(nodeType, name, type);
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
