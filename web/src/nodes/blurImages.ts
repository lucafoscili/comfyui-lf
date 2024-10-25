import { BlurImagesPayload, EventName } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  ImagePreviewWidgetDeserializedValue,
  type BaseWidgetCallback,
  type ImagePreviewWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.blurImages;

export const blurImagesFactory = {
  eventHandler: (
    event: CustomEvent<BlurImagesPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.imagePreview>,
  ) => {
    const name = EventName.blurImages;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.imagePreview, addW);
      const value: ImagePreviewWidgetDeserializedValue = {
        ...payload,
        selectedIndex: undefined,
        selectedName: undefined,
      };
      widget.options.setValue(JSON.stringify(value));
      getApiRoutes().redraw();
    }
  },
  register: (
    setW: ImagePreviewWidgetSetter,
    addW: BaseWidgetCallback<CustomWidgetName.imagePreview>,
  ) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onNodeCreated = nodeType.prototype.onNodeCreated;
          nodeType.prototype.onNodeCreated = function () {
            const r = onNodeCreated?.apply(this, arguments);
            const node = this;
            addW(node, CustomWidgetName.imagePreview);
            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
