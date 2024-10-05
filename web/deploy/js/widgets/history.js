import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, getWidget, deserializeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-history';
const TYPE = CustomWidgetName.history;
export const historyFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        history: `${BASE_CSS_CLASS}__widget`,
    },
    options: (history) => {
        return {
            hideOnZoom: true,
            getComp() {
                return history;
            },
            getValue() {
                const nodes = history?.kulData?.nodes;
                if (nodes?.length) {
                    return JSON.stringify(history.kulData);
                }
                return '';
            },
            setValue(value) {
                try {
                    if (typeof value === 'string') {
                        history.kulData = deserializeValue(value).parsedJson;
                    }
                    else {
                        history.kulData = value;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, history }, LogSeverity.Error);
                    history.kulData = null;
                }
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
        const comboW = getWidget(comfyNode, ComfyWidgetName.combo);
        const stringW = getWidget(comfyNode, ComfyWidgetName.string);
        switch (comfyNode.comfyClass) {
            case NodeName.boolean:
                boolW.value = Boolean(node.value).valueOf();
                break;
            case NodeName.float:
                if (numberW) {
                    stringW.options.setValue(node.value);
                }
                else if (intW) {
                    floatW.value = Number(node.value).valueOf();
                }
                break;
            case NodeName.integer:
                if (numberW) {
                    stringW.options.setValue(node.value);
                }
                else if (intW) {
                    intW.value = Number(node.value).valueOf();
                }
                break;
            case NodeName.samplerSelector:
            case NodeName.schedulerSelector:
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
