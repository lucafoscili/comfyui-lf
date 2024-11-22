import { KulEventName } from '../types/events/events';
import { LogSeverity } from '../types/manager/manager';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { ChatCSS, ChatFactory } from '../types/widgets/chat';
import { createDOMWidget, findWidget, getLFManager, normalizeValue } from '../utils/common';

//#region Chat
export const chatFactory: ChatFactory = {
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
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.chat> | string
        > = (v) => {
          chat.setHistory(v);
        };

        normalizeValue(value, callback, CustomWidgetName.chat);
      },
    };
  },
  render: (node) => {
    const w = findWidget(node, CustomWidgetName.chat);
    if (findWidget(node, CustomWidgetName.chat) && node.comfyClass === NodeName.llmChat) {
      return w.element;
    }

    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const chat = document.createElement(TagName.KulChat);
    const options = chatFactory.options(chat);

    content.classList.add(ChatCSS.Content);
    chat.classList.add(ChatCSS.Widget);

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

    return { widget: createDOMWidget(CustomWidgetName.chat, wrapper, node, options) };
  },
};
//#endregion
