import { listEventHandler } from '../helpers/history';
import { KulEventName } from '../types/events/events';
import { KulDataDataset } from '../types/ketchup-lite/components';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { HistoryCSS, HistoryFactory } from '../types/widgets/history';
import { createDOMWidget, normalizeValue } from '../utils/common';

//#region History
export const historyFactory: HistoryFactory = {
  options: (list) => {
    return {
      hideOnZoom: true,
      getComp() {
        return list;
      },
      getValue() {
        return list?.kulData || {};
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.history> | string
        > = (_, u) => {
          list.kulData = (u.parsedJson as KulDataDataset) || {};
        };

        normalizeValue(value, callback, CustomWidgetName.history);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const history = document.createElement(TagName.KulList);
    const options = historyFactory.options(history);

    content.classList.add(HistoryCSS.Content);
    history.classList.add(HistoryCSS.Widget);
    history.kulEmptyLabel = 'History is empty!';
    history.kulEnableDeletions = true;

    switch (node.comfyClass) {
      case NodeName.loadFileOnce:
        break;
      default:
        history.kulSelectable = true;
        break;
    }

    history.addEventListener(KulEventName.KulList, (e) => {
      listEventHandler(e, node);
    });

    content.appendChild(history);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(CustomWidgetName.history, wrapper, node, options) };
  },
};
//#endregion
