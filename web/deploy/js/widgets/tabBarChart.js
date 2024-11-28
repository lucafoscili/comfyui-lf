import { apiCall, EV_HANDLERS, prepareTabbarDataset } from '../helpers/tabBarChart.js';
import { KulEventName } from '../types/events/events.js';
import { TabBarChartColors, TabBarChartCSS, TabBarChartIds, } from '../types/widgets/tabBarChart.js';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const tabBarChartFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue: () => {
                const { directory, node } = STATE.get(wrapper);
                switch (node.comfyClass) {
                    case NodeName.usageStatistics:
                        return { directory: directory || '' };
                    default:
                        return {};
                }
            },
            setValue: (value) => {
                const state = STATE.get(wrapper);
                const { chart, tabbar } = state.elements;
                const callback = (_, u) => {
                    const parsedValue = u.parsedJson;
                    switch (state.node.comfyClass) {
                        case NodeName.usageStatistics:
                            state.directory = parsedValue.directory;
                            apiCall(state);
                            break;
                        default:
                            for (const key in parsedValue) {
                                const dataset = parsedValue[key];
                                chart.kulData = dataset || {};
                                tabbar.kulData = prepareTabbarDataset(parsedValue) || {};
                                requestAnimationFrame(async () => tabbar.setValue(0));
                            }
                            break;
                    }
                };
                normalizeValue(value, callback, CustomWidgetName.tabBarChart);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const grid = document.createElement(TagName.Div);
        const textfield = document.createElement(TagName.KulTextfield);
        const chart = document.createElement(TagName.KulChart);
        const tabbar = document.createElement(TagName.KulTabbar);
        let type;
        switch (node.comfyClass) {
            case NodeName.colorAnalysis:
                chart.kulAxis = [TabBarChartIds.Intensity];
                chart.kulColors = [TabBarChartColors.Red, TabBarChartColors.Green, TabBarChartColors.Blue];
                chart.kulSeries = [TabBarChartIds.Red, TabBarChartIds.Green, TabBarChartIds.Blue];
                chart.kulTypes = ['scatter'];
                grid.classList.add(TabBarChartCSS.GridNoDirectory);
                textfield.classList.add(TabBarChartCSS.DirectoryHidden);
                break;
            case NodeName.imageHistogram:
            case NodeName.lutGeneration:
                chart.kulAxis = [TabBarChartIds.Intensity];
                chart.kulColors = [TabBarChartIds.Red, TabBarChartIds.Green, TabBarChartIds.Blue];
                chart.kulSeries = [TabBarChartIds.Red, TabBarChartIds.Green, TabBarChartIds.Blue];
                chart.kulTypes = ['area'];
                grid.classList.add(TabBarChartCSS.GridNoDirectory);
                textfield.classList.add(TabBarChartCSS.DirectoryHidden);
                break;
            case NodeName.usageStatistics:
                type = 'usage';
                chart.kulAxis = [TabBarChartIds.Name];
                chart.kulSeries = [TabBarChartIds.Counter, TabBarChartIds.Counter];
                chart.kulTypes = ['area'];
                break;
        }
        tabbar.classList.add(TabBarChartCSS.Tabbar);
        tabbar.kulValue = null;
        tabbar.addEventListener(KulEventName.KulTabbar, EV_HANDLERS.tabbar.bind(EV_HANDLERS.tabbar, STATE.get(wrapper)));
        textfield.classList.add(TabBarChartCSS.Directory);
        textfield.kulIcon = 'folder';
        textfield.kulLabel = 'Directory';
        textfield.kulStyling = 'flat';
        textfield.addEventListener(KulEventName.KulTextfield, EV_HANDLERS.textfield.bind(EV_HANDLERS.textfield, STATE.get(wrapper)));
        grid.classList.add(TabBarChartCSS.Grid);
        grid.appendChild(textfield);
        grid.appendChild(tabbar);
        grid.appendChild(chart);
        content.classList.add(TabBarChartCSS.Content);
        content.appendChild(grid);
        wrapper.appendChild(content);
        const options = tabBarChartFactory.options(wrapper);
        STATE.set(wrapper, {
            directory: '',
            elements: { chart, tabbar, textfield },
            node,
            selected: '',
            type,
            wrapper,
        });
        return { widget: createDOMWidget(CustomWidgetName.tabBarChart, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
