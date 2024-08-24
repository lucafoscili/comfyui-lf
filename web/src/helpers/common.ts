import { app } from '/scripts/app.js';

export const getNode = (event: CustomEvent<ControlPanelPayload>) => {
  window.lfManager.log(`Event '${event.type}' received`, { event }, 'success');

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
  } else {
    window.lfManager.log(
      `Whoops! It seems this node wasn't found '${payload.id}'`,
      { event },
      'error',
    );
  }
  return node;
};

export const getWidget: (node: NodeType, name: string) => Widget = (node, name) => {
  window.lfManager.log(`Updating '${name}'`, { node });
  return node?.widgets?.find((w) => w.name === name);
};

export const redrawCanvas: () => number = () =>
  requestAnimationFrame(() => {
    app.graph.setDirtyCanvas(true, false);
  });

export const refreshWidget: (
  domWidget: DOMWidget,
  widgetCb: (props?: BaseLFProps) => HTMLElement,
) => void = (domWidget, widgetCb) => {
  () => {
    window.lfManager.log(`Refreshing widget`, { domWidget });

    if (domWidget.firstChild) {
      domWidget.removeChild(domWidget.firstChild);
    }
    const content = widgetCb();
    domWidget.appendChild(content);
  };
};
