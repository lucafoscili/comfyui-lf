import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import { ChatWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, findWidget, getLFManager } from '../utils/common';

const BASE_CSS_CLASS = 'lf-chat';
const TYPE = CustomWidgetName.chat;

export const chatFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    chat: `${BASE_CSS_CLASS}__widget`,
  },
  options: (chat: HTMLKulChatElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return chat;
      },
      getValue() {
        return chat?.dataset.history;
      },
      setValue(history) {
        chat.setHistory(history);
      },
    } as ChatWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const w = findWidget(node, TYPE);
    if (findWidget(node, TYPE) && node.comfyClass === NodeName.llmChat) {
      return w.element;
    }

    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const chat = document.createElement('kul-chat');
    const options = chatFactory.options(chat);

    content.classList.add(chatFactory.cssClasses.content);
    chat.classList.add(chatFactory.cssClasses.chat);

    chat.addEventListener('kul-chat-event', (e) => {
      const { eventType, history, status } = e.detail;

      switch (eventType) {
        case 'polling':
          const severity =
            status === 'ready'
              ? LogSeverity.Success
              : status === 'offline'
              ? LogSeverity.Error
              : LogSeverity.Info;
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

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
