import { EmbeddingSelectorPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CardWidgetDeserializedValue,
  CustomWidgetName,
  type BaseWidgetCallback,
  type CardWidgetSetter,
} from '../types/widgets';
import { cardPlaceholders, fetchModelMetadata } from '../utils/api';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.embeddingSelector;

export const embeddingSelectorFactory = {
  eventHandler: (event: CustomEvent<EmbeddingSelectorPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.embeddingSelector;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);

    if (node) {
      const { apiFlag, dataset, hash, path } = payload;
      const widget = getCustomWidget(node, CustomWidgetName.card, addW);
      cardPlaceholders(widget, 1);
      const value: CardWidgetDeserializedValue = {
        propsArray: [],
        template: '',
      };
      fetchModelMetadata([{ dataset, hash, path, apiFlag }]).then((r) => {
        for (let index = 0; index < r.length; index++) {
          const cardProps = r[index];
          if (cardProps.kulData) {
            value.propsArray.push(cardProps);
          } else {
            value.propsArray.push({
              ...cardProps,
              kulData: payload.dataset,
            });
          }
        }
        widget.options.setValue(JSON.stringify(value));

        getApiRoutes().redraw();
      });
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
