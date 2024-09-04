import { KulDataDataset, KulListEventPayload } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, getWidget, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-list';
const TYPE = CustomWidgetName.list;

export const listFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    list: `${BASE_CSS_CLASS}__widget`,
  },
  options: (list: HTMLKulListElement) => {
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
      setProps(props: Partial<HTMLKulListElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            list[prop] = prop;
          }
        }
      },
      setValue(value: KulDataDataset | string) {
        try {
          if (typeof value === 'string') {
            list.kulData = unescapeJson(value).parsedJson;
          } else {
            list.kulData = value;
          }
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, list }, LogSeverity.Error);
          list.kulData = null;
        }
      },
    };
  },
  render: (node: NodeType, name: CustomWidgetName) => {
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

const handleEvent = (e: CustomEvent<KulListEventPayload>, comfyNode: NodeType) => {
  const { eventType, node } = e.detail;
  if (eventType === 'click' && node?.value) {
    const floatW = getWidget(comfyNode, ComfyWidgetName.float);
    const intW = getWidget(comfyNode, ComfyWidgetName.integer);
    const stringW = getWidget(comfyNode, ComfyWidgetName.string);
    if (floatW) {
      floatW.value = node.value;
    } else if (intW) {
      intW.value = node.value;
    } else if (stringW) {
      stringW.options.setValue(node.value);
    }
  }
};
