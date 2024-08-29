import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/utils.js';
const BASE_CSS_CLASS = 'lf-chart';
const TYPE = CustomWidgetName.chart;
let TIMEOUT;
export const chartFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        chart: `${BASE_CSS_CLASS}__chart`,
    },
    options: (chart) => {
        return {
            hideOnZoom: false,
            getComp() {
                return chart;
            },
            getValue() {
                return chart.kulData?.nodes ? JSON.stringify(chart.kulData) : undefined;
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        chart[prop] = prop;
                    }
                }
            },
            setValue(value) {
                chart.kulData = value;
                try {
                    if (typeof value === 'string') {
                        chart.kulData = unescapeJson(value).parsedJson;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, chart }, LogSeverity.Error);
                    if (value === undefined || value === '') {
                        chart.kulData = undefined;
                    }
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const chart = document.createElement('kul-chart');
        const options = chartFactory.options(chart);
        const readyCb = ({ detail }) => {
            getLFManager().log(`Histogram ready, resizing`, { detail });
            const { eventType } = detail;
            if (eventType === 'ready') {
                chart.kulAxis = 'Axis_0';
                chart.kulColors = ['red', 'green', 'blue'];
                chart.kulSeries = ['Series_0', 'Series_1', 'Series_2'];
                chart.removeEventListener('kul-chart-event', readyCb);
            }
        };
        content.classList.add(chartFactory.cssClasses.content);
        chart.classList.add(chartFactory.cssClasses.chart);
        chart.kulTypes = ['area'];
        chart.addEventListener('kul-chart-event', readyCb);
        content.appendChild(chart);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
    resize: (node) => {
        try {
            const chart = node.widgets.find((w) => w.type === TYPE)?.element?.querySelector('kul-chart');
            if (chart && !TIMEOUT) {
                TIMEOUT = setTimeout(() => {
                    chart.refresh();
                    TIMEOUT = null;
                }, 125);
            }
        }
        catch (error) {
            getLFManager().log('Whoops! It seems there is no chart. :V', { error }, LogSeverity.Error);
        }
    },
};
