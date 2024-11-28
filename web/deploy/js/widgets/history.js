import { EV_HANDLERS } from '../helpers/history.js';
import { KulEventName } from '../types/events/events.js';
import { HistoryCSS, } from '../types/widgets/history.js';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const historyFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: true,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { list } = STATE.get(wrapper);
                return list?.kulData || {};
            },
            setValue(value) {
                const { list } = STATE.get(wrapper);
                const callback = (_, u) => {
                    list.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, CustomWidgetName.history);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const list = document.createElement(TagName.KulList);
        list.classList.add(HistoryCSS.Widget);
        list.kulEmptyLabel = 'History is empty!';
        list.kulEnableDeletions = true;
        switch (node.comfyClass) {
            case NodeName.loadFileOnce:
                break;
            default:
                list.kulSelectable = true;
                break;
        }
        list.addEventListener(KulEventName.KulList, (e) => EV_HANDLERS.list(STATE.get(wrapper), e));
        content.classList.add(HistoryCSS.Content);
        content.appendChild(list);
        wrapper.appendChild(content);
        const options = historyFactory.options(wrapper);
        STATE.set(wrapper, { list, node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.history, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
