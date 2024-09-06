import { EventName, RandomBooleanPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  RollViewerWidgetsSetter,
  type BaseWidgetCallback,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.randomBoolean;

export const randomBooleanFactory = {
  eventHandler: (event: CustomEvent<RandomBooleanPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.randomBoolean;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.rollViewer, addW);
      widget.options.setValue(payload);
      getApiRoutes().redraw();
    }
  },
  register: (setW: RollViewerWidgetsSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.rollViewer);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
