import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { fetchModelMetadata } from '../utils/api.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.loraAndEmbeddingSelector;
export const loraAndEmbeddingSelectorFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.loraAndEmbeddingSelector;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const widget = getCustomWidget(node, CustomWidgetName.card, addW);
            const value = {
                propsArray: [],
                template: 'repeat(1, 1fr) / repeat(2, 1fr)',
            };
            const models = [
                {
                    dataset: payload.embeddingDataset,
                    hash: payload.embeddingHash,
                    path: payload.embeddingModelPath,
                },
                {
                    dataset: payload.loraDataset,
                    hash: payload.loraHash,
                    path: payload.loraModelPath,
                },
            ];
            if (payload.civitaiInfo) {
                fetchModelMetadata(widget, models).then((r) => {
                    for (let index = 0; index < r.length; index++) {
                        const d = r[index];
                        if (d) {
                            value.propsArray.push({
                                kulData: d,
                                kulStyle: '.sub-2.description { white-space: pre-wrap; }',
                            });
                        }
                    }
                    widget.options.setValue(JSON.stringify(value));
                });
            }
            else {
                value.propsArray.push({ kulData: payload.loraDataset });
                value.propsArray.push({ kulData: payload.embeddingDataset });
                widget.options.setValue(JSON.stringify(value));
            }
            getApiRoutes().redraw();
        }
    },
    register: (setW, addW) => {
        const extension = {
            name: 'LFExt_' + NAME,
            beforeRegisterNodeDef: async (nodeType) => {
                if (nodeType.comfyClass === NAME) {
                    const onNodeCreated = nodeType.prototype.onNodeCreated;
                    nodeType.prototype.onNodeCreated = function () {
                        const r = onNodeCreated?.apply(this, arguments);
                        const node = this;
                        addW(node, CustomWidgetName.card);
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
