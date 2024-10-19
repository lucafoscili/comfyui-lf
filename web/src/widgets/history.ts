import { KulDataDataset, KulListEventPayload } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { NodeName } from '../types/nodes';
import { ComfyWidgetName, CustomWidgetName, HistoryWidgetOptions } from '../types/widgets';
import { createDOMWidget, getLFManager, getWidget, deserializeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-history';
const TYPE = CustomWidgetName.history;

export const historyFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    history: `${BASE_CSS_CLASS}__widget`,
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
      setValue(value) {
        try {
          const dataset = deserializeValue(value).parsedJson as KulDataDataset;
          list.kulData = dataset;
        } catch (error) {
          getLFManager().log('Error when setting value!', { error, list }, LogSeverity.Error);
          list.kulData = null;
        }
      },
    } as HistoryWidgetOptions;
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

const handleEvent = (e: CustomEvent<KulListEventPayload>, comfyNode: NodeType) => {
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

    switch (comfyNode.comfyClass as NodeName) {
      case NodeName.boolean:
        boolW.value = Boolean(node.value).valueOf();
        break;
      case NodeName.float:
        if (numberW) {
          numberW.value = Number(node.value).valueOf();
        } else if (intW) {
          floatW.value = Number(node.value).valueOf();
        }
        break;
      case NodeName.integer:
        if (numberW) {
          numberW.value = Number(node.value).valueOf();
        } else if (intW) {
          intW.value = Number(node.value).valueOf();
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
        } else if (customtextW) {
          customtextW.options.setValue(node.value);
        }
        break;
    }
  }
};
