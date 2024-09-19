import { EventName, ImageListFromJSONPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type ImagePreviewWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.imageListFromJSON;

export const imageListFromJsonFactory = {
  eventHandler: (event: CustomEvent<ImageListFromJSONPayload>, addW: BaseWidgetCallback) => {
    const name = EventName.blurImages;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.imagePreview, addW);
      widget.options.setValue({
        ...payload,
        selectedIndex: undefined,
        selectedName: undefined,
      });
      getApiRoutes().redraw();
    }
  },
  register: (setW: ImagePreviewWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
