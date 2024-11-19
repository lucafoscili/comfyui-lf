import { KulEventName } from '../types/events/events';
import { LogSeverity } from '../types/manager/manager';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { ChatFactory } from '../types/widgets/chat';
import { createDOMWidget, findWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-chat';
const TYPE = CustomWidgetName.chat;

//#region Chat
export const chatFactory: ChatFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    chat: `${BASE_CSS_CLASS}__widget`,
  },
  options: (chat) => {
    return {
      hideOnZoom: false,
      getComp() {
        return chat;
      },
      getValue() {
        return chat?.dataset.history || '';
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (v) => {
          chat.setHistory(v);
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const w = findWidget(node, TYPE);
    if (findWidget(node, TYPE) && node.comfyClass === NodeName.llmChat) {
      return w.element;
    }

    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const chat = document.createElement(TagName.KulChat);
    const options = chatFactory.options(chat);

    content.classList.add(chatFactory.cssClasses.content);
    chat.classList.add(chatFactory.cssClasses.chat);

    chat.addEventListener(KulEventName.KulChat, (e) => {
      const { eventType, history, status } = e.detail;

      switch (eventType) {
        case 'polling':
          const severity =
            status === 'ready'
              ? LogSeverity.Info
              : status === 'offline'
              ? LogSeverity.Error
              : LogSeverity.Warning;
          getLFManager().log(
            'Chat widget, polling status: ' + status,
            { chat: e.detail },
            severity,
          );
          break;
        case 'update':
          getLFManager().log('Chat widget: updating...', { chat: e.detail }, LogSeverity.Success);
          chat.dataset.history = history;
          break;
      }
    });

    content.appendChild(chat);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
