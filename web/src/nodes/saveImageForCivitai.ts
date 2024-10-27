import { EventName, SaveImageForCivitAIPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type ImagePreviewWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.saveImageForCivitai;

export const saveImageForCivitaiFactory = {
  eventHandler: (
    event: CustomEvent<SaveImageForCivitAIPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.imagePreview>,
  ) => {
    const name = EventName.saveImageForCivitAI;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.imagePreview, addW);
      widget.options.setValue(JSON.stringify(payload));
      getApiRoutes().redraw();
    }
  },
  register: (
    setW: ImagePreviewWidgetSetter,
    addW: BaseWidgetCallback<CustomWidgetName.imagePreview>,
  ) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.imagePreview);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
