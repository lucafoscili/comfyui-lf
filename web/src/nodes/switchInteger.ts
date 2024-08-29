import { EventName, SwitchImagePayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { Extension, NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  TextfieldWidgetsSetter,
  type BaseWidgetCallback,
} from '../types/widgets';
import { getApiRoutes, getLFManager, getWidget } from '../utils/common';

const NAME = NodeName.switchInteger;

export const switchIntegerFactory = {
  eventHandler: (event: CustomEvent<SwitchImagePayload>, addW: BaseWidgetCallback) => {
    const name = EventName.switchInteger;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getWidget(node, CustomWidgetName.textfield, addW);
      const comp = widget.options.getComp();
      comp.refresh();
      widget.options.setValue(String(event.detail.bool + '').valueOf());
      getApiRoutes().redraw();
    }
  },
  register: (setW: TextfieldWidgetsSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.textfield);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
