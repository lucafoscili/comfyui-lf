import {
  KulDataDataset,
  KulDataNode,
  KulTabbarEventPayload,
  KulTextfieldEventPayload,
} from '../types/ketchup-lite/components';
import { NodeName } from '../types/widgets/_common';
import { getLFManager } from '../utils/common';

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

export const tabbarEventHandler = (
  chart: HTMLKulChartElement,
  nodeName: NodeName,
  e: CustomEvent<KulTabbarEventPayload>,
) => {
  const { eventType, node } = e.detail;

  switch (eventType) {
    case 'click':
      switch (nodeName) {
        case NodeName.colorAnalysis:
        case NodeName.imageHistogram:
          chart.kulData = node.cells.kulChart.kulData;
          break;
        case NodeName.usageStatistics:
          chart.kulData = getLFManager().getCachedDatasets().usage[node.id];
          break;
      }
      break;
  }
};

export const textfieldEventHandler = (
  chart: HTMLKulChartElement,
  refreshCb: () => Promise<void>,
  e: CustomEvent<KulTextfieldEventPayload>,
) => {
  const { eventType, value } = e.detail;

  switch (eventType) {
    case 'change':
      chart.dataset.directory = value;
      refreshCb();
      break;
  }
};
