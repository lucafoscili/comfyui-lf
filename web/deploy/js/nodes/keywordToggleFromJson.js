import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets.js';
import { areJSONEqual, getApiRoutes, getCustomWidget, getInput, getLFManager, isValidJSON, deserializeValue, } from '../utils/common.js';
const NAME = NodeName.keywordToggleFromJson;
export const keywordToggleFromJsonFactory = {
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
                        const chipW = getCustomWidget(node, CustomWidgetName.chip);
                        const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
                        if (!chipW || !datasetW) {
                            return;
                        }
                        const dataset = datasetW.options.getValue();
                        const chip = chipW.options.getComp();
                        try {
                            const newData = deserializeValue(dataset).parsedJson;
                            if (isValidJSON(newData) && isValidJSON(chip.kulData)) {
                                if (!areJSONEqual(newData, chip.kulData)) {
                                    chip.kulData = newData;
                                    getLFManager().log('Updated chip data', { dataset }, LogSeverity.Info);
                                }
                            }
                            else {
                                if (isValidJSON(newData)) {
                                    chip.kulData = newData;
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
