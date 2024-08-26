import { app } from '/scripts/app.js';
import { KUL_CONTROL_PANEL } from '../widgets/controlPanel.js';

/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/

export class LFWidgets {
  #NAMES: { [index: string]: CustomWidgetNames } = {
    controlPanel: 'KUL_CONTROL_PANEL',
  };

  constructor() {}

  create = {
    controlPanel: (nodeType: Partial<NodeType>) => {
      const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, this.#NAMES.controlPanel, {
        isReady: false,
      }).widget;
      widget.serializeValue = false;
    },
  };

  get = {
    controlPanel: () => {
      return {
        KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
          return KUL_CONTROL_PANEL(nodeType, name, this.#NAMES.controlPanel);
        },
      };
    },
  };
}
