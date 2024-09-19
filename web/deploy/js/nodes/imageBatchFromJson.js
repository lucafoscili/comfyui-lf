import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
const NAME = NodeName.imageListFromJSON;
export const imageListFromJsonFactory = {
    eventHandler: (event, addW) => {
        const name = EventName.blurImages;
        getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
        const payload = event.detail;
        const node = getApiRoutes().getNodeById(payload.id);
        if (node) {
            const widget = getCustomWidget(node, CustomWidgetName.imagePreview, addW);
            widget.options.setValue({
                ...payload,
                selectedIndex: undefined,
                selectedName: undefined,
            });
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
