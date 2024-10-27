import { EventName, Lora2PromptPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, type BaseWidgetCallback, type CodeWidgetSetter } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.lora2Prompt;

export const lora2PromptFactory = {
  eventHandler: (
    event: CustomEvent<Lora2PromptPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.code>,
  ) => {
    const name = EventName.lora2Prompt;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.code, addW);
      widget.options.setValue(event.detail.log);
      getApiRoutes().redraw();
    }
  },
  register: (setW: CodeWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.code>) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.code);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
