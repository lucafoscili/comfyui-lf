import { listEventHandler } from '../helpers/history.js';
import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-history';
const TYPE = CustomWidgetName.history;
//#region History
export const historyFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        history: `${BASE_CSS_CLASS}__widget`,
    },
    options: (list) => {
        return {
            hideOnZoom: true,
            getComp() {
                return list;
            },
            getValue() {
                return list?.kulData || {};
            },
            setValue(value) {
                const callback = (_, u) => {
                    list.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const history = document.createElement(TagName.KulList);
        const options = historyFactory.options(history);
        content.classList.add(historyFactory.cssClasses.content);
        history.classList.add(historyFactory.cssClasses.history);
        history.kulEmptyLabel = 'History is empty!';
        history.kulEnableDeletions = true;
        switch (node.comfyClass) {
            case NodeName.loadFileOnce:
                break;
            default:
                history.kulSelectable = true;
                break;
        }
        history.addEventListener(KulEventName.KulList, (e) => {
            listEventHandler(e, node);
        });
        content.appendChild(history);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
