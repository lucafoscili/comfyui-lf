import { CustomWidgetName } from '../types/widgets.js';
import { cardHandler, getCardProps } from '../utils/card-helper.js';
import { createDOMWidget, serializeValue, deserializeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;
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
                    propsArray: getCardProps(grid),
                    template: grid?.style.getPropertyValue('--card-grid') || '',
                };
                return serializeValue(value);
            },
            setValue(value) {
                if (!value) {
                    return;
                }
                const { propsArray, template } = deserializeValue(value)
                    .parsedJson;
                const gridTemplate = template || 'repeat(1, 1fr) / repeat(1, 1fr)';
                grid.style.setProperty('--card-grid', gridTemplate);
                cardHandler(grid, propsArray);
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
