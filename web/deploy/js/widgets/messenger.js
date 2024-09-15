import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-messenger';
const TYPE = CustomWidgetName.messenger;
export const messengerFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        messenger: `${BASE_CSS_CLASS}__widget`,
    },
    options: (messenger) => {
        return {
            hideOnZoom: false,
            getComp() {
                return messenger;
            },
            getValue() {
                return messenger?.dataset.history;
            },
            setValue() { },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const messenger = document.createElement('kul-messenger');
        const options = messengerFactory.options(messenger);
        content.classList.add(messengerFactory.cssClasses.content);
        messenger.classList.add(messengerFactory.cssClasses.messenger);
        messenger.addEventListener('kul-chat-event', (e) => {
            const detail = e.detail;
            getLFManager().log('Setting new history on messenger widget', { messenger }, LogSeverity.Error);
            const { history } = detail;
            messenger.dataset.history = history;
        });
        content.appendChild(messenger);
        wrapper.appendChild(content);
        wrapper.dataset.isInVisibleNodes = 'true';
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
