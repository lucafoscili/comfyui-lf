import { getApiRoutes, getKulManager, getKulThemes, getLFManager, isButton, isSwitch, } from '../utils/common.js';
const STYLES = {
    logsArea: () => {
        return {
            backgroundColor: 'rgba(var(--kul-text-color-rgb), 0.075)',
            borderRadius: '8px',
            display: 'block',
            height: '250px',
            marginBottom: '16px',
            overflow: 'auto',
        };
    },
    separator: () => {
        return {
            border: '1px solid var(--kul-border-color)',
            display: 'block',
            margin: '12px auto 24px',
            opacity: '0.25',
            width: '50%',
        };
    },
};
let TIMEOUT;
export const handleKulEvent = (e) => {
    const { comp } = e.detail;
    if (isButton(comp)) {
        handleButtonEvent(e);
    }
    if (isSwitch(comp)) {
        handleSwitchEvent(e);
    }
};
const handleButtonEvent = (e) => {
    const { comp, eventType, originalEvent } = e.detail;
    const c = comp.rootElement;
    switch (eventType) {
        case 'click':
            if (c.kulIcon === 'delete') {
                const onResponse = () => {
                    c.classList.remove('kul-danger');
                    c.classList.add('kul-success');
                    c.kulShowSpinner = false;
                    c.kulLabel = 'Done!';
                    c.kulIcon = 'check';
                };
                const restore = () => {
                    c.classList.add('kul-danger');
                    c.classList.remove('kul-success');
                    c.kulLabel = 'Delete models info';
                    c.kulIcon = 'delete';
                    TIMEOUT = null;
                };
                requestAnimationFrame(() => (c.kulShowSpinner = true));
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
            if (c.kulIcon === 'github') {
                window.open('https://github.com/lucafoscili/comfyui-lf/issues/new', '_blank');
            }
            if (c.kulIcon === 'refresh') {
                const { article, dataset } = getLFManager().getDebugDataset();
                if (dataset?.length > 0) {
                    dataset.splice(0, dataset.length);
                    article.refresh();
                }
            }
            if (c.kulIcon === 'style') {
                getKulManager().theme.randomTheme();
            }
            break;
        case 'kul-event':
            handleListEvent(originalEvent);
            break;
        case 'ready':
            if (c.kulIcon === 'delete') {
                c.classList.add('kul-danger');
                const spinner = document.createElement('kul-spinner');
                spinner.kulActive = true;
                spinner.kulDimensions = '0.6em';
                spinner.kulLayout = 2;
                spinner.slot = 'spinner';
                c.appendChild(spinner);
                break;
            }
    }
};
const handleListEvent = (e) => {
    const { comp, eventType, node } = e.detail;
    const c = comp.rootElement;
    const value = node.id;
    switch (eventType) {
        case 'click':
            getKulManager().theme.set(value);
            break;
        case 'ready':
            c.title = 'Change the LF Nodes suite theme';
            getKulManager().theme.set(value);
            break;
    }
};
const handleSwitchEvent = (e) => {
    const { comp, eventType, value } = e.detail;
    const c = comp.rootElement;
    switch (eventType) {
        case 'change':
            getLFManager().toggleDebug(value === 'on' ? true : false);
            break;
        case 'ready':
            c.title = 'Activate verbose console logging';
    }
};
export const sectionsFactory = {
    bug: () => {
        return {
            id: 'section',
            value: 'Bug report',
            children: [
                {
                    id: 'paragraph',
                    value: 'Did you run into a bug?',
                    children: [
                        {
                            id: 'content',
                            value: 'If you find bugs or odd behaviors feel free to open an issue on GitHub, just follow the link below!',
                        },
                        {
                            id: 'content',
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: "Be sure to include as much information as you can, without sufficient data it's difficult to troubleshoot problems.",
                        },
                        {
                            id: 'content',
                            value: '',
                            cells: {
                                kulButton: {
                                    kulIcon: 'github',
                                    kulLabel: 'Open an issue',
                                    kulStyle: ':host { margin: auto; padding:16px 0 }',
                                    kulStyling: 'raised',
                                    shape: 'button',
                                    value: '',
                                },
                            },
                        },
                        {
                            cssStyle: STYLES.separator(),
                            id: 'content_separator',
                            value: '',
                        },
                    ],
                },
            ],
        };
    },
    debug: (logsData) => {
        return {
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
                            cells: {
                                kulSwitch: {
                                    kulLabel: 'Debug',
                                    kulLeadingLabel: true,
                                    kulStyle: ':host { text-align: center; padding: 16px 0; }',
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
                    cssStyle: STYLES.logsArea(),
                    children: logsData,
                },
                {
                    cssStyle: STYLES.separator(),
                    id: 'content_separator',
                    value: '',
                },
            ],
        };
    },
    metadata: () => {
        return {
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
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: "By pressing this button it's possible to delete every .info file created by fetching the metadata.",
                        },
                        {
                            id: 'content',
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: 'This action is IRREVERSIBLE so use it with caution.',
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
                {
                    cssStyle: STYLES.separator(),
                    id: 'content_separator',
                    value: '',
                },
            ],
        };
    },
    theme: () => {
        return {
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
                            cells: {
                                kulButton: {
                                    kulData: getKulThemes(),
                                    kulStyle: ':host { margin: auto; padding: 16px 0 }',
                                    shape: 'button',
                                    value: '',
                                },
                            },
                        },
                    ],
                },
                {
                    cssStyle: STYLES.separator(),
                    id: 'content_separator',
                    value: '',
                },
            ],
        };
    },
};
