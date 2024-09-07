import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-histogram';
const TYPE = CustomWidgetName.histogram;
let TIMEOUT;
export const histogramFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        widget: `${BASE_CSS_CLASS}__widget`,
    },
    options: (histogram) => {
        return {
            hideOnZoom: false,
            getComp() {
                return histogram;
            },
            getValue() {
                return histogram.kulData?.nodes ? JSON.stringify(histogram.kulData) : undefined;
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        histogram[prop] = prop;
                    }
                }
            },
            setValue(value) {
                histogram.kulData = value;
                try {
                    if (typeof value === 'string') {
                        histogram.kulData = unescapeJson(value).parsedJson;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, histogram }, LogSeverity.Error);
                    if (value === undefined || value === '') {
                        histogram.kulData = undefined;
                    }
                }
            },
        };
    },
    render: (node, name) => {
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
