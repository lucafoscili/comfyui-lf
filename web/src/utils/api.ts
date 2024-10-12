import { KulDataDataset } from '../types/ketchup-lite/components';
import { KulDataCell } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { APIMetadataEntry, GetMetadataAPIPayload } from '../types/manager';
import { CardsWithChipWidget, CardWidget, CardWidgetDeserializedValue } from '../types/widgets';
import { getApiRoutes } from './common';

const DUMMY_PROPS: Partial<HTMLKulCardElement> = {
  kulData: {
    nodes: [
      {
        cells: {
          kulImage: { shape: 'image', value: 'cloud_download' },
          kulText: { shape: 'text', value: 'Fetching metadata from CivitAI...' },
        },
        id: '0',
      },
    ],
  },
};

export const cardPlaceholders = (widget: CardWidget | CardsWithChipWidget, count: number) => {
  const dummyValue: CardWidgetDeserializedValue = {
    propsArray: [],
  };

  for (let index = 0; index < count; index++) {
    dummyValue.propsArray.push(DUMMY_PROPS);
  }
  widget.options.setValue(JSON.stringify(dummyValue));
};

export const fetchModelMetadata = async (
  models: APIMetadataEntry[],
  forcedSave = false,
): Promise<Partial<HTMLKulCardElement>[]> => {
  const promises: Promise<Partial<HTMLKulCardElement>>[] = models.map(
    async ({ dataset, hash, path, apiFlag }) => {
      if (apiFlag) {
        const payload = await getApiRoutes().metadata.get(hash);
        return onResponse(dataset, path, hash, forcedSave, payload);
      } else {
        return onResponse(dataset, path, hash, forcedSave, null);
      }
    },
  );

  return Promise.all(promises);
};

const onResponse = async (
  dataset: KulDataDataset,
  path: string,
  hash: string,
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
      const civitaiDataset = prepareValidDataset(r);
      props.kulData = civitaiDataset;
      props.kulStyle = '.sub-2.description { white-space: pre-wrap; }';
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

  if (props.kulData && hash && path) {
    props.kulData.nodes[0].cells.kulCode = hashCell(hash, path);
  }

  return props;
};

const prepareValidDataset = (r: CivitAIModelData) => {
  const dataset: KulDataDataset = {
    nodes: [
      {
        cells: { kulImage: null, text1: null, text2: null, text3: null },
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

const hashCell = (hash: string, path: string) => {
  return {
    shape: 'code',
    value: JSON.stringify({ hash: hash.valueOf(), path }),
  } as KulDataCell<'code'>;
};
