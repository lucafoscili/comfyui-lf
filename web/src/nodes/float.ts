import { EventName, FloatPayload } from '../types/events';
import { KulDataNode } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, ListWidgetsSetter, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.float;

export const floatFactory = {
  eventHandler: (event: CustomEvent<FloatPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.string;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const list = getCustomWidget(node, CustomWidgetName.list, addW);
      if (list) {
        const value = payload.value.toFixed(3);
        const strValue = value?.toString();
        const comp = list.options.getComp();
        const dataset = comp.kulData;
        if (value) {
          const newNode: KulDataNode = {
            icon: 'history',
            id: strValue,
            description: 'Execution date: ' + new Date().toLocaleString() + '.',
            value,
          };
          if (dataset) {
            const existingNode = dataset?.nodes?.find((n) => n.id === strValue);
            if (existingNode) {
              existingNode.description = newNode.description;
              comp.refresh();
            } else {
              comp.kulData = { columns: dataset.columns, nodes: [...dataset.nodes, newNode] };
            }
          } else {
            comp.kulData = { nodes: [newNode] };
          }
        }
      }

      getApiRoutes().redraw();
    }
  },
  register: (setW: ListWidgetsSetter, addW: BaseWidgetCallback) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.list);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
