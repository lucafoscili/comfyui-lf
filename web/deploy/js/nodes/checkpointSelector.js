import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { fetchModelMetadata } from '../utils/api.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.checkpointSelector;
export const checkpointSelectorFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.checkpointSelector;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const { civitaiInfo, dataset, hash, modelPath } = payload;
            const widget = getCustomWidget(node, CustomWidgetName.card, addW);
            const value = {
                propsArray: [],
                template: '',
            };
            value.propsArray.push({ kulData: dataset });
            if (civitaiInfo) {
                fetchModelMetadata(widget, [{ dataset, hash, path: modelPath }]).then((r) => {
                    for (let index = 0; index < r.length; index++) {
                        const dataset = r[index];
                        if (dataset) {
                            value.propsArray.push({
                                kulData: dataset,
                                kulStyle: '.sub-2.description { white-space: pre-wrap; }',
                            });
                        }
                    }
                    widget.options.setValue(JSON.stringify(value));
                });
            }
            else {
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
