import { CheckpointSelectorPayload, EventName } from '../types/events';
import { KulDataDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CardWidget,
  CustomWidgetName,
  type BaseWidgetCallback,
  type CardWidgetSetter,
} from '../types/widgets';
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
      const comp = widget.options.getComp();
      if (payload.civitaiInfo) {
        fetchExtraInfo(widget, payload, comp);
      } else {
        widget.options.setValue(payload.dataset);
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

const fetchExtraInfo = (
  widget: CardWidget,
  payload: CheckpointSelectorPayload,
  comp: HTMLKulCardElement,
) => {
  widget.options.setValue({
    nodes: [{ cells: { kulText: { shape: 'text', value: 'Loading...' } }, id: '0' }],
  });
  getApiRoutes()
    .modelInfoFromCivitAI(payload.hash)
    .then(async (r) => {
      const id = r.id;
      if (id) {
        switch (typeof id) {
          case 'number':
            const dataset: KulDataDataset = {
              nodes: [
                {
                  cells: { kulImage: null, text1: null, text2: null, text3: null },
                  id: id.toString(),
                },
              ],
            };
            const cells = dataset.nodes[0].cells;
            cells.kulImage = {
              kulStyle: 'img {object-fit: cover;}',
              shape: 'image',
              value: r.images[0].url,
            };
            cells.text1 = { value: r.model.name };
            cells.text2 = { value: r.name };
            cells.text3 = {
              value: `
Type: ${r.model.type}
Base model: ${r.baseModel}
Description: ${r.description}
Status: ${r.status}

Stats
Downloads: ${r.stats.downloadCount}
Rating: ${r.stats.rating}
Rating (count): ${r.stats.ratingCount}
Thumbs up: ${r.stats.thumbsUpCount}
                `,
            };
            comp.dataset.civitaiLink = `https://civitai.com/models/${r.id}`;
            comp.kulData = dataset;
            break;
          default:
            comp.dataset.civitaiLink = ``;
            comp.title = `Model not found!`;
            payload.dataset.nodes[0].cells.kulButton = {
              kulDisabled: true,
              kulIcon: 'warning',
              shape: 'button',
              value: '',
            };
            payload.dataset.nodes[0].cells.text3 = {
              value: 'Model not found on CivitAI! Falling back to local data.',
            };
            widget.options.setValue(payload.dataset);
            break;
        }
      }
    });
};
