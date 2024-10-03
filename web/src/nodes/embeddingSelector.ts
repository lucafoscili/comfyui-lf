import { EmbeddingSelectorPayload, EventName } from '../types/events';
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

const NAME = NodeName.embeddingSelector;

export const embeddingSelectorFactory = {
  eventHandler: (event: CustomEvent<EmbeddingSelectorPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.embeddingSelector;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);

    if (node) {
      const { civitaiInfo, dataset, hash, modelPath } = payload;
      const widget = getCustomWidget(node, CustomWidgetName.card, addW);
      const value: CardWidgetDeserializedValue = {
        propsArray: [],
        template: '',
      };
      if (civitaiInfo) {
        fetchModelMetadata(widget, [{ dataset, hash, path: modelPath }]).then((r) => {
          for (let index = 0; index < r.length; index++) {
            const dataset = r[index];
            if (dataset) {
              value.propsArray.push({
                kulData: dataset,
                kulStyle: '.sub-2.description { white-space: pre-wrap; }',
              });
            }
          }
          widget.options.setValue(JSON.stringify(value));
        });
      } else {
        value.propsArray.push({ kulData: payload.dataset });
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
