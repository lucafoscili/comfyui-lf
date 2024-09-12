import { NodeName, type Extension } from '../types/nodes';
import { BaseWidgetCallback, CustomWidgetName, UploadWidgetSetter } from '../types/widgets';
import { getApiRoutes } from '../utils/common';

const NAME = NodeName.loadMetadata;

export const loadMetadataFactory = {
  register: (setW: UploadWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
