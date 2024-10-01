import { KulEventPayload } from '../types/ketchup-lite/components';
import { KulCard } from '../types/ketchup-lite/components/kul-card/kul-card';
import { LogSeverity } from '../types/manager';
import { CardWidgetDeserializedValue, CardWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;

const SAVED_PROPS = ['kulData', 'kulStyle'];

export const cardFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    grid: `${BASE_CSS_CLASS}__grid`,
  },
  options: (grid: HTMLDivElement) => {
    return {
      hideOnZoom: true,
      getComp() {
        return Array.from(grid.querySelectorAll('kul-card')) as HTMLKulCardElement[];
      },
      getValue() {
        const value: CardWidgetDeserializedValue = {
          propsArray: [],
          template: grid?.style.getPropertyValue('--card-grid') || '',
        };
        const cards = grid.querySelectorAll('kul-card');
        for (let index = 0; index < cards.length; index++) {
          const card = cards[index];

          const props: Partial<HTMLKulCardElement> = SAVED_PROPS.reduce((acc, p) => {
            if (card[p]) {
              acc[p] = card[p];
            }
            return acc;
          }, {} as Partial<HTMLKulCardElement>);

          value.propsArray.push(props);
        }
        try {
          return JSON.stringify(value);
        } catch (error) {
          return '';
        }
      },
      setValue(value) {
        if (!value) {
          return;
        }
        const { propsArray, template } = unescapeJson(value)
          .parsedJson as CardWidgetDeserializedValue;

        const gridTemplate = template || 'repeat(1, 1fr) / repeat(1, 1fr)';
        grid.style.setProperty('--card-grid', gridTemplate);

        const cards = grid.querySelectorAll('kul-card');
        for (let index = 0; propsArray && index < propsArray.length; index++) {
          const props = propsArray[index];
          for (const key in props) {
            const card = cards?.[index] || grid.appendChild(createCard());
            if (Object.prototype.hasOwnProperty.call(props, key)) {
              const prop = props[key];
              if (key === 'kulData') {
                try {
                  if (typeof prop === 'string') {
                    card.kulData = unescapeJson(prop).parsedJson;
                  } else {
                    card.kulData = prop;
                  }
                  const node = card.kulData.nodes?.[0];
                  if (node) {
                    card.dataset.link = node.description;
                    card.title = String(node.value).valueOf();
                  }
                } catch (error) {
                  getLFManager().log(
                    'Error when setting kulData prop on card!',
                    { error },
                    LogSeverity.Error,
                  );
                }
              } else {
                card[key] = prop;
              }
            }
          }
        }
      },
    } as CardWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const grid = document.createElement('div');
    const options = cardFactory.options(grid);

    content.classList.add(cardFactory.cssClasses.content);
    grid.classList.add(cardFactory.cssClasses.grid);

    content.appendChild(grid);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const cardEventHandler = (e: CustomEvent<KulEventPayload>) => {
  const { comp, eventType } = e.detail;
  const card = comp as KulCard;
  const node = card.kulData?.nodes?.[0];

  switch (eventType) {
    case 'click':
      if (node) {
        window.open(String(node.value).valueOf(), '_blank');
      }
      break;
  }
};

const createCard = () => {
  const card = document.createElement('kul-card');
  card.addEventListener('kul-card-event', cardEventHandler);
  return card;
};
