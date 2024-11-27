import { CustomWidgetName, NodeName, TagName } from '../types/widgets/_common';
import { getCardProps, EV_HANDLERS, prepCards } from '../helpers/card';
import { createDOMWidget, normalizeValue } from '../utils/common';
import {
  CardCSS,
  CardDeserializedValue,
  CardFactory,
  CardNormalizeCallback,
  CardState,
} from '../types/widgets/card';
import { KulEventName } from '../types/events/events';

const STATE = new WeakMap<HTMLDivElement, CardState>();

export const cardFactory: CardFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { grid } = STATE.get(wrapper);

        return {
          props: getCardProps(grid) || [],
        };
      },
      setValue(value) {
        const { grid } = STATE.get(wrapper);

        const callback: CardNormalizeCallback = (_, u) => {
          const { props } = u.parsedJson as CardDeserializedValue;
          const len = props?.length > 1 ? 2 : 1;
          grid.style.setProperty('--card-grid', `repeat(1, 1fr) / repeat(${len}, 1fr)`);
          prepCards(grid, props);
        };

        normalizeValue(value, callback, CustomWidgetName.card);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const grid = document.createElement(TagName.Div);

    grid.classList.add(CardCSS.Grid);

    content.classList.add(CardCSS.Content);
    content.appendChild(grid);

    switch (node.comfyClass as NodeName) {
      case NodeName.checkpointSelector:
      case NodeName.embeddingSelector:
      case NodeName.loraAndEmbeddingSelector:
      case NodeName.loraSelector:
        content.classList.add(CardCSS.ContentHasButton);
        const spinner = document.createElement(TagName.KulSpinner);
        spinner.kulActive = true;
        spinner.kulDimensions = '0.6em';
        spinner.kulLayout = 2;
        spinner.slot = 'spinner';

        const button = document.createElement(TagName.KulButton);
        button.classList.add('kul-full-width');
        button.kulIcon = 'cloud_download';
        button.kulLabel = 'Refresh';
        button.title = 'Attempts to manually ownload fresh metadata from CivitAI';
        button.addEventListener(
          KulEventName.KulButton,
          EV_HANDLERS.button.bind(EV_HANDLERS.button, STATE.get(wrapper)),
        );

        button.appendChild(spinner);
        content.appendChild(button);
        break;
    }

    wrapper.appendChild(content);

    const options = cardFactory.options(wrapper);

    STATE.set(wrapper, { grid, node, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.card, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
