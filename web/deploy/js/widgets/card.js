import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;
const SAVED_PROPS = ['kulData', 'kulStyle'];
export const cardFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        grid: `${BASE_CSS_CLASS}__grid`,
    },
    options: (grid) => {
        return {
            hideOnZoom: true,
            getComp() {
                return Array.from(grid.querySelectorAll('kul-card'));
            },
            getValue() {
                const value = {
                    propsArray: [],
                    template: grid?.style.getPropertyValue('--card-grid') || '',
                };
                const cards = grid.querySelectorAll('kul-card');
                for (let index = 0; index < cards.length; index++) {
                    const card = cards[index];
                    const props = SAVED_PROPS.reduce((acc, p) => {
                        if (card[p]) {
                            acc[p] = card[p];
                        }
                        return acc;
                    }, {});
                    value.propsArray.push(props);
                }
                try {
                    return JSON.stringify(value);
                }
                catch (error) {
                    return '';
                }
            },
            setValue(value) {
                if (!value) {
                    return;
                }
                const { propsArray, template } = unescapeJson(value)
                    .parsedJson;
                const gridTemplate = template || 'repeat(1, 1fr) / repeat(1, 1fr)';
                grid.style.setProperty('--card-grid', gridTemplate);
                const cards = grid.querySelectorAll('kul-card');
                for (let index = 0; propsArray && index < propsArray.length; index++) {
                    const props = propsArray[index];
                    if (props.kulData) {
                        for (const key in props) {
                            const card = cards?.[index] || grid.appendChild(createCard());
                            if (Object.prototype.hasOwnProperty.call(props, key)) {
                                const prop = props[key];
                                if (key === 'kulData') {
                                    try {
                                        if (typeof prop === 'string') {
                                            card.kulData = unescapeJson(prop).parsedJson;
                                        }
                                        else {
                                            card.kulData = prop;
                                        }
                                        const node = card.kulData.nodes?.[0];
                                        if (node) {
                                            card.dataset.link = node.description;
                                            card.title = String(node.value).valueOf();
                                        }
                                    }
                                    catch (error) {
                                        getLFManager().log('Error when setting kulData prop on card!', { error }, LogSeverity.Error);
                                    }
                                }
                                else {
                                    card[key] = prop;
                                }
                            }
                        }
                    }
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const grid = document.createElement('div');
        const options = cardFactory.options(grid);
        content.classList.add(cardFactory.cssClasses.content);
        grid.classList.add(cardFactory.cssClasses.grid);
        content.appendChild(grid);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const cardEventHandler = (e) => {
    const { comp, eventType } = e.detail;
    const card = comp;
    const node = card.kulData?.nodes?.[0];
    switch (eventType) {
        case 'click':
            if (node) {
                window.open(String(node.value).valueOf(), '_blank');
            }
            break;
    }
};
const createCard = () => {
    const card = document.createElement('kul-card');
    card.addEventListener('kul-card-event', cardEventHandler);
    return card;
};
