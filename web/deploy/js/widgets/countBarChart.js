import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-countbarchart';
const TYPE = CustomWidgetName.countBarChart;
export const countBarChartFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        widget: `${BASE_CSS_CLASS}__widget`,
    },
    options: (countBarChart) => {
        return {
            hideOnZoom: false,
            getComp() {
                return countBarChart;
            },
            getValue() {
                return countBarChart.kulData?.nodes ? JSON.stringify(countBarChart.kulData) : undefined;
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        countBarChart[prop] = prop;
                    }
                }
            },
            setValue(value) {
                countBarChart.kulData = value;
                try {
                    if (typeof value === 'string') {
                        countBarChart.kulData = unescapeJson(value).parsedJson;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, countBarChart }, LogSeverity.Error);
                    if (value === undefined || value === '') {
                        countBarChart.kulData = undefined;
                    }
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const countBarChart = document.createElement('kul-chart');
        const options = countBarChartFactory.options(countBarChart);
        content.classList.add(countBarChartFactory.cssClasses.content);
        countBarChart.classList.add(countBarChartFactory.cssClasses.widget);
        countBarChart.kulAxis = 'Axis_0';
        countBarChart.kulSeries = ['Series_0'];
        countBarChart.kulTypes = ['bar'];
        content.appendChild(countBarChart);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
