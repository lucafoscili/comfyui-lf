import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';

/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/

export class LFWidgets {
  #CSS_EMBEDS = ['code', 'controlPanel'];
  #NAMES: { [index: string]: CustomWidgetNames } = {
    code: 'KUL_CODE',
    controlPanel: 'KUL_CONTROL_PANEL',
  };

  constructor() {
    for (let index = 0; index < this.#CSS_EMBEDS.length; index++) {
      const cssFileName = this.#CSS_EMBEDS[index];
      const link = document.createElement('link');
      link.dataset.filename = cssFileName.toString();
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `extensions/comfyui-lf/css/${cssFileName}.css`;
      document.head.appendChild(link);
    }
  }

  add = {
    code: (nodeType: NodeType) => {
      const widget = app.widgets.KUL_CODE(nodeType, this.#NAMES.code).widget;
      return widget;
    },
    controlPanel: (nodeType: NodeType) => {
      const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, this.#NAMES.controlPanel).widget;
      return widget;
    },
  };

  option = {
    code: (code: HTMLKulCodeElement) => codeFactory.options(code),
    controlPanel: () => controlPanelFactory.options(),
  };

  set = {
    code: () => {
      return {
        KUL_CODE: (nodeType: NodeType, name: string) => {
          return codeFactory.render(nodeType, name);
        },
      };
    },
    controlPanel: () => {
      return {
        KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
          return controlPanelFactory.render(nodeType, name);
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
