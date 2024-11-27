import { KulListEventPayload } from '../types/ketchup-lite/components';
import { ComfyWidgetName, NodeName } from '../types/widgets/_common';
import { HistoryState } from '../types/widgets/history';
import { getWidget } from '../utils/common';

export const EV_HANDLERS = {
  //#region listEventHandler
  list: (e: CustomEvent<KulListEventPayload>, state: HistoryState) => {
    const { eventType, node } = e.detail;

    const comfyNode = state.node;

    const strValue = node ? String(node.value).valueOf() : '';

    if (eventType === 'click' && strValue) {
      const boolW = getWidget(comfyNode, ComfyWidgetName.boolean);
      const comboW = getWidget(comfyNode, ComfyWidgetName.combo);
      const customtextW = getWidget(comfyNode, ComfyWidgetName.customtext);
      const floatW = getWidget(comfyNode, ComfyWidgetName.float);
      const intW = getWidget(comfyNode, ComfyWidgetName.integer);
      const numberW = getWidget(comfyNode, ComfyWidgetName.number);
      const seedW = getWidget(comfyNode, ComfyWidgetName.seed);
      const stringW = getWidget(comfyNode, ComfyWidgetName.string);
      const toggleW = getWidget(comfyNode, ComfyWidgetName.toggle);

      switch (comfyNode.comfyClass as NodeName) {
        case NodeName.boolean:
          if (boolW) {
            boolW.value = String(node.value).toLowerCase() === 'true' ? true : false;
          } else if (toggleW) {
            toggleW.value = String(node.value).toLowerCase() === 'true' ? true : false;
          }
          break;
        case NodeName.float:
          if (numberW) {
            numberW.value = Number(node.value).valueOf();
          } else if (intW) {
            floatW.value = Number(node.value).valueOf();
          }
          break;
        case NodeName.integer:
        case NodeName.sequentialSeedsGenerator:
          if (numberW) {
            numberW.value = Number(node.value).valueOf();
          } else if (intW) {
            intW.value = Number(node.value).valueOf();
          } else if (seedW) {
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
          } else if (customtextW) {
            customtextW.options.setValue(node.value);
          }
          break;
      }
    }
  },
  //#endregion
};
