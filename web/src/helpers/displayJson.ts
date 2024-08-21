import { app } from '/scripts/app.js';
import { ComfyWidgets } from '/scripts/widgets.js';

const eventName: EventNames = 'lf-displayjson';
const widgets: Array<unknown> = [];

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
  if (window.lfManager.getDebug()) {
    console.log(`Updating '${eventName}' Callback`, node);
  }
  const props = node.lfProps as DisplayJSONProps;
  const value = props?.payload?.json
    ? JSON.stringify(props.payload.json, null, 2)
    : 'Wow. Such empty. :V';

  const widgetExists = !!widgets?.length;
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
  widget.value = value;

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

export const DisplayJSONAdapter: () => DisplayJSONDictionaryEntry = () => {
  return {
    eventCb,
    eventName,
    updateCb,
    widgets,
  };
};
