import { app } from '/scripts/app.js';
import { ComfyWidgets } from '/scripts/widgets.js';
const eventName = 'lf-displayjson';
const widgets = [];
const eventCb = (event) => {
    if (window.lfManager.getDebug()) {
        console.log(`Event '${eventName}' Callback`, event);
    }
    const payload = event.detail;
    const node = app.graph.getNodeById(+(payload.id || app.runningNodeId));
    if (node) {
        const isInitialized = node.lfProps?.isInitialized;
        if (isInitialized) {
            node.lfProps = Object.assign(node.lfProps, {
                ...node.lfProps,
                payload,
            });
        }
        else {
            node.lfProps = { isInitialized: true, payload };
        }
        updateCb(node);
    }
};
const updateCb = (node) => {
    if (window.lfManager.getDebug()) {
        console.log(`Updating '${eventName}' Callback`, node);
    }
    const props = node.lfProps;
    const value = props?.payload?.json
        ? JSON.stringify(props.payload.json, null, 2)
        : 'Wow. Such empty. :V';
    const widgetExists = !!widgets?.length;
    const widget = widgetExists
        ? widgets[0]
        : ComfyWidgets.STRING(node, 'value', [
            'STRING',
            {
                multiline: true,
            },
        ], app).widget;
    // Configure the widget
    widget.inputEl.readOnly = true;
    widget.inputEl.style.opacity = 0.75;
    widget.value = value;
    // Prevent the widget's value from being serialized to the node
    // This is a workaround to avoid saving widget values unnecessarily
    widget.serializeValue = async () => { };
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
