import { getApiRoutes } from './common.js';
//#region Placeholders
const DUMMY_PROPS = {
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
export const cardPlaceholders = (widget, count) => {
    const dummyValue = {
        props: [],
    };
    for (let index = 0; index < count; index++) {
        dummyValue.props.push(DUMMY_PROPS);
    }
    widget.options.setValue(JSON.stringify(dummyValue));
};
//#endregion
//#region API call
export const fetchModelMetadata = async (models, forcedSave = false) => {
    const promises = models.map(async ({ dataset, hash, path, apiFlag }) => {
        if (apiFlag) {
            const payload = await getApiRoutes().metadata.get(hash);
            return onResponse(dataset, path, forcedSave, payload);
        }
        else {
            return onResponse(dataset, path, forcedSave, null);
        }
    });
    return Promise.all(promises);
};
//#endregion
//#region API response
const onResponse = async (dataset, path, forcedSave, payload) => {
    const r = payload?.data;
    const id = r?.id;
    const props = {
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
//#region prepareValidDataset
const prepareValidDataset = (r, code) => {
    const dataset = {
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
