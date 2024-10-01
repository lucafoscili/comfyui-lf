import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { fetchModelMetadata } from '../utils/api.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.embeddingSelector;
export const embeddingSelectorFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.embeddingSelector;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const widget = getCustomWidget(node, CustomWidgetName.card, addW);
            if (payload.civitaiInfo) {
                fetchModelMetadata(widget, [
                    { dataset: payload.dataset, hash: payload.hash, path: payload.modelPath },
                ]);
            }
            else {
                const value = {
                    propsArray: [{ kulData: payload.dataset }],
                    template: 'repeat(1, 1fr) / repeat(1, 1fr)',
                };
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
