import { listEventHandler } from '../helpers/history.js';
import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { HistoryCSS } from '../types/widgets/history.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
//#region History
export const historyFactory = {
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
                normalizeValue(value, callback, CustomWidgetName.history);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const history = document.createElement(TagName.KulList);
        const options = historyFactory.options(history);
        content.classList.add(HistoryCSS.Content);
        history.classList.add(HistoryCSS.Widget);
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
        return { widget: createDOMWidget(CustomWidgetName.history, wrapper, node, options) };
    },
};
//#endregion
