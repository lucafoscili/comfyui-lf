import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { createDOMWidget, getApiRoutes, getKulManager, getLFManager, normalizeValue, } from '../utils/common.js';
import { createContent } from '../helpers/controlPanel.js';
import { KulEventName } from '../types/events/events.js';
const BASE_CSS_CLASS = 'lf-controlpanel';
const TYPE = CustomWidgetName.controlPanel;
//#region Control panel
export const controlPanelFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        grid: `${BASE_CSS_CLASS}__grid`,
        spinner: `${BASE_CSS_CLASS}__spinner`,
    },
    options: () => {
        return {
            hideOnZoom: false,
            getValue() {
                return {
                    backup: getLFManager().isBackupEnabled() || false,
                    debug: getLFManager().isDebug() || false,
                    themes: getKulManager()?.theme?.name || '',
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    const { backup, debug, themes } = u.parsedJson;
                    const set = () => {
                        if (backup === true || backup === false) {
                            getLFManager().toggleBackup(backup);
                        }
                        if (debug === true || debug === false) {
                            getLFManager().toggleDebug(debug);
                        }
                        if (themes) {
                            getKulManager().theme.set(themes);
                        }
                        return value;
                    };
                    if (getKulManager()) {
                        set();
                    }
                    else {
                        const managerCb = () => {
                            set();
                            document.removeEventListener(KulEventName.KulManager, managerCb);
                        };
                        document.addEventListener(KulEventName.KulManager, managerCb);
                    }
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const contentCb = (domWidget, isReady) => {
            const readyCb = (domWidget) => {
                setTimeout(() => {
                    getApiRoutes().backup.new();
                    contentCb(domWidget, true);
                }, 750);
            };
            const createSpinner = () => {
                const spinner = document.createElement(TagName.KulSpinner);
                spinner.classList.add(controlPanelFactory.cssClasses.spinner);
                spinner.kulActive = true;
                spinner.kulLayout = 11;
                return spinner;
            };
            const content = document.createElement(TagName.Div);
            if (isReady) {
                content.appendChild(createContent());
                domWidget.replaceChild(content, domWidget.firstChild);
            }
            else {
                const spinner = createSpinner();
                spinner.addEventListener(KulEventName.KulSpinner, readyCb.bind(null, domWidget));
                content.appendChild(spinner);
                domWidget.appendChild(content);
            }
            content.classList.add(controlPanelFactory.cssClasses.content);
        };
        const wrapper = document.createElement(TagName.Div);
        const options = controlPanelFactory.options();
        contentCb(wrapper, false);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
