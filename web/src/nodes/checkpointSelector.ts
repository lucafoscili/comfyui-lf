import { CheckpointSelectorPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CardWidgetDeserializedValue,
  CustomWidgetName,
  type BaseWidgetCallback,
  type CardWidgetSetter,
} from '../types/widgets';
import { fetchModelMetadata } from '../utils/api';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.checkpointSelector;

export const checkpointSelectorFactory = {
  eventHandler: (event: CustomEvent<CheckpointSelectorPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.checkpointSelector;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.card, addW);
      if (payload.civitaiInfo) {
        fetchModelMetadata(widget, [
          { dataset: payload.dataset, hash: payload.hash, path: payload.modelPath },
        ]);
      } else {
        const value: CardWidgetDeserializedValue = {
          propsArray: [{ kulData: payload.dataset }],
          template: 'repeat(1, 1fr) / repeat(1, 1fr)',
        };
        widget.options.setValue(JSON.stringify(value));
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
