import { CustomWidgetName, } from '../types/widgets/_common.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-messenger';
const TYPE = CustomWidgetName.messenger;
//#region Messenger
export const messengerFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        messenger: `${BASE_CSS_CLASS}__widget`,
        placeholder: `${BASE_CSS_CLASS}__placeholder`,
        placeholderHidden: `${BASE_CSS_CLASS}__placeholder--hidden`,
    },
    options: (messenger, placeholder) => {
        return {
            hideOnZoom: false,
            getComp() {
                return messenger;
            },
            getValue() {
                return {
                    dataset: messenger.kulData || {},
                    config: messenger.dataset.config ? JSON.parse(messenger.dataset.config) : {},
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    const { config, dataset } = u.parsedJson;
                    messenger.kulData = dataset;
                    if (config && typeof config === 'object') {
                        messenger.dataset.config = JSON.stringify(config);
                        messenger.kulValue = config;
                    }
                    placeholder.classList.add(messengerFactory.cssClasses.placeholderHidden);
                };
                const onException = () => {
                    placeholder.classList.remove(messengerFactory.cssClasses.placeholderHidden);
                };
                normalizeValue(value, callback, TYPE, onException);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const placeholder = document.createElement('div');
        const messenger = document.createElement('kul-messenger');
        const options = messengerFactory.options(messenger, placeholder);
        content.classList.add(messengerFactory.cssClasses.content);
        messenger.classList.add(messengerFactory.cssClasses.messenger);
        placeholder.classList.add(messengerFactory.cssClasses.placeholder);
        placeholder.innerHTML = `The setup of this node must be done client-side. Use either <strong>LF_WriteJSON</strong> or <strong>LF_DisplayJSON</strong>
to connect as input a valid JSON dataset. Check the repository's workflows to see a 
<a target="_blank" href="https://github.com/lucafoscili/comfyui-lf/blob/fd52deb44d199e222833fbc159628aceeac48ab9/workflows/LLMMessenger.png">working example here.</a>.`;
        messenger.addEventListener('kul-messenger-event', (e) => {
            const { eventType, config } = e.detail;
            switch (eventType) {
                case 'save':
                    if (config && typeof config === 'object') {
                        messenger.dataset.config = JSON.stringify(config);
                    }
                    break;
            }
        });
        content.appendChild(placeholder);
        content.appendChild(messenger);
        wrapper.appendChild(content);
        wrapper.dataset.isInVisibleNodes = 'true';
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
