import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-chip';
const TYPE = CustomWidgetName.chip;
//#region Chip
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
                return chip?.dataset.selectedChips || '';
            },
            setValue(value) {
                const callback = (v) => {
                    chip.dataset.selectedChips = v;
                    chip.setSelectedNodes(v.split(', '));
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const chip = document.createElement(TagName.KulChip);
        const options = chipFactory.options(chip);
        content.classList.add(chipFactory.cssClasses.content);
        chip.classList.add(chipFactory.cssClasses.chip);
        chip.addEventListener(KulEventName.KulChip, eventHandler);
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
