import { CustomWidgetName, } from '../types/widgets.js';
import { LogSeverity } from '../types/manager.js';
const DOM = document.documentElement;
const WINDOW = window;
export const capitalize = (input) => {
    return input
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
};
export const createDOMWidget = (name, type, element, node, options = undefined) => {
    getLFManager().log(`Creating '${type}'`, { element });
    return node.addDOMWidget(name, type, element, options);
};
export const findWidget = (node, name) => {
    return node?.widgets?.find((w) => w.name === name);
};
export const getApiRoutes = () => {
    return WINDOW.lfManager.getApiRoutes();
};
export const getKulManager = () => {
    return DOM.ketchupLite;
};
export const getKulThemes = () => {
    const themes = getKulManager().theme.getThemes();
    const kulData = {
        nodes: [{ children: [], icon: 'style', id: 'root', value: 'Theme' }],
    };
    for (let index = 0; index < themes.length; index++) {
        const currentTheme = themes[index];
        kulData.nodes[0].children.push({
            id: currentTheme,
            value: capitalize(currentTheme),
        });
    }
    return kulData;
};
export const getLFManager = () => {
    return WINDOW.lfManager;
};
export const getCustomWidget = (node, name, addW) => {
    return (node?.widgets?.find((w) => w.name.toLowerCase() === name.toLowerCase()) || (addW ? addW(node, name).widget : undefined));
};
export const getWidget = (node, name) => {
    return node?.widgets?.find((w) => w.name.toLowerCase() === name.toLowerCase());
};
export const kulManagerExists = () => {
    return !!DOM.ketchupLite;
};
export const log = () => {
    return WINDOW.lfManager.log;
};
export const refreshChart = (node) => {
    try {
        const domWidget = findWidget(node, CustomWidgetName.countBarChart)?.element ||
            findWidget(node, CustomWidgetName.histogram)?.element;
        if (domWidget) {
            const chart = domWidget.querySelector('kul-chart');
            if (chart) {
                const canvas = chart.shadowRoot.querySelector('canvas');
                if (canvas?.clientWidth < chart.clientWidth || canvas?.clientHeight < chart.clientHeight)
                    chart.refresh();
            }
        }
    }
    catch (error) {
        getLFManager().log('Whoops! It seems there is no chart. :V', { error }, LogSeverity.Error);
    }
};
export const splitByLastSpaceBeforeAnyBracket = (input) => {
    const match = input.match(/\s+(.+)\[.*?\]/);
    if (match && match[1]) {
        return match[1];
    }
    return input;
};
export const unescapeJson = (str) => {
    let validJson = false;
    let parsedJson = undefined;
    let unescapedStr = str;
    try {
        parsedJson = JSON.parse(str);
        validJson = true;
        unescapedStr = JSON.stringify(parsedJson, null, 2);
    }
    catch (error) {
        unescapedStr = str.replace(/\\(.)/g, '$1');
    }
    return { validJson, parsedJson, unescapedStr };
};
