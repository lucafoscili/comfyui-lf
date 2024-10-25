import { EventName, SwitchImagePayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { Extension, NodeName } from '../types/nodes';
import {
  BooleanViewerWidgetSetter,
  CustomWidgetName,
  type BaseWidgetCallback,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.switchFloat;

export const switchFloatFactory = {
  eventHandler: (
    event: CustomEvent<SwitchImagePayload>,
    addW: BaseWidgetCallback<CustomWidgetName.booleanViewer>,
  ) => {
    const name = EventName.switchFloat;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.booleanViewer, addW);
      const comp = widget.options.getComp();
      comp.refresh();
      widget.options.setValue(String(event.detail.bool + '').valueOf());
      getApiRoutes().redraw();
    }
  },
  register: (
    setW: BooleanViewerWidgetSetter,
    addW: BaseWidgetCallback<CustomWidgetName.booleanViewer>,
  ) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.booleanViewer);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
