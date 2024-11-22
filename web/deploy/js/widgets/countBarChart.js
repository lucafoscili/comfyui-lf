import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { CountBarChartCSS, } from '../types/widgets/countBarChart.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const DEF_ICON = 'content_copy';
const DEF_LABEL = 'Copy selected';
let TIMEOUT;
//#region Count bar chart
export const countBarChartFactory = {
    options: (chart, chip, button) => {
        return {
            hideOnZoom: true,
            getComp() {
                return { chart, chip, button };
            },
            getValue() {
                return {
                    chart: chart.kulData || {},
                    chip: chip.kulData || {},
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    const json = u.parsedJson;
                    chart.kulData = json.chart || {};
                    chip.kulData = json.chip || {};
                    button.classList.remove(CountBarChartCSS.ButtonHidden);
                };
                const onException = () => {
                    button.classList.add(CountBarChartCSS.ButtonHidden);
                };
                normalizeValue(value, callback, CustomWidgetName.countBarChart, onException);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const grid = document.createElement(TagName.Div);
        const chart = document.createElement(TagName.KulChart);
        const chip = document.createElement(TagName.KulChip);
        const button = document.createElement(TagName.KulButton);
        const options = countBarChartFactory.options(chart, chip, button);
        content.classList.add(CountBarChartCSS.Content);
        grid.classList.add(CountBarChartCSS.Grid);
        chart.classList.add(CountBarChartCSS.Chart);
        chip.classList.add(CountBarChartCSS.Chip);
        button.classList.add(CountBarChartCSS.Button);
        button.classList.add(CountBarChartCSS.ButtonHidden);
        button.classList.add('kul-full-width');
        chart.kulAxis = 'Axis_0';
        chart.kulLegend = 'hidden';
        chart.kulSeries = ['Series_0'];
        chart.kulTypes = ['bar'];
        chip.kulStyle = '#kul-component .chip-set { height: auto; }';
        chip.kulStyling = 'filter';
        button.kulIcon = DEF_ICON;
        button.kulLabel = DEF_LABEL;
        button.kulStyling = 'flat';
        button.addEventListener(KulEventName.KulButton, (e) => {
            copy(e, chip);
        });
        grid.appendChild(chart);
        grid.appendChild(chip);
        grid.appendChild(button);
        content.appendChild(grid);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(CustomWidgetName.countBarChart, wrapper, node, options) };
    },
};
const copy = async (e, chip) => {
    const { comp, eventType } = e.detail;
    if (eventType === 'pointerdown') {
        const button = comp;
        const selectedChips = [];
        (await chip.getSelectedNodes()).forEach((n) => {
            selectedChips.push(n.id);
        });
        navigator.clipboard.writeText(selectedChips.join(', '));
        button.kulLabel = 'Copied!';
        button.kulIcon = 'check';
        if (TIMEOUT) {
            clearTimeout(TIMEOUT);
        }
        TIMEOUT = setTimeout(() => {
            button.kulLabel = DEF_LABEL;
            button.kulIcon = DEF_ICON;
            TIMEOUT = null;
        }, 1000);
    }
};
//#endregion
