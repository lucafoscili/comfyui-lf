import { KulEventName } from '../types/events/events';
import { KulChipEventPayload } from '../types/ketchup-lite/components';
import { KulChip } from '../types/ketchup-lite/components/kul-chip/kul-chip';
import {
  CustomWidgetName,
  CustomWidgetDeserializedValuesMap,
  NormalizeValueCallback,
  NodeName,
  TagName,
} from '../types/widgets/_common';
import { ChipCSS, ChipFactory } from '../types/widgets/chip';
import { createDOMWidget, normalizeValue } from '../utils/common';

//#region Chip
export const chipFactory: ChipFactory = {
  options: (chip) => {
    return {
      hideOnZoom: true,
      getComp() {
        return chip;
      },
      getValue() {
        return chip?.dataset.selectedChips || '';
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.chip> | string
        > = (v) => {
          chip.dataset.selectedChips = v;
          chip.setSelectedNodes(v.split(', '));
        };

        normalizeValue(value, callback, CustomWidgetName.chip);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const chip = document.createElement(TagName.KulChip);
    const options = chipFactory.options(chip);

    content.classList.add(ChipCSS.Content);
    chip.classList.add(ChipCSS.Widget);
    chip.addEventListener(KulEventName.KulChip, eventHandler);

    switch (node.comfyClass) {
      case NodeName.keywordToggleFromJson:
        chip.kulStyling = 'filter';
        break;
    }

    content.appendChild(chip);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(CustomWidgetName.chip, wrapper, node, options) };
  },
};

const eventHandler = async (e: CustomEvent<KulChipEventPayload>) => {
  const { comp, eventType } = e.detail;
  switch (eventType) {
    case 'click':
      const chip = comp as KulChip;
      const selectedValues: string[] = [];
      (await chip.getSelectedNodes()).forEach((node) => {
        selectedValues.push(String(node.value).valueOf());
      });
      chip.rootElement.dataset.selectedChips = selectedValues.join(', ');
      break;
  }
};
//#endregion
