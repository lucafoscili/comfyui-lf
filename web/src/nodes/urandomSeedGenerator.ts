import { EventName, UrandomSeedGeneratorPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.urandomSeedGenerator;

export const uRandomSeedGeneratorFactory = {
  eventHandler: (event: CustomEvent<UrandomSeedGeneratorPayload>, addW: BaseWidgetCallback) => {
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
  register: (setW: TreeWidgetSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
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
