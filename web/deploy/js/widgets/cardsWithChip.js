import { CustomWidgetName, } from '../types/widgets.js';
import { cardHandler, getCardProps } from '../helpers/card.js';
import { createDOMWidget, serializeValue, deserializeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-cardswithchip';
const TYPE = CustomWidgetName.cardsWithChip;
export const cardsWithChipFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        cards: `${BASE_CSS_CLASS}__cards`,
        chip: `${BASE_CSS_CLASS}__chip`,
        grid: `${BASE_CSS_CLASS}__grid`,
    },
    options: (grid) => {
        return {
            hideOnZoom: false,
            getComp() {
                const cards = Array.from(grid.querySelectorAll('kul-card'));
                const chip = grid.querySelector('kul-chip');
                return { cards, chip };
            },
            getValue() {
                const value = {
                    cardPropsArray: getCardProps(grid),
                    chipDataset: grid.querySelector('kul-chip')?.kulData,
                };
                return serializeValue(value);
            },
            setValue(value) {
                const { cardPropsArray, chipDataset } = deserializeValue(value)
                    .parsedJson;
                const cardsCount = cardHandler(grid.querySelector(`.${cardsWithChipFactory.cssClasses.cards}`), cardPropsArray);
                if (!cardsCount || !value) {
                    return;
                }
                const columns = cardsCount > 1 ? 2 : 1;
                grid.style.setProperty('--card-grid', String(columns).valueOf());
                const chip = grid.querySelector('kul-chip');
                if (chip) {
                    chip.kulData = chipDataset;
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const grid = document.createElement('div');
        const cards = document.createElement('div');
        const chip = document.createElement('kul-chip');
        const options = cardsWithChipFactory.options(grid);
        content.classList.add(cardsWithChipFactory.cssClasses.content);
        grid.classList.add(cardsWithChipFactory.cssClasses.grid);
        cards.classList.add(cardsWithChipFactory.cssClasses.cards);
        chip.classList.add(cardsWithChipFactory.cssClasses.chip);
        chip.kulStyle = '#kul-component .chip-set { height: auto; }';
        grid.appendChild(chip);
        grid.appendChild(cards);
        content.appendChild(grid);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
