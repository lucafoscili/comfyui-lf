import { DisplayPrimitiveAsJSONPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, TreeWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.displayPrimitiveAsJson;

export const displayPrimitiveAsJsonFactory = {
  eventHandler: (event: CustomEvent<DisplayPrimitiveAsJSONPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.displayPrimitiveAsJson;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.tree, addW);
      const comp = widget.options.getComp();
      comp.kulAccordionLayout = true;
      widget.options.setValue(event.detail.dataset);
      getApiRoutes().redraw();
    }
  },
  register: (setW: TreeWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
