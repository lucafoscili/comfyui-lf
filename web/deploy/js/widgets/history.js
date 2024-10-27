import { NodeName } from '../types/nodes.js';
import { ComfyWidgetName, CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, getWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-history';
const TYPE = CustomWidgetName.history;
export const historyFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        history: `${BASE_CSS_CLASS}__widget`,
    },
    options: (list) => {
        return {
            hideOnZoom: true,
            getComp() {
                return list;
            },
            getValue() {
                return list?.kulData || {};
            },
            setValue(value) {
                const callback = (_, u) => {
                    list.kulData = u.parsedJson || {};
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const history = document.createElement('kul-list');
        const options = historyFactory.options(history);
        content.classList.add(historyFactory.cssClasses.content);
        history.classList.add(historyFactory.cssClasses.history);
        history.kulEmptyLabel = 'History is empty!';
        history.kulEnableDeletions = true;
        switch (node.comfyClass) {
            case NodeName.loadFileOnce:
                break;
            default:
                history.kulSelectable = true;
                break;
        }
        history.addEventListener('kul-list-event', (e) => {
            handleEvent(e, node);
        });
        content.appendChild(history);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const handleEvent = (e, comfyNode) => {
    const { eventType, node } = e.detail;
    const strValue = node ? String(node.value).valueOf() : '';
    if (eventType === 'click' && strValue) {
        const boolW = getWidget(comfyNode, ComfyWidgetName.boolean);
        const customtextW = getWidget(comfyNode, ComfyWidgetName.customtext);
        const floatW = getWidget(comfyNode, ComfyWidgetName.float);
        const intW = getWidget(comfyNode, ComfyWidgetName.integer);
        const numberW = getWidget(comfyNode, ComfyWidgetName.number);
        const seedW = getWidget(comfyNode, ComfyWidgetName.seed);
        const comboW = getWidget(comfyNode, ComfyWidgetName.combo);
        const stringW = getWidget(comfyNode, ComfyWidgetName.string);
        switch (comfyNode.comfyClass) {
            case NodeName.boolean:
                boolW.value = Boolean(node.value).valueOf();
                break;
            case NodeName.float:
                if (numberW) {
                    numberW.value = Number(node.value).valueOf();
                }
                else if (intW) {
                    floatW.value = Number(node.value).valueOf();
                }
                break;
            case NodeName.integer:
            case NodeName.sequentialSeedsGenerator:
                if (numberW) {
                    numberW.value = Number(node.value).valueOf();
                }
                else if (intW) {
                    intW.value = Number(node.value).valueOf();
                }
                else if (seedW) {
                    seedW.value = Number(node.value).valueOf();
                }
                break;
            case NodeName.samplerSelector:
            case NodeName.schedulerSelector:
            case NodeName.upscaleModelSelector:
            case NodeName.vaeSelector:
                comboW.value = node.value;
                break;
            case NodeName.string:
                if (stringW) {
                    stringW.options.setValue(node.value);
                }
                else if (customtextW) {
                    customtextW.options.setValue(node.value);
                }
                break;
        }
    }
};
