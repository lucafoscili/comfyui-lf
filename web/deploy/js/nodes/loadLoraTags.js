import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { cardPlaceholders, fetchModelMetadata } from '../utils/api.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.loadLoraTags;
export const loadLoraTagsFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.loadLoraTags;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const widget = getCustomWidget(node, CustomWidgetName.cardsWithChip, addW);
            cardPlaceholders(widget, 1);
            const value = {
                cardPropsArray: [],
                chipDataset: payload.chipDataset,
            };
            const models = [];
            for (let index = 0; index < payload.datasets?.length; index++) {
                const apiFlag = payload.apiFlags[index];
                const dataset = payload.datasets[index];
                const hash = payload.hashes[index];
                const path = payload.paths[index];
                models.push({ dataset, hash, path, apiFlag });
            }
            fetchModelMetadata(models).then((r) => {
                for (let index = 0; index < r.length; index++) {
                    const cardProps = r[index];
                    if (cardProps.kulData) {
                        value.cardPropsArray.push(cardProps);
                    }
                    else {
                        value.cardPropsArray.push({
                            ...cardProps,
                            kulData: models[index].dataset,
                        });
                    }
                }
                requestAnimationFrame(() => widget.options.setValue(JSON.stringify(value)));
                getApiRoutes().redraw();
            });
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
                        addW(node, CustomWidgetName.cardsWithChip);
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
