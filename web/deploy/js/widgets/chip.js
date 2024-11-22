import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { ChipCSS } from '../types/widgets/chip.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
//#region Chip
export const chipFactory = {
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
                const callback = (v) => {
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
const eventHandler = async (e) => {
    const { comp, eventType } = e.detail;
    switch (eventType) {
        case 'click':
            const chip = comp;
            const selectedValues = [];
            (await chip.getSelectedNodes()).forEach((node) => {
                selectedValues.push(String(node.value).valueOf());
            });
            chip.rootElement.dataset.selectedChips = selectedValues.join(', ');
            break;
    }
};
//#endregion
