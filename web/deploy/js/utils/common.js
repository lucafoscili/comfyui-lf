import { CustomWidgetName, } from '../types/widgets/_common.js';
import { LogSeverity } from '../types/manager/manager.js';
//#region Constants
const DEFAULT_WIDGET_NAME = 'ui_widget';
const DOM = document.documentElement;
const WINDOW = window;
//#endregion
//#region Variables
let timer;
//#endregion
//#region Components
export const isButton = (comp) => {
    return comp.rootElement.tagName.toLowerCase() === 'kul-button';
};
export const isChart = (comp) => {
    return comp.rootElement.tagName.toLowerCase() === 'kul-chart';
};
export const isList = (comp) => {
    return comp.rootElement.tagName.toLowerCase() === 'kul-list';
};
export const isToggle = (comp) => {
    return comp.rootElement.tagName.toLowerCase() === 'kul-toggle';
};
//#endregion
//#region JSON
export const areJSONEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
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
export const unescapeJson = (input) => {
    let validJson = false;
    let parsedJson = undefined;
    let unescapedStr = input;
    const recursiveUnescape = (inputStr) => {
        let newStr = inputStr.replace(/\\(.)/g, '$1');
        while (newStr !== inputStr) {
            inputStr = newStr;
            newStr = inputStr.replace(/\\(.)/g, '$1');
        }
        return newStr;
    };
    const deepParse = (data) => {
        if (typeof data === 'string') {
            try {
                const innerJson = JSON.parse(data);
                if (typeof innerJson === 'object' && innerJson !== null) {
                    return deepParse(innerJson);
                }
            }
            catch (e) {
                return data;
            }
        }
        else if (typeof data === 'object' && data !== null) {
            Object.keys(data).forEach((key) => {
                data[key] = deepParse(data[key]);
            });
        }
        return data;
    };
    try {
        parsedJson = JSON.parse(input);
        validJson = true;
        parsedJson = deepParse(parsedJson);
        unescapedStr = JSON.stringify(parsedJson, null, 2);
    }
    catch (error) {
        if (typeof input === 'object' && input !== null) {
            try {
                unescapedStr = JSON.stringify(input, null, 2);
                validJson = true;
                parsedJson = input;
            }
            catch (stringifyError) {
                unescapedStr = recursiveUnescape(input.toString());
            }
        }
        else {
            unescapedStr = recursiveUnescape(input.toString());
        }
    }
    return { validJson, parsedJson, unescapedStr };
};
//#endregion
//#region Managers
export const getApiRoutes = () => {
    return WINDOW.lfManager.getApiRoutes();
};
export const getKulManager = () => {
    return DOM.ketchupLite;
};
export const getKulThemes = () => {
    const themes = getKulManager().theme.getThemes();
    const kulData = {
        nodes: [{ children: [], icon: 'style', id: 'root', value: 'Random theme' }],
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
export const kulManagerExists = () => {
    return !!DOM.ketchupLite;
};
export const log = () => {
    return WINDOW.lfManager.log;
};
//#endregion
//#region Nodes
export const getInput = (node, type) => {
    return node?.inputs?.find((w) => w.type.toLowerCase() === type.toLowerCase());
};
export const getOutput = (node, type) => {
    return node?.outputs?.find((w) => w.type.toLowerCase() === type.toLowerCase());
};
//#endregion
//#region Number
export const isValidNumber = (n) => {
    return !isNaN(n) && typeof n === 'number';
};
//#endregion
//#region String
export const capitalize = (input) => {
    return input
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
};
export const splitByLastSpaceBeforeAnyBracket = (input) => {
    const match = input.match(/\s+(.+)\[.*?\]/);
    if (match && match[1]) {
        return match[1];
    }
    return input;
};
//#endregion
//#region Widgets
export const createDOMWidget = (type, element, node, options = undefined) => {
    getLFManager().log(`Creating '${type}'`, { element });
    try {
        const { nodeData } = Object.getPrototypeOf(node).constructor;
        let name = DEFAULT_WIDGET_NAME;
        for (const key in nodeData.input) {
            if (Object.prototype.hasOwnProperty.call(nodeData.input, key)) {
                const input = nodeData.input[key];
                for (const key in input) {
                    if (Object.prototype.hasOwnProperty.call(input, key)) {
                        const element = Array.from(input[key]);
                        if (element[0] === type) {
                            name = key;
                            break;
                        }
                    }
                }
                if (name) {
                    break;
                }
            }
        }
        return node.addDOMWidget(name, type, element, options);
    }
    catch (error) {
        getLFManager().log(`Couldn't find a widget of type ${type}`, { error, node }, LogSeverity.Warning);
        return node.addDOMWidget(DEFAULT_WIDGET_NAME, type, element, options);
    }
};
export const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};
export const findWidget = (node, type) => {
    return node?.widgets?.find((w) => w.type === type);
};
export const getCustomWidget = (node, type) => {
    return node?.widgets?.find((w) => w.type.toLowerCase() === type.toLowerCase());
};
export const getWidget = (node, type) => {
    return node?.widgets?.find((w) => w.type.toLowerCase() === type.toLowerCase());
};
export const isValidObject = (obj) => {
    return obj && typeof obj === 'object' && Object.keys(obj).length > 0;
};
export const normalizeValue = (value, callback, widget, onException) => {
    try {
        callback(value, unescapeJson(value));
    }
    catch (error) {
        if (onException) {
            onException();
        }
        getLFManager().log(`Normalization error!`, { error, widget }, LogSeverity.Error);
    }
};
export const refreshChart = (node) => {
    try {
        const domWidget = findWidget(node, CustomWidgetName.countBarChart)?.element ||
            findWidget(node, CustomWidgetName.tabBarChart)?.element;
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
//#endregion
