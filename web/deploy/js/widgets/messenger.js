import { PLACEHOLDER_MESSAGE } from '../fixtures/messenger.js';
import { EV_HANDLERS } from '../helpers/messenger.js';
import { KulEventName } from '../types/events/events.js';
import { MessengerCSS, } from '../types/widgets/messenger.js';
import { CustomWidgetName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, isValidObject, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const messengerFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { config, elements } = STATE.get(wrapper);
                const { messenger } = elements;
                return {
                    dataset: messenger.kulData || {},
                    config,
                };
            },
            setValue(value) {
                const { elements } = STATE.get(wrapper);
                const { messenger, placeholder } = elements;
                const callback = (_, u) => {
                    const { config, dataset } = u.parsedJson;
                    messenger.kulData = dataset;
                    if (isValidObject(config)) {
                        messenger.kulValue = config;
                    }
                    placeholder.classList.add(MessengerCSS.PlaceholderHidden);
                };
                const onException = () => {
                    placeholder.classList.remove(MessengerCSS.PlaceholderHidden);
                };
                normalizeValue(value, callback, CustomWidgetName.messenger, onException);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const placeholder = document.createElement(TagName.Div);
        const messenger = document.createElement(TagName.KulMessenger);
        content.classList.add(MessengerCSS.Content);
        messenger.classList.add(MessengerCSS.Widget);
        placeholder.classList.add(MessengerCSS.Placeholder);
        placeholder.innerHTML = PLACEHOLDER_MESSAGE;
        messenger.addEventListener(KulEventName.KulMessenger, EV_HANDLERS.messenger.bind(EV_HANDLERS.messenger, STATE.get(wrapper)));
        content.appendChild(placeholder);
        content.appendChild(messenger);
        wrapper.appendChild(content);
        const options = messengerFactory.options(wrapper);
        STATE.set(wrapper, { config: null, elements: { messenger, placeholder }, node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.messenger, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
