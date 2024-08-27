import { getLFManager } from '../utils/utils';
import { app } from '/scripts/app.js';

const widgetName = 'json_value';
const eventName: EventNames = 'lf-displayjson';

const eventCb = (event: CustomEvent<DisplayJSONPayload>) => {
  getLFManager().log(`Event '${eventName}' received`, { event }, 'success');

  const payload = event.detail;
  const node: NodeType = app.graph.getNodeById(+(payload.id || app.runningNodeId));
  if (node) {
    const isInitialized = node.lfProps?.isInitialized;
    if (isInitialized) {
      node.lfProps = Object.assign(node.lfProps, {
        ...node.lfProps,
        payload,
      });
    } else {
      node.lfProps = { isInitialized: true, payload };
    }
    updateCb(node);
  }
};

const updateCb = (node: NodeType) => {
  getLFManager().log(`Updating '${eventName}'`, { node });

  const existingWidget = node?.widgets?.find((w) => w.name === widgetName);
  if (existingWidget) {
    (existingWidget.element as DOMWidget).refresh();
  } else {
    const widget = app.widgets.KUL_CODE(node, widgetName).widget;
    widget.serializeValue = false;
  }

  requestAnimationFrame(() => {
    app.graph.setDirtyCanvas(true, false);
  });
};
