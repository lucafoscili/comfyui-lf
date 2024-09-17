import { KulChipEventPayload } from '../types/ketchup-lite/components';
import { KulChip } from '../types/ketchup-lite/components/kul-chip/kul-chip';
import { NodeName } from '../types/nodes';
import { CustomWidgetName, ChipWidgetOptions } from '../types/widgets';
import { createDOMWidget, getKulManager } from '../utils/common';

const BASE_CSS_CLASS = 'lf-chip';
const TYPE = CustomWidgetName.chip;

export const chipFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    chip: `${BASE_CSS_CLASS}__widget`,
  },
  options: (chip: HTMLKulChipElement) => {
    return {
      hideOnZoom: true,
      getComp() {
        return chip;
      },
      getValue() {
        return chip?.dataset.selectedChips;
      },
      setValue(value: string) {
        if (value) {
          const kulManager = getKulManager();
          chip.dataset.selectedChips = value;
          if (kulManager) {
            chip.setSelectedNodes(value.split(', '));
          } else {
            const managerCb = () => {
              chip.setSelectedNodes(value.split(', '));
              document.removeEventListener('kul-manager-ready', managerCb);
            };
            document.addEventListener('kul-manager-ready', managerCb);
          }
        }
      },
    } as ChipWidgetOptions;
  },
  render: (node: NodeType, name: CustomWidgetName) => {
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

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
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
