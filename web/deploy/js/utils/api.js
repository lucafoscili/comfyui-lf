import { getApiRoutes } from './common.js';
export const fetchModelMetadata = (widget, payload, comp) => {
    widget.options.setValue({
        nodes: [
            {
                cells: {
                    kulImage: { shape: 'image', value: 'cloud_download' },
                    kulText: { shape: 'text', value: 'Loading...' },
                },
                id: '0',
            },
        ],
    });
    getApiRoutes()
        .modelInfoFromCivitAI(payload.hash)
        .then(async (r) => {
        const id = r.id;
        if (id) {
            switch (typeof id) {
                case 'number':
                    const dataset = {
                        nodes: [
                            {
                                cells: { kulImage: null, text1: null, text2: null, text3: null },
                                id: id.toString(),
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
                    comp.dataset.civitaiLink = `https://civitai.com/models/${r.modelId}`;
                    comp.kulData = dataset;
                    comp.kulStyle = '.sub-2.description { white-space: pre-wrap; }';
                    comp.title = "Click to open the model's page on CivitAI";
                    getApiRoutes().saveModelMetadata(payload.modelPath, dataset);
                    break;
                default:
                    comp.dataset.civitaiLink = ``;
                    comp.title = id;
                    payload.dataset.nodes[0].cells.kulButton = {
                        kulDisabled: true,
                        kulIcon: 'warning',
                        kulStyling: 'icon',
                        shape: 'button',
                        value: '',
                    };
                    payload.dataset.nodes[0].cells.text3 = {
                        value: "Whoops! It seems like something's off. Falling back to local data.",
                    };
                    widget.options.setValue(payload.dataset);
                    break;
            }
        }
    });
};
