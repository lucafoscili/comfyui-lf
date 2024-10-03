import { EventName, LoadLoraTagsPayload } from '../types/events';
import { APIMetadataEntry, LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CardsWithChipWidgetDeserializedValue,
  CardsWithChipWidgetSetter,
  CustomWidgetName,
  type BaseWidgetCallback,
} from '../types/widgets';
import { cardPlaceholders, fetchModelMetadata } from '../utils/api';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.loadLoraTags;

export const loadLoraTagsFactory = {
  eventHandler: (event: CustomEvent<LoadLoraTagsPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.loadLoraTags;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.cardsWithChip, addW);
      cardPlaceholders(widget, 1);
      const value: CardsWithChipWidgetDeserializedValue = {
        cardPropsArray: [],
        chipDataset: payload.chipDataset,
      };
      const models: APIMetadataEntry[] = [];
      for (let index = 0; index < payload.datasets?.length; index++) {
        const apiFlag = payload.apiFlags[index];
        const dataset = payload.datasets[index];
        const hash = payload.hashes[index];
        const path = payload.paths[index];
        models.push({ dataset, hash, path, apiFlag });
      }
      fetchModelMetadata(models).then((r) => {
        for (let index = 0; index < r.length; index++) {
          const cardProps = r[index];
          if (cardProps.kulData) {
            value.cardPropsArray.push(cardProps);
          } else {
            value.cardPropsArray.push({
              ...cardProps,
              kulData: models[index].dataset,
            });
          }
        }
        widget.options.setValue(JSON.stringify(value));

        getApiRoutes().redraw();
      });
    }
  },
  register: (setW: CardsWithChipWidgetSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.cardsWithChip);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
