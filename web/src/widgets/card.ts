import { KulEventPayload } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { CardWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;

export const cardFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    card: `${BASE_CSS_CLASS}__widget`,
  },
  options: (card: HTMLKulCardElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return card;
      },
      setValue(value) {
        try {
          if (typeof value === 'string') {
            card.kulData = unescapeJson(value).parsedJson;
          } else {
            card.kulData = value;
          }
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, card }, LogSeverity.Error);
        }
      },
    } as CardWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const card = document.createElement('kul-card');
    const options = cardFactory.options(card);

    content.classList.add(cardFactory.cssClasses.content);
    card.classList.add(cardFactory.cssClasses.card);
    card.addEventListener('kul-card-event', cardEventHandler);

    content.appendChild(card);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const cardEventHandler = (e: CustomEvent<KulEventPayload>) => {
  const { comp, eventType } = e.detail;
  const card = comp as HTMLKulCardElement;

  switch (eventType) {
    case 'click':
      if (card.dataset?.civitaiLink) {
        window.open(card.dataset.civitaiLink, '_blank');
      }
      break;
  }
};
