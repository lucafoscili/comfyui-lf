import { DOWNLOAD_PLACEHOLDERS } from '../fixtures/card';
import { APIMetadataEntry, GetMetadataAPIPayload } from '../types/api/api';
import { KulEventName } from '../types/events/events';
import {
  KulButtonEventPayload,
  KulCardEventPayload,
  KulDataDataset,
} from '../types/ketchup-lite/components';
import { KulDataCell } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { LogSeverity, TooltipUploadCallback } from '../types/manager/manager';
import { CustomWidgetName, TagName } from '../types/widgets/_common';
import { Card, CardDeserializedValue, CardState } from '../types/widgets/card';
import { CardsWithChip, CardsWithChipState } from '../types/widgets/cardsWithChip';
import { getLFManager, getApiRoutes, unescapeJson, getCustomWidget } from '../utils/common';

export const CARD_PROPS_TO_SERIALIZE = ['kulData', 'kulStyle'];

export const EV_HANDLERS = {
  //#region Button handler
  button: (state: CardState | CardsWithChipState, e: CustomEvent<KulButtonEventPayload>) => {
    const { comp, eventType } = e.detail;

    const { grid, node } = state;

    switch (eventType) {
      case 'click':
        const cards = Array.from(grid.querySelectorAll(TagName.KulCard));
        if (cards?.length) {
          const models: APIMetadataEntry[] = [];
          const widget = getCustomWidget(node, CustomWidgetName.card);

          cards.forEach((card) => {
            const hashCell = card.kulData?.nodes?.[0]?.cells?.kulCode;
            if (hashCell) {
              const { hash, path } = JSON.parse(JSON.stringify(hashCell.value));
              const dataset = card.kulData;
              comp.kulShowSpinner = true;
              models.push({ apiFlag: true, dataset, hash, path });
            }
          });

          if (models.length) {
            const value: CardDeserializedValue = {
              props: [],
            };
            cardPlaceholders(widget, cards.length);
            apiCall(models, true).then((r) => {
              for (let index = 0; index < r.length; index++) {
                const cardProps = r[index];
                if (cardProps.kulData) {
                  value.props.push(cardProps);
                } else {
                  value.props.push({
                    ...cardProps,
                    kulData: models[index].dataset,
                  });
                }
              }
              widget.options.setValue(JSON.stringify(value));
              requestAnimationFrame(() => (comp.kulShowSpinner = false));
            });
          }
        }
        break;
    }
  },
  //#endregion
  //#region Card handler
  card: (e: CustomEvent<KulCardEventPayload>) => {
    const { comp, eventType, originalEvent } = e.detail;

    const node = comp.kulData?.nodes?.[0];

    switch (eventType) {
      case 'click':
        if (node?.value) {
          window.open(String(node.value).valueOf(), '_blank');
        }
        break;
      case 'contextmenu':
        const ogEv = originalEvent as MouseEvent;
        const lfManager = getLFManager();

        ogEv.preventDefault();
        ogEv.stopPropagation();

        const tip = lfManager.getManagers().tooltip;

        const cb: TooltipUploadCallback = async (b64image: string) => {
          const node = comp.kulData?.nodes?.[0];
          if (node) {
            const code = node?.cells?.kulCode;
            if (code) {
              try {
                const path = JSON.parse(JSON.stringify(code.value)).path;
                lfManager.log(
                  `Updating cover for model with path: ${path}`,
                  { b64image },
                  LogSeverity.Info,
                );
                getApiRoutes().metadata.updateCover(path, b64image);
                const image = node?.cells?.kulImage;
                if (image) {
                  image.value = `data:image/png;charset=utf-8;base64,${b64image}`;
                  comp.refresh();
                  tip.destroy();
                }
              } catch (error) {
                lfManager.log(
                  "Failed to fetch the model's path from .info file",
                  { b64image },
                  LogSeverity.Error,
                );
              }
            }
          }
        };

        tip.create({ x: ogEv.x, y: ogEv.y }, 'upload', cb);
        break;
    }
  },
  //#endregion
};
//#region cardPlaceholders
export const cardPlaceholders = (widget: Card | CardsWithChip, count: number) => {
  const dummyValue: CardDeserializedValue = {
    props: [],
  };

  for (let index = 0; index < count; index++) {
    dummyValue.props.push(DOWNLOAD_PLACEHOLDERS);
  }
  widget.options.setValue(JSON.stringify(dummyValue));
};
//#endregion
//#region apiCall
export const apiCall = async (
  models: APIMetadataEntry[],
  forcedSave = false,
): Promise<Partial<HTMLKulCardElement>[]> => {
  const promises: Promise<Partial<HTMLKulCardElement>>[] = models.map(
    async ({ dataset, hash, path, apiFlag }) => {
      if (apiFlag) {
        const payload = await getApiRoutes().metadata.get(hash);
        return onResponse(dataset, path, forcedSave, payload);
      } else {
        return onResponse(dataset, path, forcedSave, null);
      }
    },
  );

  return Promise.all(promises);
};
//#endregion
//#region onResponse
const onResponse = async (
  dataset: KulDataDataset,
  path: string,
  forcedSave: boolean,
  payload: GetMetadataAPIPayload,
) => {
  const r = payload?.data;
  const id = r?.id;
  const props: Partial<HTMLKulCardElement> = {
    kulStyle: '.sub-2.description { white-space: pre-wrap; }',
  };

  switch (typeof id) {
    case 'number':
      const code = dataset?.nodes?.[0]?.cells?.kulCode;
      const civitaiDataset = prepareValidDataset(r, code);
      props.kulData = civitaiDataset;
      getApiRoutes().metadata.save(path, civitaiDataset, forcedSave);
      break;
    case 'string':
      const node = dataset.nodes[0];
      node.description = '';
      node.value = '';
      node.cells.kulButton = {
        kulDisabled: true,
        kulIcon: 'warning',
        kulLabel: 'Not found on CivitAI!',
        kulStyling: 'flat',
        shape: 'button',
        value: '',
      };
      node.cells.text3 = {
        value: "Whoops! It seems like something's off. Falling back to local data.",
      };
      props.kulData = dataset;
      break;
  }

  return props;
};
//#endregion
//#region prepCards
export const prepCards = (container: HTMLDivElement, propsArray: Partial<HTMLKulCardElement>[]) => {
  let count = 0;

  const cards = container.querySelectorAll('kul-card');
  cards.forEach((c) => c.remove());

  for (let index = 0; propsArray && index < propsArray.length; index++) {
    const card = container.appendChild(createCard());
    count += 1;

    const props = propsArray[index];
    if (props.kulData) {
      for (const key in props) {
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
                if (node.value) {
                  card.title = String(node.value).valueOf();
                }
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
  }

  return count;
};
//#endregion
//#region getCardProps
export const getCardProps = (container: HTMLDivElement) => {
  const propsArray: Partial<HTMLKulCardElement>[] = [];
  const cards = container.querySelectorAll('kul-card');

  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    const props: Partial<HTMLKulCardElement> = CARD_PROPS_TO_SERIALIZE.reduce((acc, p) => {
      if (card[p]) {
        acc[p] = card[p];
      }
      return acc;
    }, {} as Partial<HTMLKulCardElement>);

    propsArray.push(props);
  }

  return propsArray;
};

export const createCard = () => {
  const card = document.createElement(TagName.KulCard);
  card.addEventListener(KulEventName.KulCard, EV_HANDLERS.card);
  return card;
};

//#endregion
//#region prepareValidDataset
const prepareValidDataset = (r: CivitAIModelData, code: KulDataCell<'code'>) => {
  const dataset: KulDataDataset = {
    nodes: [
      {
        cells: { kulCode: code ?? null, kulImage: null, text1: null, text2: null, text3: null },
        id: r.id.toString(),
        description: "Click to open the model's page on CivitAI",
        value: `https://civitai.com/models/${r.modelId}`,
      },
    ],
  };
  const cells = dataset.nodes[0].cells;
  cells.kulImage = {
    kulStyle: 'img {object-fit: cover;}',
    shape: 'image',
    value: r.images[0].url,
  };
  cells.text1 = { value: r.model.name };
  cells.text2 = { value: r.name };
  cells.text3 = {
    value: `- Info:
Type: ${r.model?.type ? r.model.type : 'N/A'}
Status: ${r.status ? r.status : 'N/A'}
Base model: ${r.baseModel ? r.baseModel : 'N/A'}
Description: ${r.description ? r.description : 'N/A'}

- Trained words:
${r.trainedWords?.length ? r.trainedWords.join(', ') : 'N/A'}

- Stats:
Updated at: ${r.updatedAt ? r.updatedAt : 'N/A'}
Downloads: ${r.stats?.downloadCount ? r.stats.downloadCount : 'N/A'}
Rating: ${r.stats?.rating ? r.stats.rating : 'N/A'}
Thumbs up: ${r.stats?.thumbsUpCount ? r.stats.thumbsUpCount : 'N/A'}

(data pulled from CivitAI at: ${new Date().toLocaleDateString()})
`,
  };
  return dataset;
};
//#endregion
