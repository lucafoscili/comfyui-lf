import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { MasonryCSS } from '../types/widgets/masonry.js';
import { createDOMWidget, isValidNumber, normalizeValue } from '../utils/common.js';
//#region Masonry
export const masonryFactory = {
    options: (masonry) => {
        return {
            hideOnZoom: false,
            getComp() {
                return masonry;
            },
            getValue() {
                const index = parseInt(masonry?.dataset.index);
                return {
                    columns: masonry?.kulColumns || 3,
                    dataset: masonry?.kulData || {},
                    index: isValidNumber(index) ? index : NaN,
                    name: masonry?.dataset.name || '',
                    view: masonry?.kulView || 'masonry',
                };
            },
            setValue(value) {
                const callback = (_, u) => {
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
                        masonry.dataset.index = index.toString() || '';
                        masonry.dataset.name = name || '';
                        masonry.setSelectedShape(index);
                    }
                };
                normalizeValue(value, callback, CustomWidgetName.masonry);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const masonry = document.createElement(TagName.KulMasonry);
        const options = masonryFactory.options(masonry);
        content.classList.add(MasonryCSS.Content);
        masonry.classList.add(MasonryCSS.Widget);
        masonry.addEventListener(KulEventName.KulMasonry, masonryEventHandler);
        switch (node.comfyClass) {
            case NodeName.loadImages:
                masonry.kulSelectable = true;
                break;
        }
        content.appendChild(masonry);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(CustomWidgetName.masonry, wrapper, node, options) };
    },
};
//#endregion
//#region eventHandler
const masonryEventHandler = (e) => {
    const { comp, eventType, originalEvent, selectedShape } = e.detail;
    const masonry = comp.rootElement;
    switch (eventType) {
        case 'kul-event':
            const { eventType } = originalEvent.detail;
            switch (eventType) {
                case 'click':
                    const v = selectedShape.shape?.value || selectedShape.shape?.kulValue;
                    masonry.dataset.index = isValidNumber(selectedShape.index)
                        ? selectedShape.index.toString()
                        : '';
                    masonry.dataset.name = v ? String(v).valueOf() : '';
                    break;
            }
            break;
    }
};
//#endregion
