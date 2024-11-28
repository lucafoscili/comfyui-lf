import { EV_HANDLERS } from '../helpers/chat.js';
import { KulEventName } from '../types/events/events.js';
import { ChatCSS } from '../types/widgets/chat.js';
import { CustomWidgetName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const chatFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { history } = STATE.get(wrapper);
                return history || '';
            },
            setValue(value) {
                const state = STATE.get(wrapper);
                const callback = (v) => {
                    state.history = v || '';
                    state.chat.setHistory(v);
                };
                normalizeValue(value, callback, CustomWidgetName.chat);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const chat = document.createElement(TagName.KulChat);
        content.classList.add(ChatCSS.Content);
        chat.classList.add(ChatCSS.Widget);
        chat.addEventListener(KulEventName.KulChat, (e) => EV_HANDLERS.chat(STATE.get(wrapper), e));
        content.appendChild(chat);
        wrapper.appendChild(content);
        const options = chatFactory.options(wrapper);
        STATE.set(wrapper, { chat, history: '', node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.chat, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
