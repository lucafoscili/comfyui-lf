import { SECTIONS } from '../fixtures/controlPanel.js';
import { KulEventName } from '../types/events/events.js';
import { TagName } from '../types/widgets/widgets.js';
import { ControlPanelCSS, ControlPanelIds, ControlPanelLabels, ControlPanelSection, } from '../types/widgets/controlPanel.js';
import { getApiRoutes, getKulManager, getLFManager, isButton, isToggle } from '../utils/common.js';
const INTRO_SECTION = ControlPanelIds.GitHub;
let TIMEOUT;
export const EV_HANDLERS = {
    //#region Article handler
    article: (e) => {
        const { eventType, originalEvent } = e.detail;
        switch (eventType) {
            case 'kul-event':
                handleKulEvent(originalEvent);
                break;
        }
    },
    //#endregion
    //#region Button handler
    button: (e) => {
        const { comp, eventType, originalEvent } = e.detail;
        const element = comp.rootElement;
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
                comp.kulDisabled = true;
                comp.kulIcon = 'check';
                comp.kulLabel = ControlPanelLabels.Done;
                comp.kulShowSpinner = false;
            };
            const restore = (label) => {
                comp.kulDisabled = false;
                comp.kulLabel = label;
                comp.kulIcon = 'delete';
                TIMEOUT = null;
            };
            requestAnimationFrame(() => (comp.kulShowSpinner = true));
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
                switch (comp.kulLabel) {
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
                const ogEv = originalEvent;
                EV_HANDLERS.list(ogEv);
                break;
            case 'ready':
                switch (comp.kulLabel) {
                    case ControlPanelLabels.Backup:
                        element.appendChild(createSpinner());
                        break;
                    case ControlPanelLabels.DeleteMetadata:
                    case ControlPanelLabels.DeleteUsage:
                        element.classList.add('kul-danger');
                        element.appendChild(createSpinner());
                        break;
                }
        }
    },
    //#endregion
    //#region List handler
    list: (e) => {
        const { comp, eventType, node } = e.detail;
        const element = comp.rootElement;
        const value = node.id;
        switch (eventType) {
            case 'click':
                getKulManager().theme.set(value);
                break;
            case 'ready':
                element.title = 'Change the LF Nodes suite theme';
                getKulManager().theme.set(value);
                break;
        }
    },
    //#endregion
    //#region Toggle handler
    toggle: (e) => {
        const { comp, eventType, value } = e.detail;
        const element = comp.rootElement;
        switch (eventType) {
            case 'change':
                getLFManager().toggleDebug(value === 'on' ? true : false);
                break;
            case 'ready':
                element.title = 'Activate verbose console logging';
        }
    },
    //#endregion
};
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
    const article = document.createElement(TagName.KulArticle);
    article.kulData = { nodes: [{ children: [node], id: ControlPanelSection.Root }] };
    article.slot = key;
    article.addEventListener(KulEventName.KulArticle, EV_HANDLERS.article);
    return article;
};
//#endregion
//#region handleKulEvent
export const handleKulEvent = (e) => {
    const { comp } = e.detail;
    if (isButton(comp)) {
        const ogEv = e;
        EV_HANDLERS.button(ogEv);
    }
    if (isToggle(comp)) {
        const ogEv = e;
        EV_HANDLERS.toggle(ogEv);
    }
};
//#endregion
