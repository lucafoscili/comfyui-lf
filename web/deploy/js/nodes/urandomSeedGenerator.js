import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.urandomSeedGenerator;
export const uRandomSeedGeneratorFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.urandomSeedGenerator;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const isHistoryEnabled = payload.isHistoryEnabled;
        const node = getApiRoutes().getNodeById(payload.id);
        if (isHistoryEnabled && node) {
            const widget = getCustomWidget(node, CustomWidgetName.tree, addW);
            const comp = widget.options.getComp();
            comp.kulAccordionLayout = true;
            comp.kulSelectable = false;
            widget.options.setValue(event.detail.dataset);
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
                        addW(node, CustomWidgetName.tree);
                        return r;
                    };
                }
            },
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};