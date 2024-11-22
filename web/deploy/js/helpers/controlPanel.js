import { SECTIONS } from '../fixtures/controlPanel.js';
import { KulEventName } from '../types/events/events.js';
import { TagName } from '../types/widgets/_common.js';
import { ControlPanelCSS, ControlPanelIds, ControlPanelLabels, ControlPanelSection, } from '../types/widgets/controlPanel.js';
import { getApiRoutes, getKulManager, getLFManager, isButton, isToggle } from '../utils/common.js';
const INTRO_SECTION = ControlPanelIds.GitHub;
let TIMEOUT;
//#region createContent
export const createContent = () => {
    const grid = document.createElement(TagName.Div);
    const accordion = document.createElement(TagName.KulAccordion);
    const nodes = [];
    accordion.kulData = { nodes };
    for (const id in SECTIONS) {
        if (id !== INTRO_SECTION && Object.prototype.hasOwnProperty.call(SECTIONS, id)) {
            const section = SECTIONS[id];
            let article;
            let node;
            switch (id) {
                case ControlPanelIds.Debug:
                    const logsData = [];
                    node = section(logsData);
                    article = prepArticle(id, node);
                    getLFManager().setDebugDataset(article, logsData);
                    break;
                default:
                    node = section(undefined);
                    article = prepArticle(id, node);
                    break;
            }
            const { icon, value } = node;
            nodes.push({ icon, id, value });
            accordion.appendChild(article);
        }
    }
    const intro = prepArticle(INTRO_SECTION, SECTIONS[INTRO_SECTION]());
    grid.classList.add(ControlPanelCSS.Grid);
    grid.appendChild(intro);
    grid.appendChild(accordion);
    return grid;
};
//#endregion
//#region prepArticle
export const prepArticle = (key, node) => {
    const cb = (e) => {
        const { eventType, originalEvent } = e.detail;
        switch (eventType) {
            case 'kul-event':
                handleKulEvent(originalEvent);
                break;
        }
    };
    const article = document.createElement(TagName.KulArticle);
    article.kulData = { nodes: [{ children: [node], id: ControlPanelSection.Root }] };
    article.slot = key;
    article.addEventListener(KulEventName.KulArticle, cb);
    return article;
};
//#endregion
//#region handleKulEvent
export const handleKulEvent = (e) => {
    const { comp } = e.detail;
    if (isButton(comp)) {
        handleButtonEvent(e);
    }
    if (isToggle(comp)) {
        handleToggleEvent(e);
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
            c.kulLabel = ControlPanelLabels.Done;
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
                case ControlPanelLabels.Backup:
                    invokeAPI(getApiRoutes().backup.new('manual'), ControlPanelLabels.Backup);
                    break;
                case ControlPanelLabels.ClearLogs:
                    const { article, dataset } = getLFManager().getDebugDataset();
                    if (dataset?.length > 0) {
                        dataset.splice(0, dataset.length);
                        article.refresh();
                    }
                    break;
                case ControlPanelLabels.DeleteMetadata:
                    invokeAPI(getApiRoutes().metadata.clear(), ControlPanelLabels.DeleteMetadata);
                    break;
                case ControlPanelLabels.DeleteUsage:
                    invokeAPI(getApiRoutes().analytics.clear('usage'), ControlPanelLabels.DeleteUsage);
                    break;
                case ControlPanelLabels.OpenIssue:
                    window.open('https://github.com/lucafoscili/comfyui-lf/issues/new', '_blank');
                    break;
                case ControlPanelLabels.Theme:
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
                case ControlPanelLabels.Backup:
                    c.appendChild(createSpinner());
                    break;
                case ControlPanelLabels.DeleteMetadata:
                case ControlPanelLabels.DeleteUsage:
                    c.classList.add('kul-danger');
                    c.appendChild(createSpinner());
                    break;
            }
    }
};
//#endregion
//#region handleListEvent
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
//#endregion
//#region handleToggleEvent
const handleToggleEvent = (e) => {
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
//#endregion
