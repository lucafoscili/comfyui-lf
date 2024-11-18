import { CustomWidgetName, NodeName, } from '../types/widgets/_common.js';
import { createDOMWidget, isValidNumber, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-masonry';
const TYPE = CustomWidgetName.masonry;
export const masonryFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        widget: `${BASE_CSS_CLASS}__widget`,
    },
    options: (masonry) => {
        return {
            hideOnZoom: true,
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
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const masonry = document.createElement('kul-masonry');
        const options = masonryFactory.options(masonry);
        content.classList.add(masonryFactory.cssClasses.content);
        masonry.classList.add(masonryFactory.cssClasses.widget);
        masonry.addEventListener('kul-masonry-event', masonryEventHandler);
        switch (node.comfyClass) {
            case NodeName.loadImages:
                masonry.kulSelectable = true;
                break;
        }
        content.appendChild(masonry);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
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
