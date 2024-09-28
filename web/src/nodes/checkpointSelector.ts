import { CheckpointSelectorPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, type BaseWidgetCallback, type CardWidgetSetter } from '../types/widgets';
import { fetchModelInfo, getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.checkpointSelector;

export const checkpointSelectorFactory = {
  eventHandler: (event: CustomEvent<CheckpointSelectorPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.checkpointSelector;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.card, addW);
      const comp = widget.options.getComp();
      if (payload.civitaiInfo) {
        fetchModelInfo(widget, payload, comp);
      } else {
        widget.options.setValue(payload.dataset);
      }
      getApiRoutes().redraw();
    }
  },
  register: (setW: CardWidgetSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
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
