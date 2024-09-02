import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import { CustomWidgetName } from '../types/widgets';
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
      setProps(props: Partial<HTMLKulChatElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            chat[prop] = prop;
          }
        }
      },
      setValue(history: string) {
        chat.setHistory(history);
      },
    };
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
      getLFManager().log(
        'Setting new history on chat widget',
        { chat: e.detail.comp },
        LogSeverity.Error,
      );
      const { history } = e.detail;
      chat.dataset.history = history;
    });

    content.appendChild(chat);
    wrapper.appendChild(content);

    wrapper.dataset.isInVisibleNodes = 'true';
    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
