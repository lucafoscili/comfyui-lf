import { KulMessengerConfig } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { MessengerWidgetOptions, CustomWidgetName, MessengerWidgetValue } from '../types/widgets';
import { createDOMWidget, getLFManager, isValidJSON, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-messenger';
const TYPE = CustomWidgetName.messenger;

export const messengerFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    messenger: `${BASE_CSS_CLASS}__widget`,
  },
  options: (messenger: HTMLKulMessengerElement) => {
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
            const parsed = unescapeJson(value).parsedJson as MessengerWidgetValue;
            const dataset = parsed['dataset'];
            const config = parsed['config'];
            messenger.kulData = dataset;
            if (config) {
              if (typeof config === 'string') {
                const unescapeConfig = unescapeJson(config);
                messenger.dataset.config = unescapeConfig.unescapedStr;
                messenger.kulValue = unescapeJson(config)
                  .parsedJson as unknown as KulMessengerConfig;
              } else if (isValidJSON(config)) {
                messenger.dataset.config = JSON.stringify(config);
              }
            }
          } else {
            const { dataset, config } = value;
            if (dataset) {
              messenger.kulData = dataset;
            }
            if (config) {
              messenger.kulValue = config;
              messenger.dataset.config = JSON.stringify(config);
            }
          }
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, messenger }, LogSeverity.Error);
          if (value === undefined || value === '') {
            messenger.kulData = undefined;
          }
        }
      },
    } as MessengerWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const messenger = document.createElement('kul-messenger');
    const options = messengerFactory.options(messenger);

    content.classList.add(messengerFactory.cssClasses.content);
    messenger.classList.add(messengerFactory.cssClasses.messenger);

    messenger.addEventListener('kul-messenger-event', (e) => {
      const { eventType, config } = e.detail;
      switch (eventType) {
        case 'save':
          messenger.dataset.config = JSON.stringify(config);
          break;
      }
    });

    content.appendChild(messenger);
    wrapper.appendChild(content);

    wrapper.dataset.isInVisibleNodes = 'true';
    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};