import { getApiRoutes, getKulManager, getKulThemes, getLFManager, isButton, isSwitch, } from '../utils/common.js';
var Labels;
(function (Labels) {
    Labels["AUTO_BACKUP"] = "Automatic Backup";
    Labels["BACKUP"] = "Backup now";
    Labels["CLEAR_LOGS"] = "Clear logs";
    Labels["DEBUG"] = "Debug";
    Labels["DELETE_USAGE"] = "Delete usage analytics info";
    Labels["DELETE_METADATA"] = "Delete models info";
    Labels["DONE"] = "Done!";
    Labels["OPEN_ISSUE"] = "Open an issue";
    Labels["THEME"] = "Random theme";
})(Labels || (Labels = {}));
const STYLES = {
    customization: () => {
        return {
            margin: '0',
        };
    },
    debugGrid: () => {
        return {
            display: 'grid',
            gridTemplateRows: 'repeat(5,max-content) 1fr',
            height: '100%',
            margin: '0',
        };
    },
    debugLogs: () => {
        return { display: 'grid', gridGap: '12px', gridTemplateRows: '1fr 1fr' };
    },
    logsArea: () => {
        return {
            backgroundColor: 'rgba(var(--kul-text-color-rgb), 0.075)',
            borderRadius: '8px',
            display: 'block',
            height: '100%',
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
    const createSpinner = () => {
        const spinner = document.createElement('kul-spinner');
        spinner.kulActive = true;
        spinner.kulDimensions = '0.6em';
        spinner.kulLayout = 2;
        spinner.slot = 'spinner';
        return spinner;
    };
    const invokeAPI = (promise, label) => {
        const onResponse = () => {
            c.kulDisabled = true;
            c.kulIcon = 'check';
            c.kulLabel = Labels.DONE;
            c.kulShowSpinner = false;
        };
        const restore = (label) => {
            c.kulDisabled = false;
            c.kulLabel = label;
            c.kulIcon = 'delete';
            TIMEOUT = null;
        };
        requestAnimationFrame(() => (c.kulShowSpinner = true));
        promise.then(() => {
            requestAnimationFrame(onResponse);
            if (TIMEOUT) {
                clearTimeout(TIMEOUT);
            }
            TIMEOUT = setTimeout(() => requestAnimationFrame(() => restore(label)), 1000);
        });
    };
    switch (eventType) {
        case 'click':
            switch (c.kulLabel) {
                case Labels.BACKUP:
                    invokeAPI(getApiRoutes().backup.new('manual'), Labels.BACKUP);
                    break;
                case Labels.CLEAR_LOGS:
                    const { article, dataset } = getLFManager().getDebugDataset();
                    if (dataset?.length > 0) {
                        dataset.splice(0, dataset.length);
                        article.refresh();
                    }
                    break;
                case Labels.DELETE_METADATA:
                    invokeAPI(getApiRoutes().metadata.clear(), Labels.DELETE_METADATA);
                    break;
                case Labels.DELETE_USAGE:
                    invokeAPI(getApiRoutes().analytics.clear('usage'), Labels.DELETE_USAGE);
                    break;
                case Labels.OPEN_ISSUE:
                    window.open('https://github.com/lucafoscili/comfyui-lf/issues/new', '_blank');
                    break;
                case Labels.THEME:
                    getKulManager().theme.randomTheme();
                    break;
                default:
                    break;
            }
            break;
        case 'kul-event':
            handleListEvent(originalEvent);
            break;
        case 'ready':
            switch (c.kulLabel) {
                case Labels.BACKUP:
                    c.appendChild(createSpinner());
                    break;
                case Labels.DELETE_METADATA:
                case Labels.DELETE_USAGE:
                    c.classList.add('kul-danger');
                    c.appendChild(createSpinner());
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
    analytics: () => {
        return {
            id: 'section',
            value: 'Analytics',
            children: [
                {
                    id: 'paragraph',
                    value: 'Usage',
                    children: [
                        {
                            id: 'content',
                            value: 'Usage analytics can be enabled by saving datasets through the UpdateUsageStatistics node and displayed with the UsageStatistics node.',
                        },
                        {
                            id: 'content',
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: 'Once datasets are created (input folder of ComfyUI), the count for each resource used will increase everytime that particular resource is updated.',
                        },
                        {
                            id: 'content',
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: 'This button will clear all usage analytics data from your input folder.',
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
                                    kulLabel: Labels.DELETE_USAGE,
                                    kulStyle: ':host { margin: auto; padding:16px 0 }',
                                    kulStyling: 'outlined',
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
    backup: () => {
        return {
            id: 'section',
            value: 'Backup',
            children: [
                {
                    id: 'paragraph',
                    value: 'Toggle on/off',
                    children: [
                        {
                            id: 'content',
                            value: 'Toggle this switch to automatically back up the folder <path/to/your/comfyui/user/LF_Nodes> once a day (the first time you open this workflow).',
                        },
                        {
                            id: 'content',
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: '',
                            cells: {
                                kulSwitch: {
                                    kulLabel: Labels.AUTO_BACKUP,
                                    kulLeadingLabel: true,
                                    kulStyle: ':host { text-align: center; padding: 16px 0; }',
                                    shape: 'switch',
                                    value: !!getLFManager().isBackupEnabled(),
                                },
                            },
                        },
                    ],
                },
                {
                    id: 'paragraph',
                    value: 'Backup files',
                    children: [
                        {
                            id: 'content',
                            value: 'This button will create a manual backup of the content in <path/to/your/comfyui/user/LF_Nodes>',
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
                                    kulIcon: 'backup',
                                    kulLabel: Labels.BACKUP,
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
                                    kulLabel: Labels.OPEN_ISSUE,
                                    kulStyle: ':host { margin: auto; padding:16px 0 }',
                                    kulStyling: 'raised',
                                    shape: 'button',
                                    value: '',
                                },
                            },
                        },
                    ],
                },
            ],
        };
    },
    debug: (logsData) => {
        return {
            id: 'section',
            cssStyle: STYLES.debugGrid(),
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
                                    kulLabel: Labels.DEBUG,
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
                            tagName: 'br',
                            value: '',
                        },
                        {
                            id: 'content',
                            value: 'Further below another widget will display additional Ketchup Lite components information.',
                        },
                        {
                            id: 'content',
                            value: '',
                            cells: {
                                kulButton: {
                                    htmlProps: { className: 'kul-danger kul-full-width' },
                                    shape: 'button',
                                    kulIcon: 'refresh',
                                    kulLabel: Labels.CLEAR_LOGS,
                                    kulStyle: ':host { padding-top: 16px; }',
                                    value: '',
                                },
                            },
                        },
                    ],
                },
                {
                    id: 'paragraph',
                    cssStyle: STYLES.debugLogs(),
                    value: '',
                    children: [
                        {
                            id: 'content-wrapper',
                            cssStyle: STYLES.logsArea(),
                            value: '',
                            children: logsData,
                        },
                        {
                            cells: {
                                kulCard: {
                                    kulData: {
                                        nodes: [
                                            {
                                                cells: {
                                                    kulCode: { shape: 'code', value: '' },
                                                    kulButton: {
                                                        shape: 'button',
                                                        value: '',
                                                    },
                                                    kulButton_2: {
                                                        shape: 'button',
                                                        value: '',
                                                    },
                                                    kulSwitch: {
                                                        shape: 'switch',
                                                        value: !!getKulManager().debug.isEnabled(),
                                                    },
                                                },
                                                id: 'debug',
                                            },
                                        ],
                                    },
                                    kulLayout: 'debug',
                                    shape: 'card',
                                    value: '',
                                },
                            },
                            id: 'content-wrapper',
                        },
                    ],
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
                                    kulLabel: Labels.DELETE_METADATA,
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
            cssStyle: STYLES.customization(),
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
