import { NodeName } from '../types/widgets/_common.js';
import { getLFManager } from '../utils/common.js';
export const prepareTabbarDataset = (data) => {
    const dataset = { nodes: [] };
    for (const filename in data) {
        if (Object.prototype.hasOwnProperty.call(data, filename)) {
            const node = {
                cells: { kulChart: { kulData: data[filename], shape: 'chart', value: '' } },
                id: filename,
                value: filename.split('_')?.[0] || filename,
            };
            dataset.nodes.push(node);
        }
    }
    return dataset;
};
export const tabbarEventHandler = (chart, nodeName, e) => {
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
export const textfieldEventHandler = (chart, refreshCb, e) => {
    const { eventType, value } = e.detail;
    switch (eventType) {
        case 'change':
            chart.dataset.directory = value;
            refreshCb();
            break;
    }
};
