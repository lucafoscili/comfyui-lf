import type { KulDataDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { CountBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-countbarchart';
const TYPE = CustomWidgetName.countBarChart;

export const countBarChartFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
  },
  options: (countBarChart: HTMLKulChartElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return countBarChart;
      },
      getValue() {
        return countBarChart.kulData?.nodes ? JSON.stringify(countBarChart.kulData) : undefined;
      },
      setProps(props: Partial<HTMLKulChartElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            countBarChart[prop] = prop;
          }
        }
      },
      setValue(value: Record<string, unknown> | string) {
        countBarChart.kulData = value as KulDataDataset;
        try {
          if (typeof value === 'string') {
            countBarChart.kulData = unescapeJson(value).parsedJson;
          }
        } catch (error) {
          getLFManager().log(
            'Error when setting value!',
            { error, countBarChart },
            LogSeverity.Error,
          );
          if (value === undefined || value === '') {
            countBarChart.kulData = undefined;
          }
        }
      },
    } as CountBarChartWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const countbarchart = document.createElement('kul-chart');
    const options = countBarChartFactory.options(countbarchart);

    content.classList.add(countBarChartFactory.cssClasses.content);
    countbarchart.classList.add(countBarChartFactory.cssClasses.widget);
    countbarchart.kulAxis = 'Axis_0';
    countbarchart.kulSeries = ['Series_0'];
    countbarchart.kulTypes = ['bar'];

    content.appendChild(countbarchart);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
