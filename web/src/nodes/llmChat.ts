import { NodeName, type Extension } from '../types/nodes';
import { ChatWidgetSetter, CustomWidgetName, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes } from '../utils/common';

const NAME = NodeName.llmChat;

export const llmChatFactory = {
  register: (setW: ChatWidgetSetter, addW: BaseWidgetCallback<CustomWidgetName.chat>) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.chat);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
