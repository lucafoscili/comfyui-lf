import { KulChipEventPayload } from '../types/ketchup-lite/components';
import { KulChip } from '../types/ketchup-lite/components/kul-chip/kul-chip';
import { NodeName } from '../types/nodes';
import {
  CustomWidgetName,
  CustomWidgetDeserializedValuesMap,
  NormalizeValueCallback,
} from '../types/widgets';
import { ChipFactory } from '../types/widgets/chip';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-chip';
const TYPE = CustomWidgetName.chip;

export const chipFactory: ChipFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    chip: `${BASE_CSS_CLASS}__widget`,
  },
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
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (v) => {
          chip.dataset.selectedChips = v;
          chip.setSelectedNodes(v.split(', '));
        };

        normalizeValue(value, callback, TYPE);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const chip = document.createElement('kul-chip');
    const options = chipFactory.options(chip);

    content.classList.add(chipFactory.cssClasses.content);
    chip.classList.add(chipFactory.cssClasses.chip);
    chip.addEventListener('kul-chip-event', eventHandler);

    switch (node.comfyClass) {
      case NodeName.keywordToggleFromJson:
        chip.kulStyling = 'filter';
        break;
    }

    content.appendChild(chip);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
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
