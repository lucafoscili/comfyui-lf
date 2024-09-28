import type { KulDataDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { HistogramWidgetOptions, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-histogram';
const TYPE = CustomWidgetName.histogram;

let TIMEOUT: NodeJS.Timeout;

export const histogramFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    widget: `${BASE_CSS_CLASS}__widget`,
  },
  options: (histogram: HTMLKulChartElement) => {
    return {
      hideOnZoom: false,
      getComp() {
        return histogram;
      },
      getValue() {
        return histogram.kulData?.nodes ? JSON.stringify(histogram.kulData) : undefined;
      },
      setValue(value: Record<string, unknown> | string) {
        histogram.kulData = value as KulDataDataset;
        try {
          if (typeof value === 'string') {
            histogram.kulData = unescapeJson(value).parsedJson;
          }
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, histogram }, LogSeverity.Error);
          if (value === undefined || value === '') {
            histogram.kulData = undefined;
          }
        }
      },
    } as HistogramWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const histogram = document.createElement('kul-chart');
    const options = histogramFactory.options(histogram);

    content.classList.add(histogramFactory.cssClasses.content);
    histogram.classList.add(histogramFactory.cssClasses.widget);
    histogram.kulAxis = 'Axis_0';
    histogram.kulColors = ['red', 'green', 'blue'];
    histogram.kulSeries = ['Series_0', 'Series_1', 'Series_2'];
    histogram.kulTypes = ['area'];

    content.appendChild(histogram);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
