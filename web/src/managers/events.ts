import { EventName, type DisplayJSONPayload, type ImageHistogramPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { BaseWidgetCallback, CustomWidgetName } from '../types/widgets';
import { getApiRoutes, getLFManager } from '../utils/utils';

/*-------------------------------------------------*/
/*             E v e n t s   C l a s s             */
/*-------------------------------------------------*/

export class LFEvents {
  #getW(node: NodeType, name: CustomWidgetName, addW: BaseWidgetCallback) {
    return node?.widgets?.find((w) => w.name === name) || addW(node, name).widget;
  }

  eventHandler = {
    displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: BaseWidgetCallback) => {
      const name = EventName.displayJson;
      getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

      const payload = event.detail;
      const node = getApiRoutes().getNodeById(payload.id);
      if (node) {
        const widget = this.#getW(node, CustomWidgetName.code, addW);
        const comp = widget.options.getComp();
        comp.kulLanguage = 'json';
        widget.options.setValue(event.detail.json);
        getApiRoutes().redraw();
      }
    },
    imageHistogram: (event: CustomEvent<ImageHistogramPayload>, addW: BaseWidgetCallback) => {
      const name = EventName.imageHistogram;
      getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

      const payload = event.detail;
      const node = getApiRoutes().getNodeById(payload.id);
      if (node) {
        const widget = this.#getW(node, CustomWidgetName.chart, addW);
        const comp = widget.options.getComp();
        widget.options.setValue(event.detail.dataset);
        getApiRoutes().redraw();
      }
    },
  };

  get = {
    eventHandlers: this.eventHandler,
  };
}
