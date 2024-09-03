import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { createDOMWidget, getLFManager, getWidget, unescapeJson } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-list';
const TYPE = CustomWidgetName.list;
export const listFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        list: `${BASE_CSS_CLASS}__widget`,
    },
    options: (list) => {
        return {
            hideOnZoom: true,
            getComp() {
                return list;
            },
            getValue() {
                const nodes = list?.kulData?.nodes;
                if (nodes?.length) {
                    return JSON.stringify(list.kulData);
                }
                return '';
            },
            setProps(props) {
                for (const key in props) {
                    if (Object.prototype.hasOwnProperty.call(props, key)) {
                        const prop = props[key];
                        list[prop] = prop;
                    }
                }
            },
            setValue(value) {
                try {
                    if (typeof value === 'string') {
                        list.kulData = unescapeJson(value).parsedJson;
                    }
                    else {
                        list.kulData = value;
                    }
                }
                catch (error) {
                    getLFManager().log('Error when setting value!', { error, list }, LogSeverity.Error);
                    list.kulData = null;
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const list = document.createElement('kul-list');
        const options = listFactory.options(list);
        content.classList.add(listFactory.cssClasses.content);
        list.classList.add(listFactory.cssClasses.list);
        list.kulEnableDeletions = true;
        list.kulSelectable = true;
        list.addEventListener('kul-list-event', (e) => {
            handleEvent(e, node);
        });
        content.appendChild(list);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const handleEvent = (e, comfyNode) => {
    const { eventType, node } = e.detail;
    if (eventType === 'click' && node?.value) {
        const stringW = getWidget(comfyNode, CustomWidgetName.string);
        stringW.options.setValue(node.value);
    }
};
