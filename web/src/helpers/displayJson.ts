import { app } from '/scripts/app.js';
import { ComfyWidgets } from '/scripts/widgets.js';

const widgetName = 'json_value';
const eventName: EventNames = 'lf-displayjson';

const eventCb = (event: CustomEvent<DisplayJSONPayload>) => {
  if (window.lfManager.getDebug()) {
    console.log(`Event '${eventName}' Callback`, event);
  }
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
  const props = node.lfProps as DisplayJSONProps;
  if (window.lfManager.getDebug()) {
    console.log(`Updating '${eventName}' Callback`, node);
  }
  const value = props?.payload?.json
    ? JSON.stringify(props.payload.json, null, 2)
    : 'Wow. Such empty. :V';

  const existingWidget = node.widgets?.find((w) => w.name === widgetName);
  if (existingWidget) {
    existingWidget.value = value;
  } else {
    const widget = ComfyWidgets.STRING(
      node,
      widgetName,
      [
        'STRING',
        {
          multiline: true,
        },
      ],
      app,
    ).widget;
    widget.inputEl.readOnly = true;
    widget.inputEl.style.opacity = 0.75;
    widget.value = value;
    widget.serializeValue = false;
  }

  requestAnimationFrame(() => {
    app.graph.setDirtyCanvas(true, false);
  });
};

export const DisplayJSONAdapter: () => DisplayJSONDictionaryEntry = () => {
  return {
    eventCb,
    eventName,
    updateCb,
  };
};
