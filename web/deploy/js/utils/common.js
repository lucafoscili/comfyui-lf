import { CustomWidgetName, } from '../types/widgets.js';
import { LogSeverity } from '../types/manager.js';
const DOM = document.documentElement;
const WINDOW = window;
export const areJSONEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
};
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
export const findWidget = (node, type) => {
    return node?.widgets?.find((w) => w.type === type);
};
export const getApiRoutes = () => {
    return WINDOW.lfManager.getApiRoutes();
};
export const getCustomWidget = (node, type, addW) => {
    return (node?.widgets?.find((w) => w.type.toLowerCase() === type.toLowerCase()) || (addW ? addW(node, type).widget : undefined));
};
export const getInput = (node, type) => {
    return node?.inputs?.find((w) => w.type.toLowerCase() === type.toLowerCase());
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
export const getOutput = (node, type) => {
    return node?.outputs?.find((w) => w.type.toLowerCase() === type.toLowerCase());
};
export const getWidget = (node, type) => {
    return node?.widgets?.find((w) => w.type.toLowerCase() === type.toLowerCase());
};
export const isValidJSON = (value) => {
    try {
        JSON.stringify(value);
        return true;
    }
    catch (error) {
        return false;
    }
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
                const isSmaller = canvas?.clientWidth < chart.clientWidth || canvas?.clientHeight < chart.clientHeight;
                const isBigger = canvas?.clientWidth > chart.clientWidth || canvas?.clientHeight > chart.clientHeight;
                if (isSmaller || isBigger) {
                    chart.refresh();
                }
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
    const recursiveUnescape = (inputStr) => {
        let newStr = inputStr.replace(/\\(.)/g, '$1');
        while (newStr !== inputStr) {
            inputStr = newStr;
            newStr = inputStr.replace(/\\(.)/g, '$1');
        }
        return newStr;
    };
    try {
        parsedJson = JSON.parse(str);
        validJson = true;
        unescapedStr = JSON.stringify(parsedJson, null, 2);
    }
    catch (error) {
        unescapedStr = recursiveUnescape(str);
    }
    return { validJson, parsedJson, unescapedStr };
};
