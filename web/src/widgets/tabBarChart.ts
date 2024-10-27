import {
  KulDataDataset,
  KulDataNode,
  KulTabbarEventPayload,
  KulTextfieldEventPayload,
} from '../types/ketchup-lite/components';
import { AnalyticsType, LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TabBarChartWidgetDeserializedValue,
  TabBarChartWidgetFactory,
} from '../types/widgets';
import { createDOMWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-tabbarchart';
const TYPE = CustomWidgetName.tabBarChart;

export const tabBarChartFactory: TabBarChartWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    directory: `${BASE_CSS_CLASS}__directory`,
    directoryHidden: `${BASE_CSS_CLASS}__directory--hidden`,
    grid: `${BASE_CSS_CLASS}__grid`,
    gridNoDirectory: `${BASE_CSS_CLASS}__grid--no-directory`,
    spinner: `${BASE_CSS_CLASS}__spinner`,
    tabbar: `${BASE_CSS_CLASS}__tabbar`,
  },
  options: (chart, tabbar, textfield, node) => {
    return {
      hideOnZoom: false,
      getComp() {
        return { chart, tabbar };
      },
      getValue: () => {
        switch (node) {
          case NodeName.usageStatistics:
            return { directory: chart.dataset.directory || '' };
          default:
          case NodeName.imageHistogram:
            return {};
        }
      },
      setValue: (value) => {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const parsedValue = u.parsedJson as TabBarChartWidgetDeserializedValue;

          switch (node) {
            case NodeName.imageHistogram:
              for (const key in parsedValue) {
                if (Object.prototype.hasOwnProperty.call(parsedValue, key)) {
                  const dataset = parsedValue[key];
                  chart.kulData = dataset || {};
                  tabbar.kulData = prepareTabbarDataset(parsedValue) || {};
                  requestAnimationFrame(() => tabbar.setValue(0));
                }
              }
              break;
            case NodeName.usageStatistics:
              getLFManager()
                .getApiRoutes()
                .analytics.get(parsedValue.directory, 'usage')
                .then((r) => {
                  if (r.status === 'success') {
                    if (r?.data && Object.entries(r.data).length > 0) {
                      const firstKey = Object.keys(r.data)[0];
                      chart.dataset.directory = parsedValue.directory || '';
                      chart.kulData = r.data[firstKey] || {};
                      tabbar.kulData = prepareTabbarDataset(r.data) || {};
                      textfield.setValue(parsedValue.directory);
                      requestAnimationFrame(() => tabbar.setValue(0));
                    } else {
                      getLFManager().log('Analytics not found.', { r }, LogSeverity.Info);
                    }
                  }
                });
              break;
          }
        };

        normalizeValue(value, callback, TYPE);
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
    };
  },
  render: (node, name) => {
    const wrapper = document.createElement('div');
    const grid = document.createElement('div');
    const textfield = document.createElement('kul-textfield');
    const chart = document.createElement('kul-chart');
    const tabbar = document.createElement('kul-tabbar');
    const options = tabBarChartFactory.options(
      chart,
      tabbar,
      textfield,
      node.comfyClass as NodeName,
    );

    switch (node.comfyClass as NodeName) {
      case NodeName.imageHistogram:
        chart.kulAxis = 'Axis_0';
        chart.kulColors = ['red', 'green', 'blue'];
        chart.kulSeries = ['Series_0', 'Series_1', 'Series_2'];
        chart.kulTypes = ['area', 'area', 'area'];
        grid.classList.add(tabBarChartFactory.cssClasses.gridNoDirectory);
        textfield.classList.add(tabBarChartFactory.cssClasses.directoryHidden);
        break;
      case NodeName.usageStatistics:
        chart.kulAxis = 'name';
        chart.dataset.type = 'usage';
        chart.kulSeries = ['counter'];
        chart.kulTypes = ['area', 'scatter'];
        break;
    }

    grid.classList.add(tabBarChartFactory.cssClasses.grid);
    tabbar.addEventListener(
      'kul-tabbar-event',
      tabbarEventHandler.bind(tabbarEventHandler, chart, node.comfyClass),
    );
    tabbar.kulValue = null;
    tabbar.classList.add(tabBarChartFactory.cssClasses.tabbar);

    textfield.classList.add(tabBarChartFactory.cssClasses.directory);
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

const prepareTabbarDataset = (data: Record<string, KulDataDataset>) => {
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

const tabbarEventHandler = (
  chart: HTMLKulChartElement,
  nodeName: NodeName,
  e: CustomEvent<KulTabbarEventPayload>,
) => {
  const { eventType, node } = e.detail;

  switch (eventType) {
    case 'click':
      switch (nodeName) {
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
