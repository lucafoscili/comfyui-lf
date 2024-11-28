import { getCardProps, prepCards } from '../helpers/card';
import {
  CardsWithChipCSS,
  CardsWithChipDeserializedValue,
  CardsWithChipFactory,
  CardsWithChipNormalizeCallback,
  CardsWithChipState,
} from '../types/widgets/cardsWithChip';
import { CustomWidgetName, TagName } from '../types/widgets/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, CardsWithChipState>();

//#region Cards with chip
export const cardsWithChipFactory: CardsWithChipFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { chip, grid } = STATE.get(wrapper);

        return {
          chip: chip?.kulData || {},
          props: getCardProps(grid) || [],
        };
      },
      setValue(value) {
        const { chip, grid } = STATE.get(wrapper);

        const callback: CardsWithChipNormalizeCallback = (v, u) => {
          const dataset = u.parsedJson as CardsWithChipDeserializedValue;
          const cardsCount = prepCards(grid, dataset.props);
          if (!cardsCount || !v) {
            return;
          }
          const columns = cardsCount > 1 ? 2 : 1;
          grid.style.setProperty('--card-grid', String(columns).valueOf());
          if (chip) {
            chip.kulData = dataset.chip;
          }
        };

        normalizeValue(value, callback, CustomWidgetName.cardsWithChip);
      },
    };
  },
  //#endregion

  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const grid = document.createElement(TagName.Div);
    const cards = document.createElement(TagName.Div);
    const chip = document.createElement(TagName.KulChip);

    content.classList.add(CardsWithChipCSS.Content);
    grid.classList.add(CardsWithChipCSS.Grid);
    cards.classList.add(CardsWithChipCSS.Cards);
    chip.classList.add(CardsWithChipCSS.Chip);

    chip.kulStyle = '#kul-component .chip-set { height: auto; }';

    grid.appendChild(chip);
    grid.appendChild(cards);

    content.appendChild(grid);
    wrapper.appendChild(content);

    const options = cardsWithChipFactory.options(wrapper);

    STATE.set(wrapper, { chip, grid, node, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.cardsWithChip, wrapper, node, options) };
  },
  //#endregion

  //#region State
  state: STATE,
  //#endregion
};
