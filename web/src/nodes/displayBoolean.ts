import { DisplayBooleanPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.displayBoolean;

export const displayBooleanFactory = {
  eventHandler: (event: CustomEvent<DisplayBooleanPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.displayBoolean;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.code, addW);
      widget.options.setValue(event.detail.value);
      getApiRoutes().redraw();
    }
  },
  register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.code);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
