import { EventName, LoraAndEmbeddingSelectorPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CardWidgetDeserializedValue,
  CardWidgetSetter,
  CustomWidgetName,
  type BaseWidgetCallback,
} from '../types/widgets';
import { fetchModelMetadata } from '../utils/api';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.loraandEmbeddingSelector;

export const loraandEmbeddingSelectorFactory = {
  eventHandler: (event: CustomEvent<LoraAndEmbeddingSelectorPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.loraAndEmbeddingSelector;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.card, addW);
      if (payload.civitaiInfo) {
        fetchModelMetadata(widget, [
          {
            dataset: payload.loraDataset,
            hash: payload.loraHash,
            path: payload.loraModelPath,
          },
          {
            dataset: payload.embeddingDataset,
            hash: payload.embeddingHash,
            path: payload.embeddingModelPath,
          },
        ]);
      } else {
        const value: CardWidgetDeserializedValue = {
          propsArray: [{ kulData: payload.loraDataset }, { kulData: payload.embeddingDataset }],
          template: 'repeat(1, 1fr) / repeat(2, 1fr)',
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
