import { capitalize, getKulManager, kulManagerExists } from '../utils/utils.js';
import { getNode, getWidget, redrawCanvas, refreshWidget } from './common.js';
import { app } from '/scripts/app.js';
const widgetName = 'theme_controller';
const eventName = 'lf-controlpanel';
const cssClasses = {
    wrapper: 'lf-controlpanel',
    widget: 'lf-controlpanel__widget',
};
const eventCb = (event) => {
    const node = getNode(event);
    if (node) {
        updateCb(node);
    }
};
const updateCb = (node) => {
    const existingWidget = getWidget(node, widgetName);
    if (existingWidget) {
        existingWidget.element.refresh();
    }
    else {
        const widget = app.widgets.KUL_BUTTON(node, widgetName).widget;
        window.lfManager.log(`Created widget`, { widget });
    }
    redrawCanvas();
};
export const ControlPanelAdapter = () => {
    return {
        getCustomWidgets: () => {
            return {
                KUL_BUTTON(node, name) {
                    const domWidget = document.createElement('div');
                    domWidget.refresh = refreshWidget.bind(domWidget, createWidget);
                    domWidget.refresh();
                    const widget = node.addDOMWidget(name, widgetName, domWidget);
                    return { widget };
                },
            };
        },
        eventCb,
        eventName,
        updateCb,
    };
};
function createWidget() {
    const content = document.createElement('div');
    content.classList.add(cssClasses.wrapper);
    const managerCb = () => {
        buttonWidget.kulData = getThemes();
        removeEventListener('kul-manager-ready', managerCb);
    };
    const buttonWidget = document.createElement('kul-button');
    buttonWidget.classList.add(cssClasses.widget);
    if (kulManagerExists()) {
        buttonWidget.kulData = getThemes();
    }
    else {
        addEventListener('kul-manager-ready', managerCb);
    }
    content.appendChild(buttonWidget);
    return content;
}
function getThemes() {
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
}
