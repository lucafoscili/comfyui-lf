import { EV_HANDLERS } from '../helpers/history';
import { KulEventName } from '../types/events/events';
import { KulDataDataset } from '../types/ketchup-lite/components';
import {
  HistoryCSS,
  HistoryFactory,
  HistoryNormalizeCallback,
  HistoryState,
} from '../types/widgets/history';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, HistoryState>();

export const historyFactory: HistoryFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: true,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { list } = STATE.get(wrapper);

        return list?.kulData || {};
      },
      setValue(value) {
        const { list } = STATE.get(wrapper);

        const callback: HistoryNormalizeCallback = (_, u) => {
          list.kulData = (u.parsedJson as KulDataDataset) || {};
        };

        normalizeValue(value, callback, CustomWidgetName.history);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const list = document.createElement(TagName.KulList);

    list.classList.add(HistoryCSS.Widget);
    list.kulEmptyLabel = 'History is empty!';
    list.kulEnableDeletions = true;

    switch (node.comfyClass) {
      case NodeName.loadFileOnce:
        break;
      default:
        list.kulSelectable = true;
        break;
    }

    list.addEventListener(KulEventName.KulList, (e) => EV_HANDLERS.list(STATE.get(wrapper), e));

    content.classList.add(HistoryCSS.Content);
    content.appendChild(list);

    wrapper.appendChild(content);

    const options = historyFactory.options(wrapper);

    STATE.set(wrapper, { list, node, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.history, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
