import {
  KulDataDataset,
  KulDataNode,
  KulTabbarEventPayload,
  KulTextfieldEventPayload,
} from '../types/ketchup-lite/components';
import { AnalyticsType, LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import { TabBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager } from '../utils/common';

const BASE_CSS_CLASS = 'lf-tabbarchart';
const TYPE = CustomWidgetName.tabBarChart;

export const tabBarChartFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    grid: `${BASE_CSS_CLASS}__grid`,
    spinner: `${BASE_CSS_CLASS}__spinner`,
  },
  options: (
    chart: HTMLKulChartElement,
    tabbar: HTMLKulTabbarElement,
    textfield: HTMLKulTextfieldElement,
  ) => {
    return {
      hideOnZoom: true,
      getComp() {
        return { chart, tabbar };
      },
      getValue: () => {
        return chart.dataset.directory;
      },
      setValue: (value) => {
        if (value) {
          getLFManager()
            .getApiRoutes()
            .analytics.get(value, 'usage')
            .then((r) => {
              if (r.status === 'success') {
                if (r?.data && Object.entries(r.data).length > 0) {
                  const firstKey = Object.keys(r.data)[0];
                  chart.dataset.directory = value;
                  chart.kulData = r.data[firstKey];
                  tabbar.kulData = prepareTabbarDataset(r.data);
                  textfield.setValue(value);
                  requestAnimationFrame(() => tabbar.setValue(0));
                } else {
                  getLFManager().log('Analytics not found.', { r }, LogSeverity.Info);
                }
              }
            });
        }
      },
      refresh: async () => {
        const currentTab = (await tabbar?.getValue())?.node?.id;
        const directory = chart?.dataset.directory;
        const type = chart?.dataset.type as AnalyticsType;
        getLFManager()
          .getApiRoutes()
          .analytics.get(directory, type)
          .then((r) => {
            if (r.status === 'success') {
              if (r?.data && Object.entries(r.data).length > 0) {
                const firstKey = currentTab || Object.keys(r.data)[0];
                chart.kulData = r.data[firstKey];
                tabbar.kulData = prepareTabbarDataset(r.data);
              } else {
                getLFManager().log('Analytics not found.', { r }, LogSeverity.Info);
              }
            }
          });
      },
    } as TabBarChartWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const grid = document.createElement('div');
    const textfield = document.createElement('kul-textfield');
    const chart = document.createElement('kul-chart');
    const tabbar = document.createElement('kul-tabbar');
    const options = tabBarChartFactory.options(chart, tabbar, textfield);

    switch (node.comfyClass as NodeName) {
      case NodeName.usageStatistics:
        chart.kulAxis = 'name';
        chart.dataset.type = 'usage';
        chart.kulSeries = ['counter'];
        chart.kulTypes = ['area', 'scatter'];
        break;
    }

    grid.classList.add(tabBarChartFactory.cssClasses.grid);
    tabbar.addEventListener('kul-tabbar-event', tabbarEventHandler.bind(tabbarEventHandler, chart));
    tabbar.kulValue = null;

    textfield.kulIcon = 'folder';
    textfield.kulLabel = 'Directory';
    textfield.kulStyling = 'flat';
    textfield.addEventListener(
      'kul-textfield-event',
      textfieldEventHandler.bind(textfieldEventHandler, chart, options.refresh),
    );

    grid.appendChild(textfield);
    grid.appendChild(tabbar);
    grid.appendChild(chart);

    wrapper.appendChild(grid);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const tabbarEventHandler = (chart: HTMLKulChartElement, e: CustomEvent<KulTabbarEventPayload>) => {
  const { eventType, node } = e.detail;

  switch (eventType) {
    case 'click':
      chart.kulData = getLFManager().getCachedDatasets().usage[node.id];
      break;
  }
};

const textfieldEventHandler = (
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

const prepareTabbarDataset = (data: Record<string, KulDataDataset>) => {
  const dataset: KulDataDataset = { nodes: [] };
  for (const filename in data) {
    if (Object.prototype.hasOwnProperty.call(data, filename)) {
      const node: KulDataNode = {
        id: filename,
        value: filename.split('_')?.[0] || filename,
      };
      dataset.nodes.push(node);
    }
  }
  return dataset;
};
