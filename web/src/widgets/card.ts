import { CardWidgetDeserializedValue, CardWidgetOptions, CustomWidgetName } from '../types/widgets';
import { cardHandler, getCardProps } from '../helpers/card';
import {
  createDOMWidget,
  serializeValue,
  deserializeValue,
  findWidget,
  getCustomWidget,
} from '../utils/common';
import { NodeName } from '../types/nodes';
import { KulButtonEventPayload } from '../types/ketchup-lite/components';
import { cardPlaceholders, fetchModelMetadata } from '../utils/api';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import { APIMetadataEntry } from '../types/manager';

const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;

export const cardFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    contentHasButton: `${BASE_CSS_CLASS}--has-button`,
    grid: `${BASE_CSS_CLASS}__grid`,
  },
  options: (grid: HTMLDivElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return Array.from(grid.querySelectorAll('kul-card')) as HTMLKulCardElement[];
      },
      getValue() {
        const value: CardWidgetDeserializedValue = {
          propsArray: getCardProps(grid),
          template: grid?.style.getPropertyValue('--card-grid') || '',
        };
        return serializeValue(value);
      },
      setValue(value) {
        if (!value) {
          return;
        }
        const { propsArray, template } = deserializeValue(value)
          .parsedJson as CardWidgetDeserializedValue;

        const gridTemplate = template || 'repeat(1, 1fr) / repeat(1, 1fr)';
        grid.style.setProperty('--card-grid', gridTemplate);

        cardHandler(grid, propsArray);
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

    switch (node.comfyClass as NodeName) {
      case NodeName.checkpointSelector:
      case NodeName.embeddingSelector:
      case NodeName.loraAndEmbeddingSelector:
      case NodeName.loraSelector:
        content.classList.add(cardFactory.cssClasses.contentHasButton);
        content.appendChild(selectorButton(grid, node));
        break;
    }

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const selectorButton = (grid: HTMLDivElement, node: NodeType) => {
  const cb = (e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;
    const button = comp as KulButton;

    switch (eventType) {
      case 'click':
        const cards = Array.from(grid.querySelectorAll('kul-card'));
        if (cards?.length) {
          const models: APIMetadataEntry[] = [];
          const widget = getCustomWidget(node, CustomWidgetName.card);

          cards.forEach((card) => {
            const hashCell = card.kulData?.nodes?.[0]?.cells?.kulCode;
            if (hashCell) {
              const { hash, path } = JSON.parse(hashCell.value);
              const dataset = card.kulData;
              button.kulShowSpinner = true;
              models.push({ apiFlag: true, dataset, hash, path });
            }
          });

          if (models.length) {
            const value: CardWidgetDeserializedValue = {
              propsArray: [],
              template: `repeat(1, 1fr) / repeat(${cards.length}, 1fr)`,
            };
            cardPlaceholders(widget, cards.length);
            fetchModelMetadata(models, true).then((r) => {
              for (let index = 0; index < r.length; index++) {
                const cardProps = r[index];
                if (cardProps.kulData) {
                  value.propsArray.push(cardProps);
                } else {
                  value.propsArray.push({
                    ...cardProps,
                    kulData: models[index].dataset,
                  });
                }
              }
              widget.options.setValue(JSON.stringify(value));
              requestAnimationFrame(() => (button.kulShowSpinner = false));
            });
          }
        }
        break;
    }
  };

  const button = document.createElement('kul-button');
  button.classList.add('kul-full-width');
  button.kulIcon = 'cloud_download';
  button.kulLabel = 'Refresh';
  button.title = 'Attempts to manually ownload fresh metadata from CivitAI';
  button.addEventListener('kul-button-event', cb);

  const spinner = document.createElement('kul-spinner');
  spinner.kulActive = true;
  spinner.kulDimensions = '0.6em';
  spinner.kulLayout = 2;
  spinner.slot = 'spinner';
  button.appendChild(spinner);

  return button;
};
