import { app } from '/scripts/app.js';
import { ComfyWidgets } from '/scripts/widgets.js';

const eventName: EventNames = 'lf-displayjson';
const widgets: Array<unknown> = [];

const eventCb = (event: CustomEvent<DisplayJSONPayload>) => {
  if (window.lfManager.getDebug()) {
    console.log(`Event '${eventName}' Callback`, event);
  }
  const { id, json } = event.detail;
  const node: NodeType = app.graph.getNodeById(+(id || app.runningNodeId));
  if (node) {
    const isInitialized = node.lfProps?.isInitialized;
    if (isInitialized) {
      node.lfProps = Object.assign(node.lfProps, {
        ...node.lfProps,
        json: JSON.stringify(json, null, 2),
      });
    } else {
      node.lfProps = { isInitialized: true, json: JSON.stringify(json, null, 2) };
    }
    updateCb(node);
  }
};

const updateCb = (node: NodeType) => {
  if (window.lfManager.getDebug()) {
    console.log(`Updating '${eventName}' Callback`, node);
  }
  const widgetExists = !!widgets?.length;
  const value = node.lfProps.json;
  const widget = widgetExists
    ? widgets[0]
    : ComfyWidgets.STRING(
        node,
        'value',
        [
          'STRING',
          {
            multiline: true,
          },
        ],
        app,
      ).widget;

  // Configure the widget
  widget.inputEl.readOnly = true;
  widget.inputEl.style.opacity = 0.75;
  widget.value = value || 'Wow. Such empty. :V';

  // Prevent the widget's value from being serialized to the node
  // This is a workaround to avoid saving widget values unnecessarily
  widget.serializeValue = async (): Promise<void> => {};

  if (!widgetExists) {
    widgets.push(widget);
  }

  requestAnimationFrame(() => {
    app.graph.setDirtyCanvas(true, false);
  });
};

export const DisplayJSONAdapter = () => {
  return {
    eventCb,
    eventName,
    updateCb,
    widgets,
  };
};
