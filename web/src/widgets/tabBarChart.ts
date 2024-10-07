import {
  KulDataDataset,
  KulDataNode,
  KulTabbarEventPayload,
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
  options: (domWidget: HTMLDivElement) => {
    return {
      hideOnZoom: true,
      getComp() {
        const chart = domWidget.querySelector('kul-chart');
        const tabbar = domWidget.querySelector('kul-tabbar');
        return { chart, tabbar };
      },
      refresh: async (type: AnalyticsType) => {
        const chart = domWidget.querySelector('kul-chart');
        const tabbar = domWidget.querySelector('kul-tabbar');
        const currentTab = (await tabbar?.getValue())?.node?.id;
        getLFManager()
          .getApiRoutes()
          .fetchAnalyticsData(type)
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
    const options = tabBarChartFactory.options(wrapper);

    contentCb(wrapper, false, node);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const readyCb = (domWidget: HTMLDivElement, node: NodeType) => {
  setTimeout(() => {
    contentCb(domWidget, true, node);
  }, 750);
};

const contentCb = async (domWidget: HTMLDivElement, isReady: boolean, node: NodeType) => {
  const content = document.createElement('div');

  const createSpinner = () => {
    const spinner = document.createElement('kul-spinner');
    spinner.classList.add(tabBarChartFactory.cssClasses.spinner);
    spinner.kulActive = true;
    spinner.kulLayout = 8;

    return spinner;
  };

  if (isReady) {
    const grid = await createGrid(node);

    content.appendChild(grid);
    domWidget.replaceChild(content, domWidget.firstChild);
  } else {
    const spinner = createSpinner();
    spinner.addEventListener('kul-spinner-event', readyCb.bind(null, domWidget, node));
    content.appendChild(spinner);
    domWidget.appendChild(content);
  }

  content.classList.add(tabBarChartFactory.cssClasses.content);
};

const createGrid = async (node: NodeType) => {
  const grid = document.createElement('div');
  const chart = document.createElement('kul-chart');
  const tabbar = document.createElement('kul-tabbar');

  switch (node.comfyClass) {
    case NodeName.usageStatistics:
      chart.kulAxis = 'name';
      chart.kulSeries = ['counter'];
      chart.kulTypes = ['area', 'scatter'];

      await getLFManager()
        .getApiRoutes()
        .fetchAnalyticsData('usage')
        .then((r) => {
          if (r.status === 'success') {
            if (r?.data && Object.entries(r.data).length > 0) {
              const firstKey = Object.keys(r.data)[0];
              chart.kulData = r.data[firstKey];
              tabbar.kulData = prepareTabbarDataset(r.data);
              tabbar.addEventListener(
                'kul-tabbar-event',
                tabbarEventHandler.bind(tabbarEventHandler, chart, r.data),
              );
            } else {
              getLFManager().log('Analytics not found.', { r }, LogSeverity.Info);
            }
          }
        });
      break;
    default:
      break;
  }

  grid.classList.add(tabBarChartFactory.cssClasses.grid);

  grid.appendChild(tabbar);
  grid.appendChild(chart);

  return grid;
};

const tabbarEventHandler = (
  chart: HTMLKulChartElement,
  data: Record<string, KulDataDataset>,
  e: CustomEvent<KulTabbarEventPayload>,
) => {
  const { eventType, node } = e.detail;

  switch (eventType) {
    case 'click':
      chart.kulData = data[node.id];
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
