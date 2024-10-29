import { EventName, LoadImagesPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import {
  CustomWidgetName,
  type BaseWidgetCallback,
  type MasonryWidgetSetter,
} from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.loadImages;

export const loadImagesFactory = {
  eventHandler: (
    event: CustomEvent<LoadImagesPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.masonry>,
  ) => {
    const name = EventName.loadImages;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const widget = getCustomWidget(node, CustomWidgetName.masonry, addW);
      widget.options.setValue(JSON.stringify(payload));
      getApiRoutes().redraw();
    }
  },
  register: (setW: MasonryWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
