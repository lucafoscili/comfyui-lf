import { EV_HANDLERS } from '../helpers/chip';
import { KulEventName } from '../types/events/events';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/_common';
import { ChipCSS, ChipFactory, ChipNormalizeCallback, ChipState } from '../types/widgets/chip';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, ChipState>();

export const chipFactory: ChipFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: true,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { selected } = STATE.get(wrapper);

        return selected || '';
      },
      setValue(value) {
        const state = STATE.get(wrapper);

        const callback: ChipNormalizeCallback = (v) => {
          const value = v ? v.split(', ') : [];
          state.selected = v;
          state.chip.setSelectedNodes(value);
        };

        normalizeValue(value, callback, CustomWidgetName.chip);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const chip = document.createElement(TagName.KulChip);

    content.classList.add(ChipCSS.Content);
    chip.classList.add(ChipCSS.Widget);
    chip.addEventListener(
      KulEventName.KulChip,
      EV_HANDLERS.chip.bind(EV_HANDLERS, STATE.get(wrapper)),
    );

    switch (node.comfyClass) {
      case NodeName.keywordToggleFromJson:
        chip.kulStyling = 'filter';
        break;
    }

    content.appendChild(chip);
    wrapper.appendChild(content);

    const options = chipFactory.options(wrapper);

    STATE.set(wrapper, { chip, node, selected: '', wrapper });

    return { widget: createDOMWidget(CustomWidgetName.chip, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
