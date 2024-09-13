import { LogSeverity } from '../types/manager.js';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, getWidget, unescapeJson } from '../utils/common.js';
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
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        history[prop] = prop;
                    }
                }
            },
            setValue(value) {
                try {
                    if (typeof value === 'string') {
                        history.kulData = unescapeJson(value).parsedJson;
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
        history.kulSelectable = true;
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
        const stringW = getWidget(comfyNode, ComfyWidgetName.string);
        if (boolW) {
            boolW.value = Boolean(node.value).valueOf();
        }
        else if (floatW) {
            floatW.value = Number(node.value).valueOf();
        }
        else if (intW) {
            intW.value = Number(node.value).valueOf();
        }
        else if (stringW) {
            stringW.options.setValue(node.value);
        }
        else if (customtextW) {
            customtextW.options.setValue(node.value);
        }
        else if (numberW) {
            numberW.value = Number(node.value).valueOf();
        }
    }
};
