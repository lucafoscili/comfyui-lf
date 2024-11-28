import { EV_HANDLERS } from '../helpers/masonry.js';
import { KulEventName } from '../types/events/events.js';
import { MasonryCSS, } from '../types/widgets/masonry.js';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, isValidNumber, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const masonryFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { masonry, selected } = STATE.get(wrapper);
                const { index, name } = selected;
                return {
                    columns: masonry?.kulColumns || 3,
                    dataset: masonry?.kulData || {},
                    index: isValidNumber(index) ? index : NaN,
                    name: name || '',
                    view: masonry?.kulView || 'masonry',
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    const { masonry, selected } = STATE.get(wrapper);
                    const { columns, dataset, index, name, view } = u.parsedJson;
                    if (columns) {
                        masonry.kulColumns = columns;
                    }
                    if (dataset) {
                        masonry.kulData = dataset || {};
                    }
                    if (view) {
                        masonry.kulView = view;
                    }
                    if (isValidNumber(index)) {
                        selected.index = index;
                        selected.name = name || '';
                        masonry.setSelectedShape(index);
                    }
                };
                normalizeValue(value, callback, CustomWidgetName.masonry);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const masonry = document.createElement(TagName.KulMasonry);
        masonry.classList.add(MasonryCSS.Widget);
        masonry.addEventListener(KulEventName.KulMasonry, EV_HANDLERS.masonry.bind(EV_HANDLERS.masonry, STATE.get(wrapper)));
        switch (node.comfyClass) {
            case NodeName.loadImages:
                masonry.kulSelectable = true;
                break;
        }
        content.classList.add(MasonryCSS.Content);
        content.appendChild(masonry);
        wrapper.appendChild(content);
        const options = masonryFactory.options(wrapper);
        STATE.set(wrapper, { masonry, node, selected: { index: NaN, name: '' }, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.masonry, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
