import { createContent } from '../helpers/controlPanel.js';
import { KulEventName } from '../types/events/events.js';
import { ControlPanelCSS, } from '../types/widgets/controlPanel.js';
import { CustomWidgetName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, getApiRoutes, getKulManager, getLFManager, normalizeValue, } from '../utils/common.js';
const STATE = new WeakMap();
export const controlPanelFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
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
                normalizeValue(value, callback, CustomWidgetName.controlPanel);
            },
        };
    },
    //#endregion
    //#region Render
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
                spinner.classList.add(ControlPanelCSS.Spinner);
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
            content.classList.add(ControlPanelCSS.Content);
        };
        const wrapper = document.createElement(TagName.Div);
        contentCb(wrapper, false);
        const options = controlPanelFactory.options(wrapper);
        STATE.set(wrapper, { node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.controlPanel, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
