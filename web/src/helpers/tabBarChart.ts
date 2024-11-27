import { AnalyticsType } from '../types/api/api';
import {
  KulDataDataset,
  KulDataNode,
  KulTabbarEventPayload,
  KulTextfieldEventPayload,
} from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager/manager';
import { NodeName } from '../types/widgets/_common';
import { TabBarChartState } from '../types/widgets/tabBarChart';
import { getApiRoutes, getLFManager } from '../utils/common';

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
//#region tabbarEventHandler
export const tabbarEventHandler = (
  state: TabBarChartState,
  e: CustomEvent<KulTabbarEventPayload>,
) => {
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
};
//#endregion
//#region textfieldEventHandler
export const textfieldEventHandler = (
  state: TabBarChartState,
  e: CustomEvent<KulTextfieldEventPayload>,
) => {
  const { eventType, value } = e.detail;

  switch (eventType) {
    case 'change':
      state.directory = value;
      callApi(state);
      break;
  }
};
//#endregion
//#region callApi
export const callApi = async (state: TabBarChartState) => {
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
