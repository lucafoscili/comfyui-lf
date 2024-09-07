import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-countbarchart';
const TYPE = CustomWidgetName.countBarChart;
let TIMEOUT;
export const countBarChartFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        widget: `${BASE_CSS_CLASS}__widget`,
    },
    options: (countbarchart) => {
        return {
            hideOnZoom: false,
            getComp() {
                return countbarchart;
            },
            getValue() {
                return countbarchart.kulData?.nodes ? JSON.stringify(countbarchart.kulData) : undefined;
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        countbarchart[prop] = prop;
                    }
                }
            },
            setValue(value) {
                countbarchart.kulData = value;
                try {
                    if (typeof value === 'string') {
                        countbarchart.kulData = unescapeJson(value).parsedJson;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, countbarchart }, LogSeverity.Error);
                    if (value === undefined || value === '') {
                        countbarchart.kulData = undefined;
                    }
                }
            },
        };
    },
    render: (node, name) => {
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
    resize: (node) => {
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
        }
        catch (error) {
            getLFManager().log('Whoops! It seems there is no countbarchart. :V', { error }, LogSeverity.Error);
        }
    },
};
