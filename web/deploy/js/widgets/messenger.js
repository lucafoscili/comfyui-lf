import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, isValidJSON, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-messenger';
const TYPE = CustomWidgetName.messenger;
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
                const dataset = messenger.kulData ?? JSON.stringify(messenger.kulData);
                const config = messenger.dataset.config ?? JSON.stringify(messenger.dataset.config);
                return JSON.stringify({ dataset, config });
            },
            setValue(value) {
                try {
                    if (typeof value === 'string') {
                        const parsed = unescapeJson(value).parsedJson;
                        const dataset = parsed['dataset'];
                        const config = parsed['config'];
                        messenger.kulData = dataset;
                        if (config) {
                            if (typeof config === 'string') {
                                const unescapeConfig = unescapeJson(config);
                                messenger.dataset.config = unescapeConfig.unescapedStr;
                                messenger.kulValue = unescapeJson(config)
                                    .parsedJson;
                            }
                            else if (isValidJSON(config)) {
                                messenger.dataset.config = JSON.stringify(config);
                            }
                        }
                    }
                    else {
                        const { dataset, config } = value;
                        if (dataset) {
                            messenger.kulData = dataset;
                        }
                        if (config) {
                            messenger.kulValue = config;
                            messenger.dataset.config = JSON.stringify(config);
                        }
                    }
                    if (messenger.kulData?.nodes?.[0]) {
                        placeholder.classList.add(messengerFactory.cssClasses.placeholderHidden);
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, messenger }, LogSeverity.Error);
                    if (value === undefined || value === '') {
                        messenger.kulData = undefined;
                        placeholder.classList.remove(messengerFactory.cssClasses.placeholderHidden);
                    }
                }
            },
        };
    },
    render: (node, name) => {
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
                    messenger.dataset.config = JSON.stringify(config);
                    break;
            }
        });
        content.appendChild(placeholder);
        content.appendChild(messenger);
        wrapper.appendChild(content);
        wrapper.dataset.isInVisibleNodes = 'true';
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
