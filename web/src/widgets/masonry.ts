import { EV_HANDLERS } from '../helpers/masonry';
import { KulEventName } from '../types/events/events';
import {
  MasonryCSS,
  MasonryDeserializedValue,
  MasonryFactory,
  MasonryNormalizeCallback,
  MasonryState,
} from '../types/widgets/masonry';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets';
import { createDOMWidget, isValidNumber, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, MasonryState>();

export const masonryFactory: MasonryFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: false,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { masonry, selected } = STATE.get(wrapper);
        const { index, name } = selected;

        return {
          columns: masonry?.kulColumns || 3,
          dataset: masonry?.kulData || {},
          index: isValidNumber(index) ? index : NaN,
          name: name || '',
          view: masonry?.kulView || 'masonry',
        };
      },
      setValue(value) {
        const callback: MasonryNormalizeCallback = (_, u) => {
          const { masonry, selected } = STATE.get(wrapper);

          const { columns, dataset, index, name, view } = u.parsedJson as MasonryDeserializedValue;

          if (columns) {
            masonry.kulColumns = columns;
          }
          if (dataset) {
            masonry.kulData = dataset || {};
          }
          if (view) {
            masonry.kulView = view;
          }
          if (isValidNumber(index)) {
            selected.index = index;
            selected.name = name || '';
            masonry.setSelectedShape(index);
          }
        };

        normalizeValue(value, callback, CustomWidgetName.masonry);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const masonry = document.createElement(TagName.KulMasonry);

    masonry.classList.add(MasonryCSS.Widget);
    masonry.addEventListener(
      KulEventName.KulMasonry,
      EV_HANDLERS.masonry.bind(EV_HANDLERS.masonry, STATE.get(wrapper)),
    );

    switch (node.comfyClass) {
      case NodeName.loadImages:
        masonry.kulSelectable = true;
        break;
    }

    content.classList.add(MasonryCSS.Content);
    content.appendChild(masonry);

    wrapper.appendChild(content);

    const options = masonryFactory.options(wrapper);

    STATE.set(wrapper, { masonry, node, selected: { index: NaN, name: '' }, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.masonry, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
