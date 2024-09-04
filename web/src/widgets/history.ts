import { KulDataDataset, KulListEventPayload } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { ComfyWidgetName, CustomWidgetName } from '../types/widgets';
import { createDOMWidget, getLFManager, getWidget, unescapeJson } from '../utils/common';

const BASE_CSS_CLASS = 'lf-history';
const TYPE = CustomWidgetName.history;

export const historyFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    history: `${BASE_CSS_CLASS}__widget`,
  },
  options: (history: HTMLKulListElement) => {
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
      setProps(props: Partial<HTMLKulListElement>) {
        for (const key in props) {
          if (Object.prototype.hasOwnProperty.call(props, key)) {
            const prop = props[key];
            history[prop] = prop;
          }
        }
      },
      setValue(value: KulDataDataset | string) {
        try {
          if (typeof value === 'string') {
            history.kulData = unescapeJson(value).parsedJson;
          } else {
            history.kulData = value;
          }
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, history }, LogSeverity.Error);
          history.kulData = null;
        }
      },
    };
  },
  render: (node: NodeType, name: CustomWidgetName) => {
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

const handleEvent = (e: CustomEvent<KulListEventPayload>, comfyNode: NodeType) => {
  const { eventType, node } = e.detail;
  const strValue = node ? String(node.value).valueOf() : '';
  if (eventType === 'click' && strValue) {
    const boolW = getWidget(comfyNode, ComfyWidgetName.boolean);
    const floatW = getWidget(comfyNode, ComfyWidgetName.float);
    const intW = getWidget(comfyNode, ComfyWidgetName.integer);
    const stringW = getWidget(comfyNode, ComfyWidgetName.string);
    if (boolW) {
      boolW.value = node.value;
    } else if (floatW) {
      floatW.value = node.value;
    } else if (intW) {
      intW.value = node.value;
    } else if (stringW) {
      stringW.options.setValue(node.value);
    }
  }
};
