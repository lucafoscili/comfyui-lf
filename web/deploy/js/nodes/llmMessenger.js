import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets.js';
import { areJSONEqual, getApiRoutes, getCustomWidget, getInput, getLFManager, isValidJSON, unescapeJson, } from '../utils/common.js';
const NAME = NodeName.llmMessenger;
export const llmMessengerFactory = {
    register: (setW) => {
        const extension = {
            name: 'LFExt_' + NAME,
            beforeRegisterNodeDef: async (nodeType) => {
                if (nodeType.comfyClass === NAME) {
                    const onConnectionsChange = nodeType.prototype.onConnectionsChange;
                    nodeType.prototype.onConnectionsChange = function () {
                        const r = onConnectionsChange?.apply(this, arguments);
                        const node = this;
                        const jsonInput = getInput(node, ComfyWidgetName.json);
                        const linkInput = getApiRoutes().getLinkById(jsonInput?.link?.toString());
                        const nodeInput = getApiRoutes().getNodeById(linkInput?.origin_id?.toString());
                        if (!jsonInput || !linkInput || !nodeInput) {
                            return;
                        }
                        const messengerW = getCustomWidget(node, CustomWidgetName.messenger);
                        const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
                        if (!messengerW || !datasetW) {
                            return;
                        }
                        const dataset = datasetW.options.getValue();
                        const messenger = messengerW.options.getComp();
                        try {
                            const newData = unescapeJson(dataset).parsedJson;
                            if (isValidJSON(newData) && isValidJSON(messenger.kulData)) {
                                if (!areJSONEqual(newData, messenger.kulData)) {
                                    messenger.kulData = newData;
                                    messenger.reset();
                                    getLFManager().log('Updated chip data', { dataset }, LogSeverity.Info);
                                }
                            }
                            else {
                                if (isValidJSON(newData)) {
                                    messenger.kulData = newData;
                                    messenger.reset();
                                    getLFManager().log('Set chip data', { dataset }, LogSeverity.Info);
                                }
                                else {
                                    getLFManager().log('Invalid JSON data', { dataset, error: 'Invalid JSON' }, LogSeverity.Warning);
                                }
                            }
                        }
                        catch (error) {
                            getLFManager().log('Error processing chip data', { dataset, error }, LogSeverity.Error);
                        }
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
