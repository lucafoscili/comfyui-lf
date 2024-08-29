import { DisplayJSONPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type CodeWidgetsSetter,
} from '../types/widgets';
import { getApiRoutes, getLFManager, getWidget } from '../utils/common';

const NAME = NodeName.displayJson;

export const displayJsonFactory = {
  eventHandler: (event: CustomEvent<DisplayJSONPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.displayJson;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getWidget(node, CustomWidgetName.code, addW);
      const comp = widget.options.getComp();
      comp.kulLanguage = 'json';
      widget.options.setValue(event.detail.json);
      getApiRoutes().redraw();
    }
  },
  register: (setW: CodeWidgetsSetter, addW: BaseWidgetCallback) => {
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
