import { getApiRoutes } from './common.js';
const DUMMY_PROPS = {
    kulData: {
        nodes: [
            {
                cells: {
                    kulImage: { shape: 'image', value: 'cloud_download' },
                    kulText: { shape: 'text', value: 'Loading...' },
                },
                id: '0',
            },
        ],
    },
};
export const fetchModelMetadata = (widget, models) => {
    const dummyValue = {
        propsArray: [],
    };
    for (let index = 0; index < models.length; index++) {
        dummyValue.propsArray.push(DUMMY_PROPS);
    }
    widget.options.setValue(JSON.stringify(dummyValue));
    const promises = models.map(({ dataset, hash, path }) => getApiRoutes().modelInfoFromCivitAI(hash).then(onResponse.bind(onResponse, dataset, path)));
    return Promise.all(promises);
};
const onResponse = async (dataset, path, r) => {
    const id = r.id;
    const props = {};
    if (id) {
        switch (typeof id) {
            case 'number':
                const civitaiDataset = prepareValidDataset(r);
                props.kulData = civitaiDataset;
                props.kulStyle = '.sub-2.description { white-space: pre-wrap; }';
                getApiRoutes().saveModelMetadata(path, civitaiDataset);
                break;
            default:
                const node = dataset.nodes[0];
                node.description = '';
                node.value = '';
                node.cells.kulButton = {
                    kulDisabled: true,
                    kulIcon: 'warning',
                    kulStyling: 'icon',
                    shape: 'button',
                    value: '',
                };
                node.cells.text3 = {
                    value: "Whoops! It seems like something's off. Falling back to local data.",
                };
                props.kulData = dataset;
                break;
        }
    }
    return props.kulData;
};
const prepareValidDataset = (r) => {
    const dataset = {
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
