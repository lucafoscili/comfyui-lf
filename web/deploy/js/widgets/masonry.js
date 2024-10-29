import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
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
                return {
                    dataset: masonry?.kulData || {},
                    index: parseInt(masonry?.dataset.index) || 0,
                    name: masonry?.dataset.name || '',
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    masonry.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node, name) => {
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
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
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
                    masonry.dataset.index = selectedShape.index.toString();
                    masonry.dataset.value = String(selectedShape.shape?.value)?.valueOf() || '';
                    break;
            }
            break;
    }
};
