import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.displayPrimitiveAsJson;
export const displayPrimitiveAsJsonFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.displayPrimitiveAsJson;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const widget = getCustomWidget(node, CustomWidgetName.code, addW);
            widget.options.setValue(event.detail.dataset);
            getApiRoutes().redraw();
        }
    },
    register: (setW) => {
        const extension = {
            name: 'LFExt_' + NAME,
            getCustomWidgets: setW,
        };
        getApiRoutes().register(extension);
    },
};
