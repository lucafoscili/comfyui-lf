import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-histogram';
const TYPE = CustomWidgetName.histogram;
let TIMEOUT;
export const histogramFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        histogram: `${BASE_CSS_CLASS}__histogram`,
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
        const readyCb = ({ detail }) => {
            getLFManager().log(`Histogram ready, resizing`, { detail });
            const { eventType } = detail;
            if (eventType === 'ready') {
                histogram.kulAxis = 'Axis_0';
                histogram.kulColors = ['red', 'green', 'blue'];
                histogram.kulSeries = ['Series_0', 'Series_1', 'Series_2'];
                histogram.removeEventListener('kul-chart-event', readyCb);
            }
        };
        content.classList.add(histogramFactory.cssClasses.content);
        histogram.classList.add(histogramFactory.cssClasses.histogram);
        histogram.kulTypes = ['area'];
        histogram.addEventListener('kul-chart-event', readyCb);
        content.appendChild(histogram);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
    resize: (node) => {
        try {
            const histogram = node.widgets
                .find((w) => w.type === TYPE)
                ?.element?.querySelector('kul-histogram');
            if (histogram && !TIMEOUT) {
                TIMEOUT = setTimeout(() => {
                    histogram.refresh();
                    TIMEOUT = null;
                }, 125);
            }
        }
        catch (error) {
            getLFManager().log('Whoops! It seems there is no histogram. :V', { error }, LogSeverity.Error);
        }
    },
};
