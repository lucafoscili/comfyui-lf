import { EventName, SequentialSeedsGeneratorPayload } from '../types/events';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { CustomWidgetName, HistoryWidgetSetter, type BaseWidgetCallback } from '../types/widgets';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common';

const NAME = NodeName.sequentialSeedsGenerator;

export const sequentialSeedsGeneratorFactory = {
  eventHandler: (
    event: CustomEvent<SequentialSeedsGeneratorPayload>,
    addW: BaseWidgetCallback<CustomWidgetName.history>,
  ) => {
    const name = EventName.sequentialSeedsGenerator;
    getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Info);

    const payload = event.detail;
    const node = getApiRoutes().getNodeById(payload.id);
    if (node) {
      const list = getCustomWidget(node, CustomWidgetName.history, addW);
      if (list) {
        list.options.setValue(JSON.stringify(payload.dataset));
      }

      getApiRoutes().redraw();
    }
  },
  register: (setW: HistoryWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
