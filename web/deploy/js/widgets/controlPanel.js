import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getKulManager, getKulThemes, getLFManager } from '../utils/utils.js';
const BASE_CSS_CLASS = 'lf-controlpanel';
const TYPE = CustomWidgetName.controlPanel;
export const controlPanelFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        debug: `${BASE_CSS_CLASS}__debug`,
        spinner: `${BASE_CSS_CLASS}__spinner`,
        themes: `${BASE_CSS_CLASS}__themes`,
    },
    options: () => {
        return {
            getValue() {
                return { debug: getLFManager()?.isDebug(), themes: getKulManager()?.theme.name };
            },
            setValue(value) {
                const themeSetter = () => {
                    const { themes } = value;
                    if (themes) {
                        getKulManager().theme.set(themes);
                    }
                    return value;
                };
                const { debug } = value;
                if (debug === true || debug === false) {
                    getLFManager().toggleDebug(debug);
                }
                const kulManager = getKulManager();
                if (kulManager) {
                    themeSetter();
                }
                else {
                    const managerCb = () => {
                        themeSetter();
                        document.removeEventListener('kul-manager-ready', managerCb);
                    };
                    document.addEventListener('kul-manager-ready', managerCb);
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const options = controlPanelFactory.options();
        contentCb(wrapper, false);
        wrapper.dataset.isInVisibleNodes = 'true';
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const buttonCb = (e) => {
    if (e.detail.eventType === 'click') {
        getKulManager().theme.randomTheme();
    }
    else if (e.detail.eventType === 'kul-event') {
        const listEvent = e.detail.originalEvent;
        const value = listEvent.detail.node.id;
        getKulManager().theme.set(value);
    }
};
const readyCb = (domWidget) => {
    setTimeout(() => {
        contentCb(domWidget, true);
    }, 750);
};
const switchCb = (e) => {
    if (e.detail.eventType === 'change') {
        const value = e.detail.value === 'on' ? true : false;
        getLFManager().toggleDebug(value);
    }
};
const contentCb = (domWidget, isReady) => {
    const content = document.createElement('div');
    const createSpinner = () => {
        const spinner = document.createElement('kul-spinner');
        spinner.classList.add(controlPanelFactory.cssClasses.spinner);
        spinner.kulActive = true;
        spinner.kulLayout = 11;
        return spinner;
    };
    const createDebug = () => {
        const debug = document.createElement('kul-switch');
        debug.classList.add(controlPanelFactory.cssClasses.debug);
        debug.kulLabel = 'Debug';
        debug.kulLeadingLabel = true;
        debug.title = 'Activate verbose console logging';
        debug.addEventListener('kul-switch-event', switchCb);
        return debug;
    };
    const createTheme = () => {
        const themes = document.createElement('kul-button');
        themes.classList.add(controlPanelFactory.cssClasses.themes);
        themes.kulData = getKulThemes();
        themes.title = 'Change the LF Nodes suite theme';
        themes.addEventListener('kul-button-event', buttonCb);
        return themes;
    };
    if (isReady) {
        const debug = createDebug();
        const themes = createTheme();
        content.appendChild(debug);
        content.appendChild(themes);
        domWidget.replaceChild(content, domWidget.firstChild);
    }
    else {
        const spinner = createSpinner();
        spinner.addEventListener('kul-spinner-event', readyCb.bind(null, domWidget));
        content.appendChild(spinner);
        domWidget.appendChild(content);
    }
    content.classList.add(controlPanelFactory.cssClasses.content);
};
