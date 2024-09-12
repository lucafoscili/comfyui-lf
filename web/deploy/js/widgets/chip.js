import { NodeName } from '../types/nodes.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getKulManager } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-chip';
const TYPE = CustomWidgetName.chip;
export const chipFactory = {
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
                return chip?.dataset.selectedChips;
            },
            setValue(value) {
                if (value) {
                    const kulManager = getKulManager();
                    if (kulManager) {
                        chip.selectNodes(value.split(', '));
                    }
                    else {
                        const managerCb = () => {
                            chip.selectNodes(value.split(', '));
                            document.removeEventListener('kul-manager-ready', managerCb);
                        };
                        document.addEventListener('kul-manager-ready', managerCb);
                    }
                }
            },
        };
    },
    render: (node, name) => {
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
const eventHandler = async (e) => {
    const { comp, eventType } = e.detail;
    switch (eventType) {
        case 'click':
            const chip = comp;
            const selectedValues = [];
            (await chip.getSelected()).forEach((node) => {
                selectedValues.push(String(node.value).valueOf());
            });
            chip.rootElement.dataset.selectedChips = selectedValues.join(', ');
            break;
    }
};
