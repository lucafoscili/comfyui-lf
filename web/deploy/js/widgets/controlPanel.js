import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, deserializeValue, getApiRoutes, getKulManager, getKulThemes, getLFManager, isButton, isSwitch, serializeValue, } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-controlpanel';
const TYPE = CustomWidgetName.controlPanel;
let TIMEOUT;
export const controlPanelFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        article: `${BASE_CSS_CLASS}__article`,
        spinner: `${BASE_CSS_CLASS}__spinner`,
    },
    options: () => {
        return {
            getValue() {
                return serializeValue({
                    debug: getLFManager()?.isDebug(),
                    themes: getKulManager()?.theme.name,
                });
            },
            setValue(value) {
                const { debug, themes } = deserializeValue(value)
                    .parsedJson;
                const set = () => {
                    if (debug === true || debug === false) {
                        getLFManager().toggleDebug(debug);
                    }
                    if (themes) {
                        getKulManager().theme.set(themes);
                    }
                    return value;
                };
                const kulManager = getKulManager();
                if (kulManager) {
                    set();
                }
                else {
                    const managerCb = () => {
                        set();
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
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const readyCb = (domWidget) => {
    setTimeout(() => {
        contentCb(domWidget, true);
    }, 750);
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
    if (isReady) {
        const article = createArticle();
        content.appendChild(article);
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
const createArticle = () => {
    const logsData = [];
    const articleData = {
        nodes: [
            {
                children: [
                    {
                        children: [theme(), debug(logsData), metadata()],
                        id: 'section',
                        value: 'Control panel',
                    },
                ],
                id: 'root',
                value: '',
            },
        ],
    };
    const handleSubcomponentEvent = (e) => {
        const { comp, eventType, node } = e.detail;
        const component = comp;
        switch (eventType) {
            case 'ready':
                component.rootElement.title = 'Change the LF Nodes suite theme';
                const value = node.id;
                getKulManager().theme.set(value);
                break;
        }
    };
    const handleArticleEvent = (e) => {
        const { comp, eventType, originalEvent } = e.detail;
        if (isSwitch(comp)) {
            const event = e;
            switch (eventType) {
                case 'change':
                    const value = event.detail.value === 'on' ? true : false;
                    getLFManager().toggleDebug(value);
                    break;
                case 'ready':
                    comp.rootElement.title = 'Activate verbose console logging';
            }
        }
        if (isButton(comp)) {
            switch (eventType) {
                case 'click':
                    if (comp.kulIcon === 'style') {
                        getKulManager().theme.randomTheme();
                    }
                    if (comp.kulIcon === 'refresh' && logsData?.length > 0) {
                        logsData.splice(0, logsData.length);
                        article.refresh();
                    }
                    if (comp.kulIcon === 'delete') {
                        const onResponse = () => {
                            comp.rootElement.classList.remove('kul-danger');
                            comp.rootElement.classList.add('kul-success');
                            comp.rootElement.kulShowSpinner = false;
                            comp.rootElement.kulLabel = 'Done!';
                            comp.rootElement.kulIcon = 'check';
                        };
                        const restore = () => {
                            comp.rootElement.classList.add('kul-danger');
                            comp.rootElement.classList.remove('kul-success');
                            comp.rootElement.kulLabel = 'Delete models info';
                            comp.rootElement.kulIcon = 'delete';
                            TIMEOUT = null;
                        };
                        requestAnimationFrame(() => (comp.kulShowSpinner = true));
                        getApiRoutes()
                            .clearModelMetadata()
                            .then(() => {
                            requestAnimationFrame(onResponse);
                            if (TIMEOUT) {
                                clearTimeout(TIMEOUT);
                            }
                            TIMEOUT = setTimeout(() => requestAnimationFrame(restore), 1000);
                        });
                    }
                    break;
                case 'kul-event':
                    handleSubcomponentEvent(originalEvent);
                    break;
                case 'ready':
                    if (comp.kulIcon === 'delete') {
                        comp.rootElement.classList.add('kul-danger');
                        const spinner = document.createElement('kul-spinner');
                        spinner.kulActive = true;
                        spinner.kulDimensions = '0.6em';
                        spinner.kulLayout = 2;
                        spinner.slot = 'spinner';
                        comp.rootElement.appendChild(spinner);
                        break;
                    }
            }
        }
    };
    const cb = (e) => {
        const { eventType, originalEvent } = e.detail;
        switch (eventType) {
            case 'kul-event':
                handleArticleEvent(originalEvent);
                break;
        }
    };
    const article = document.createElement('kul-article');
    article.kulData = articleData;
    article.addEventListener('kul-article-event', cb);
    getLFManager().setDebugDataset(article, logsData);
    return article;
};
const metadata = () => {
    const node = {
        id: 'section',
        value: 'Metadata',
        children: [
            {
                id: 'paragraph',
                value: 'Purge metadata files',
                children: [
                    {
                        id: 'content',
                        value: 'Metadata pulled from CivitAI are stored in .info files saved in the same folders of the models to avoid unnecessary fetches from the API.',
                    },
                    {
                        id: 'content',
                        value: "By pressing this button it's possible to delete every .info file created by fetching the metadata.",
                    },
                    {
                        id: 'content',
                        value: '',
                        cells: {
                            kulButton: {
                                kulIcon: 'delete',
                                kulLabel: 'Delete models info',
                                kulStyle: ':host { margin: auto; padding:16px 0 }',
                                kulStyling: 'outlined',
                                shape: 'button',
                                value: '',
                            },
                        },
                    },
                ],
            },
        ],
    };
    return node;
};
const theme = () => {
    const node = {
        id: 'section',
        value: 'Customization',
        children: [
            {
                id: 'paragraph',
                value: 'Theme selector',
                children: [
                    {
                        id: 'content',
                        value: "Through the button below it's possible to set a random theme for the Ketchup Lite components, or select one from the dropdown menu.",
                    },
                    {
                        id: 'content',
                        value: '',
                        cssStyle: { margin: 'auto', padding: '16px 0' },
                        cells: { kulButton: { kulData: getKulThemes(), shape: 'button', value: '' } },
                    },
                ],
            },
        ],
    };
    return node;
};
const debug = (logsData) => {
    const node = {
        id: 'section',
        value: 'Debug',
        children: [
            {
                id: 'paragraph',
                value: 'Toggle on/off',
                children: [
                    {
                        id: 'content',
                        value: 'Activating the debug will enable the display of verbose logging.',
                    },
                    {
                        id: 'content',
                        value: '',
                        cssStyle: { textAlign: 'center', padding: '16px 0' },
                        cells: {
                            kulSwitch: {
                                kulLabel: 'Debug',
                                kulLeadingLabel: true,
                                shape: 'switch',
                                value: !!getLFManager().isDebug(),
                            },
                        },
                    },
                ],
            },
            {
                id: 'paragraph',
                value: 'Logs',
                children: [
                    {
                        id: 'content',
                        value: 'Every time the node manager receives a messages, it will be printed below.',
                    },
                    {
                        id: 'content',
                        tagName: 'br',
                        value: '',
                    },
                    {
                        id: 'content',
                        value: 'In the browser console there should be more informations.',
                    },
                    {
                        id: 'content',
                        value: '',
                        cells: {
                            kulButton: {
                                shape: 'button',
                                kulIcon: 'refresh',
                                kulLabel: 'Clear logs',
                                kulStyle: ':host { margin: auto; padding-bottom: 4px; padding-top: 16px; text-align: center }',
                                kulStyling: 'flat',
                                value: '',
                            },
                        },
                    },
                ],
            },
            {
                id: 'paragraph',
                value: '',
                cssStyle: {
                    backgroundColor: 'rgba(var(--kul-text-color-rgb), 0.075)',
                    borderRadius: '8px',
                    height: '250px',
                    marginBottom: '16px',
                    overflow: 'auto',
                },
                children: logsData,
            },
        ],
    };
    return node;
};
