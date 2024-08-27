import { app } from '/scripts/app.js';
import { getControlPanel } from '../widgets/controlPanel.js';
import { getCode } from '../widgets/code.js';

/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/

export class LFWidgets {
  NAMES = {
    controlPanel: 'KUL_CONTROL_PANEL',
    displayJson: 'KUL_CODE',
  };

  constructor() {}

  add = {
    controlPanel: (nodeType: Partial<NodeType>) => {
      const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, this.NAMES.controlPanel).widget;
      widget.serializeValue = false;
      return widget;
    },
    code: (nodeType: Partial<NodeType>) => {
      const widget = app.widgets.KUL_CODE(nodeType, this.NAMES.displayJson).widget;
      widget.serializeValue = false;
      return widget;
    },
  };

  set = {
    controlPanel: () => {
      return {
        KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
          return getControlPanel(nodeType, name, this.NAMES.controlPanel);
        },
      };
    },
    code: () => {
      return {
        KUL_CODE: (nodeType: NodeType, name: string) => {
          return getCode(nodeType, name, this.NAMES.displayJson);
        },
      };
    },
  };
}
