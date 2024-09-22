import { EventName, LoadFileOncePayload } from '../types/events';
import { KulDataNode } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.loadFileOnce;

export const loadFileOnceFactory = {
  eventHandler: (event: CustomEvent<LoadFileOncePayload>, addW: BaseWidgetCallback) => {
    const name = EventName.string;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const isHistoryEnabled = payload.isHistoryEnabled;
    const node = getApiRoutes().getNodeById(payload.id);
    if (isHistoryEnabled && node) {
      const list = getCustomWidget(node, CustomWidgetName.history, addW);
      if (list) {
        const value = payload.value;
        const comp = list.options.getComp();
        const dataset = comp.kulData;
        if (value) {
          const newNode: KulDataNode = {
            icon: 'history',
            id: value,
            description: 'Execution date: ' + new Date().toLocaleString() + '.',
            value,
          };
          if (dataset) {
            const existingNode = dataset?.nodes?.find((n) => n.id === value);
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
  register: (setW: HistoryWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};