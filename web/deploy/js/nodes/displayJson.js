import { getLFManager } from '../utils/utils.js';
import { app } from '/scripts/app.js';
const widgetName = 'json_value';
const eventName = 'lf-displayjson';
const eventCb = (event) => {
    getLFManager().log(`Event '${eventName}' received`, { event }, 'success');
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
    getLFManager().log(`Updating '${eventName}'`, { node });
    const existingWidget = node?.widgets?.find((w) => w.name === widgetName);
    if (existingWidget) {
        existingWidget.element.refresh();
    }
    else {
        const widget = app.widgets.KUL_CODE(node, widgetName).widget;
        widget.serializeValue = false;
    }
    requestAnimationFrame(() => {
        app.graph.setDirtyCanvas(true, false);
    });
};
