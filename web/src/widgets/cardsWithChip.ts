import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
} from '../types/widgets/_common';
import { cardHandler, getCardProps } from '../helpers/card';
import { createDOMWidget, normalizeValue } from '../utils/common';
import {
  CardsWithChipDeserializedValue,
  CardsWithChipFactory,
} from '../types/widgets/cardsWithChip';

const BASE_CSS_CLASS = 'lf-cardswithchip';
const TYPE = CustomWidgetName.cardsWithChip;

export const cardsWithChipFactory: CardsWithChipFactory = {
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
        return {
          chip: grid.querySelector('kul-chip')?.kulData || {},
          props: getCardProps(grid) || [],
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (v, u) => {
          const { props, chip } = u.parsedJson as CardsWithChipDeserializedValue;
          const cardsCount = cardHandler(
            grid.querySelector(`.${cardsWithChipFactory.cssClasses.cards}`),
            props,
          );
          if (!cardsCount || !v) {
            return;
          }
          const columns = cardsCount > 1 ? 2 : 1;
          grid.style.setProperty('--card-grid', String(columns).valueOf());
          const chipEl = grid.querySelector('kul-chip') as HTMLKulChipElement;
          if (chipEl) {
            chipEl.kulData = chip;
          }
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
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

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};
