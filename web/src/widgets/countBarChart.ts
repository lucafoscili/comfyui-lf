import type { KulDataDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { CountBarChartWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-countbarchart';
const TYPE = CustomWidgetName.countBarChart;

let TIMEOUT: NodeJS.Timeout;

export const countBarChartFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
  },
  options: (countbarchart: HTMLKulChartElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return countbarchart;
      },
      getValue() {
        return countbarchart.kulData?.nodes ? JSON.stringify(countbarchart.kulData) : undefined;
      },
      setProps(props: Partial<HTMLKulChartElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            countbarchart[prop] = prop;
          }
        }
      },
      setValue(value: Record<string, unknown> | string) {
        countbarchart.kulData = value as KulDataDataset;
        try {
          if (typeof value === 'string') {
            countbarchart.kulData = unescapeJson(value).parsedJson;
          }
        } catch (error) {
          getLFManager().log(
            'Error when setting value!',
            { error, countbarchart },
            LogSeverity.Error,
          );
          if (value === undefined || value === '') {
            countbarchart.kulData = undefined;
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

    const readyCb = ({ detail }) => {
      getLFManager().log(`CountBarChart ready, resizing`, { detail });

      const { eventType } = detail;
      if (eventType === 'ready') {
        countbarchart.kulAxis = 'Axis_0';
        countbarchart.kulSeries = ['Series_0'];
        countbarchart.removeEventListener('kul-chart-event', readyCb);
      }
    };

    content.classList.add(countBarChartFactory.cssClasses.content);
    countbarchart.classList.add(countBarChartFactory.cssClasses.widget);
    countbarchart.kulTypes = ['bar'];
    countbarchart.addEventListener('kul-chart-event', readyCb);

    content.appendChild(countbarchart);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
  resize: (node: NodeType) => {
    try {
      const countbarchart = node.widgets
        .find((w) => w.type === TYPE)
        ?.element?.querySelector('kul-countbarchart');
      if (countbarchart && !TIMEOUT) {
        TIMEOUT = setTimeout(() => {
          countbarchart.refresh();
          TIMEOUT = null;
        }, 125);
      }
    } catch (error) {
      getLFManager().log(
        'Whoops! It seems there is no countbarchart. :V',
        { error },
        LogSeverity.Error,
      );
    }
  },
};
