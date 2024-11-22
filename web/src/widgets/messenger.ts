import { KulEventName } from '../types/events/events';
import {
  CustomWidgetName,
  CustomWidgetDeserializedValuesMap,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import {
  MessengerCSS,
  MessengerDeserializedValue,
  MessengerFactory,
} from '../types/widgets/messenger';
import { createDOMWidget, normalizeValue } from '../utils/common';

const TYPE = CustomWidgetName.messenger;

//#region Messenger
export const messengerFactory: MessengerFactory = {
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
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const { config, dataset } = u.parsedJson as MessengerDeserializedValue;
          messenger.kulData = dataset;

          if (config && typeof config === 'object') {
            messenger.dataset.config = JSON.stringify(config);
            messenger.kulValue = config;
          }

          placeholder.classList.add(MessengerCSS.PlaceholderHidden);
        };
        const onException = () => {
          placeholder.classList.remove(MessengerCSS.PlaceholderHidden);
        };

        normalizeValue(value, callback, TYPE, onException);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const placeholder = document.createElement(TagName.Div);
    const messenger = document.createElement(TagName.KulMessenger);
    const options = messengerFactory.options(messenger, placeholder);

    content.classList.add(MessengerCSS.Content);
    messenger.classList.add(MessengerCSS.Widget);
    placeholder.classList.add(MessengerCSS.Placeholder);

    placeholder.innerHTML = `The setup of this node must be done client-side. Use either <strong>LF_WriteJSON</strong> or <strong>LF_DisplayJSON</strong>
to connect as input a valid JSON dataset. Check the repository's workflows to see a 
<a target="_blank" href="https://github.com/lucafoscili/comfyui-lf/blob/fd52deb44d199e222833fbc159628aceeac48ab9/workflows/LLMMessenger.png">working example here.</a>.`;

    messenger.addEventListener(KulEventName.KulMessenger, (e) => {
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

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
//#endregion
