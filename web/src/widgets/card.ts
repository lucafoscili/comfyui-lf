import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NodeName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import {
  cardHandler,
  cardPlaceholders,
  fetchModelMetadata,
  getCardProps,
  selectorButton,
} from '../helpers/card';
import { createDOMWidget, getCustomWidget, normalizeValue } from '../utils/common';
import { KulButtonEventPayload } from '../types/ketchup-lite/components';
import { CardCSS, CardDeserializedValue, CardFactory } from '../types/widgets/card';
import { APIMetadataEntry } from '../types/api/api';
import { KulEventName } from '../types/events/events';

//#region Card factory
export const cardFactory: CardFactory = {
  options: (grid) => {
    return {
      hideOnZoom: false,
      getComp() {
        return Array.from(grid.querySelectorAll(TagName.KulCard));
      },
      getValue() {
        return {
          props: getCardProps(grid) || [],
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.card> | string
        > = (_, u) => {
          const { props } = u.parsedJson as CardDeserializedValue;
          const len = props?.length > 1 ? 2 : 1;
          grid.style.setProperty('--card-grid', `repeat(1, 1fr) / repeat(${len}, 1fr)`);
          cardHandler(grid, props);
        };

        normalizeValue(value, callback, CustomWidgetName.card);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const grid = document.createElement(TagName.Div);
    const options = cardFactory.options(grid);

    content.classList.add(CardCSS.Content);
    grid.classList.add(CardCSS.Grid);

    content.appendChild(grid);
    wrapper.appendChild(content);

    switch (node.comfyClass as NodeName) {
      case NodeName.checkpointSelector:
      case NodeName.embeddingSelector:
      case NodeName.loraAndEmbeddingSelector:
      case NodeName.loraSelector:
        content.classList.add(CardCSS.ContentHasButton);
        content.appendChild(selectorButton(grid, node));
        break;
    }

    return { widget: createDOMWidget(CustomWidgetName.card, wrapper, node, options) };
  },
};
//#endregion
