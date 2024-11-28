import {
  KulDataDataset,
  KulDataNode,
  KulTabbarEventPayload,
  KulTextfieldEventPayload,
} from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager/manager';
import { NodeName } from '../types/widgets/widgets';
import { TabBarChartState } from '../types/widgets/tabBarChart';
import { getApiRoutes, getLFManager } from '../utils/common';

export const EV_HANDLERS = {
  //#region Tabbar handler
  tabbar: (state: TabBarChartState, e: CustomEvent<KulTabbarEventPayload>) => {
    const { eventType, node } = e.detail;

    const { elements } = state;
    const { chart } = elements;

    switch (eventType) {
      case 'click':
        switch (state.node.comfyClass) {
          case NodeName.usageStatistics:
            chart.kulData = getLFManager().getCachedDatasets().usage[node.id];
            break;
          default:
            chart.kulData = node.cells.kulChart.kulData;
            break;
        }
        break;
    }
  },
  //#endregion
  //#region Textfield handler
  textfield: (state: TabBarChartState, e: CustomEvent<KulTextfieldEventPayload>) => {
    const { eventType, value } = e.detail;

    switch (eventType) {
      case 'change':
        state.directory = value;
        apiCall(state);
        break;
    }
  },
  //#endregion
};
//#region apiCall
export const apiCall = async (state: TabBarChartState) => {
  const { directory, elements, selected, type } = state;
  const { chart, tabbar, textfield } = elements;

  getApiRoutes()
    .analytics.get(directory, type)
    .then((r) => {
      if (r.status === 'success') {
        if (r?.data && Object.entries(r.data).length > 0) {
          const firstKey = selected || Object.keys(r.data)[0];
          chart.kulData = r.data[firstKey];
          tabbar.kulData = prepareTabbarDataset(r.data);

          requestAnimationFrame(async () => {
            textfield.setValue(directory);
            tabbar.setValue(0);
          });
        } else {
          getLFManager().log('Analytics not found.', { r }, LogSeverity.Info);
        }
      }
    });
};
//#endregion
//#region prepareTabbarDataset
export const prepareTabbarDataset = (data: Record<string, KulDataDataset>) => {
  const dataset: KulDataDataset = { nodes: [] };
  for (const filename in data) {
    if (Object.prototype.hasOwnProperty.call(data, filename)) {
      const node: KulDataNode = {
        cells: { kulChart: { kulData: data[filename], shape: 'chart', value: '' } },
        id: filename,
        value: filename.split('_')?.[0] || filename,
      };
      dataset.nodes.push(node);
    }
  }
  return dataset;
};
//#endregion
