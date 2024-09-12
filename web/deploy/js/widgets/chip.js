import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, unescapeJson } from '../utils/common.js';
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
                return chip.kulData?.nodes ? JSON.stringify(chip.kulData) : undefined;
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        chip[prop] = prop;
                    }
                }
            },
            setValue(value) {
                chip.kulData = value;
                try {
                    if (typeof value === 'string') {
                        chip.kulData = unescapeJson(value).parsedJson;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, chip }, LogSeverity.Error);
                    if (value === undefined || value === '') {
                        chip.kulData = undefined;
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
        content.appendChild(chip);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
