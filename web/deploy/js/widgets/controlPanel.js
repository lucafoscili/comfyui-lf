import { createDOMWidget, getKulManager, getKulThemes, getLFManager } from '../utils/utils.js';
const cssClasses = {
    content: 'lf-controlpanel',
    debug: 'lf-controlpanel__debug',
    spinner: 'lf-controlpanel__spinner',
    themes: 'lf-controlpanel__themes',
};
export function renderControlPanel(node, name, wType) {
    const wrapper = document.createElement('div');
    const refresh = () => {
        const options = node.widgets?.find((w) => w.type === wType)?.options;
        if (options) {
            const isReady = options.isReady;
            if (isReady) {
                const content = contentCb(isReady);
                wrapper.replaceChild(content, wrapper.firstChild);
            }
            else {
                const content = contentCb(isReady);
                options.isReady = true;
                wrapper.appendChild(content);
            }
        }
    };
    wrapper.dataset.isInVisibleNodes = 'true';
    const options = {
        isReady: false,
        refresh,
    };
    const widget = createDOMWidget(name, wType, wrapper, node, options);
    const readyCb = () => {
        setTimeout(() => {
            refresh();
            document.removeEventListener('kul-spinner-event', readyCb);
        }, 500);
    };
    document.addEventListener('kul-spinner-event', readyCb);
    refresh();
    return { widget };
}
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
const switchCb = (e) => {
    if (e.detail.eventType === 'change') {
        const value = e.detail.value === 'on' ? true : false;
        getLFManager().toggleDebug(value);
    }
};
export function contentCb(isReady) {
    const content = document.createElement('div');
    const createSpinner = () => {
        const spinner = document.createElement('kul-spinner');
        spinner.classList.add(cssClasses.spinner);
        spinner.kulActive = true;
        spinner.kulLayout = 11;
        return spinner;
    };
    const createDebug = () => {
        const debug = document.createElement('kul-switch');
        debug.classList.add(cssClasses.debug);
        debug.kulLabel = 'Debug';
        debug.kulLeadingLabel = true;
        debug.addEventListener('kul-switch-event', switchCb);
        return debug;
    };
    const createTheme = () => {
        const themes = document.createElement('kul-button');
        themes.classList.add(cssClasses.themes);
        themes.kulData = getKulThemes();
        themes.addEventListener('kul-button-event', buttonCb);
        return themes;
    };
    if (isReady) {
        const debug = createDebug();
        const themes = createTheme();
        content.appendChild(debug);
        content.appendChild(themes);
    }
    else {
        const spinner = createSpinner();
        content.appendChild(spinner);
    }
    content.classList.add(cssClasses.content);
    return content;
}
