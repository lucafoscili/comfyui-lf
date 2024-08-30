import { EventName, MultipleImageResizeForWebPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, TreeWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes, getLFManager, getWidget } from '../utils/common';

const NAME = NodeName.multipleImageResizeForWeb;

export const multipleImageResizeForWebFactory = {
  eventHandler: (
    event: CustomEvent<MultipleImageResizeForWebPayload>,
    addW: BaseWidgetCallback,
  ) => {
    const name = EventName.multipleImageResizeForWeb;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getWidget(node, CustomWidgetName.tree, addW);
      const comp = widget.options.getComp();
      comp.kulAccordionLayout = true;
      comp.kulSelectable = false;
      widget.options.setValue(event.detail.dataset);
      getApiRoutes().redraw();
    }
  },
  register: (setW: TreeWidgetsSetter, addW: BaseWidgetCallback) => {
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
