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

  constructor() {}

  #initProps(node: NodeType, payload: Partial<EventPayload>) {
    const isInitialized = node.lfProps?.isInitialized;
    if (isInitialized) {
      node.lfProps = Object.assign(node.lfProps, {
        ...node.lfProps,
        payload,
      });
    } else {
      node.lfProps = { isInitialized: true, payload: { id: '', isDebug: false, ...payload } };
    }
  }

  #getW(node: NodeType, name: CustomWidgetNames, addW: WidgetCallback) {
    return node?.widgets?.find((w) => w.name === name) || addW(node, name).widget;
  }

  eventHandler = {
    displayJson: (event: CustomEvent<DisplayJSONPayload>, addW: WidgetCallback) => {
      getLFManager().log(`Event '${this.#NAMES.displayJson}' received`, { event }, 'success');

      const payload = event.detail;
      const node = getApiRoutes().getNodeById(payload.id);
      if (node) {
        this.#initProps(node, payload);
        const widget = this.#getW(node, 'KUL_CODE', addW);
        const comp = (widget.options as any).getComp();
        comp.kulLanguage = 'json';
        (widget.options as any).setValue(event.detail.json);
        getApiRoutes().redraw();
      }
    },
  };

  get = {
    eventHandlers: this.eventHandler,
  };
}
