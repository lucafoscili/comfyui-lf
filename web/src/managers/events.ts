import { getApiRoutes, getLFManager } from '../utils/utils';

/*-------------------------------------------------*/
/*             E v e n t s   C l a s s             */
/*-------------------------------------------------*/

export class LFEvents {
  #NAMES: { [index: string]: EventNames } = {
    controlPanel: 'lf-controlpanel',
    displayJson: 'lf-displayjson',
    imageHistogram: 'lf-imagehistogram',
    loadImages: 'lf-loadimages',
    switchImage: 'lf-switchimage',
    switchInteger: 'lf-switchinteger',
    switchJSON: 'lf-switchjson',
    switchString: 'lf-switchstring',
  };

  #getW(node: NodeType, name: CustomWidgetNames, addW: WidgetCallback) {
    return node?.widgets?.find((w) => w.name === name) || addW(node, name).widget;
  }

  eventHandler = {
    displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: WidgetCallback) => {
      const name = this.#NAMES.displayJson;
      getLFManager().log(`Event '${name}' received`, { event }, 'success');

      const payload = event.detail;
      const node = getApiRoutes().getNodeById(payload.id);
      if (node) {
        const widget = this.#getW(node, 'KUL_CODE', addW);
        const comp = widget.options.getComp();
        comp.kulLanguage = 'json';
        widget.options.setValue(event.detail.json);
        getApiRoutes().redraw();
      }
    },
    imageHistogram: (event: CustomEvent<ImageHistogramPayload>, addW: WidgetCallback) => {
      const name = this.#NAMES.imageHistogram;
      getLFManager().log(`Event '${name}' received`, { event }, 'success');

      const payload = event.detail;
      const node = getApiRoutes().getNodeById(payload.id);
      if (node) {
        const widget = this.#getW(node, 'KUL_CHART', addW);
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
