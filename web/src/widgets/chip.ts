import { KulDataDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { CustomWidgetName, ChipWidgetOptions } from '../types/widgets';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common';

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
        return chip.kulData?.nodes ? JSON.stringify(chip.kulData) : undefined;
      },
      setProps(props: Partial<HTMLKulChipElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            chip[prop] = prop;
          }
        }
      },
      setValue(value: KulDataDataset | string) {
        chip.kulData = value as KulDataDataset;
        try {
          if (typeof value === 'string') {
            chip.kulData = unescapeJson(value).parsedJson;
          }
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, chip }, LogSeverity.Error);
          if (value === undefined || value === '') {
            chip.kulData = undefined;
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

    content.appendChild(chip);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};
