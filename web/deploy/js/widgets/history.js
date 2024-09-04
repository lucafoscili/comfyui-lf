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
    if (eventType === 'click' && node?.value) {
        const floatW = getWidget(comfyNode, ComfyWidgetName.float);
        const intW = getWidget(comfyNode, ComfyWidgetName.integer);
        const stringW = getWidget(comfyNode, ComfyWidgetName.string);
        if (floatW) {
            floatW.value = node.value;
        }
        else if (intW) {
            intW.value = node.value;
        }
        else if (stringW) {
            stringW.options.setValue(node.value);
        }
    }
};
