import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;
export const cardFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        card: `${BASE_CSS_CLASS}__widget`,
    },
    options: (card) => {
        return {
            hideOnZoom: false,
            getComp() {
                return card;
            },
            setValue(value) {
                try {
                    if (typeof value === 'string') {
                        card.kulData = unescapeJson(value).parsedJson;
                    }
                    else {
                        card.kulData = value;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, card }, LogSeverity.Error);
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const card = document.createElement('kul-card');
        const options = cardFactory.options(card);
        content.classList.add(cardFactory.cssClasses.content);
        card.classList.add(cardFactory.cssClasses.card);
        card.addEventListener('kul-card-event', cardEventHandler);
        content.appendChild(card);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const cardEventHandler = (e) => {
    const { comp, eventType } = e.detail;
    const card = comp.rootElement;
    switch (eventType) {
        case 'click':
            if (card.dataset?.civitaiLink) {
                window.open(card.dataset.civitaiLink, '_blank');
            }
            break;
    }
};
