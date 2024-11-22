import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { cardHandler, getCardProps } from '../helpers/card';
import { createDOMWidget, normalizeValue } from '../utils/common';
import {
  CardsWithChipCSS,
  CardsWithChipDeserializedValue,
  CardsWithChipFactory,
} from '../types/widgets/cardsWithChip';

//#region Cards with chip
export const cardsWithChipFactory: CardsWithChipFactory = {
  options: (grid) => {
    return {
      hideOnZoom: false,
      getComp() {
        const cards = Array.from(grid.querySelectorAll(TagName.KulCard));
        const chip = grid.querySelector(TagName.KulChip);
        return { cards, chip };
      },
      getValue() {
        return {
          chip: grid.querySelector(TagName.KulChip)?.kulData || {},
          props: getCardProps(grid) || [],
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.cardsWithChip> | string
        > = (v, u) => {
          const { props, chip } = u.parsedJson as CardsWithChipDeserializedValue;
          const cardsCount = cardHandler(grid.querySelector(`.${CardsWithChipCSS.Cards}`), props);
          if (!cardsCount || !v) {
            return;
          }
          const columns = cardsCount > 1 ? 2 : 1;
          grid.style.setProperty('--card-grid', String(columns).valueOf());
          const chipEl = grid.querySelector(TagName.KulChip);
          if (chipEl) {
            chipEl.kulData = chip;
          }
        };

        normalizeValue(value, callback, CustomWidgetName.cardsWithChip);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const grid = document.createElement(TagName.Div);
    const cards = document.createElement(TagName.Div);
    const chip = document.createElement(TagName.KulChip);
    const options = cardsWithChipFactory.options(grid);

    content.classList.add(CardsWithChipCSS.Content);
    grid.classList.add(CardsWithChipCSS.Grid);
    cards.classList.add(CardsWithChipCSS.Cards);
    chip.classList.add(CardsWithChipCSS.Chip);

    chip.kulStyle = '#kul-component .chip-set { height: auto; }';

    grid.appendChild(chip);
    grid.appendChild(cards);

    content.appendChild(grid);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(CustomWidgetName.cardsWithChip, wrapper, node, options) };
  },
};
//#endregion
