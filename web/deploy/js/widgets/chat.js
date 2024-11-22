import { KulEventName } from '../types/events/events.js';
import { LogSeverity } from '../types/manager/manager.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { ChatCSS } from '../types/widgets/chat.js';
import { createDOMWidget, findWidget, getLFManager, normalizeValue } from '../utils/common.js';
//#region Chat
export const chatFactory = {
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
                const callback = (v) => {
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
                    const severity = status === 'ready'
                        ? LogSeverity.Info
                        : status === 'offline'
                            ? LogSeverity.Error
                            : LogSeverity.Warning;
                    getLFManager().log('Chat widget, polling status: ' + status, { chat: e.detail }, severity);
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
