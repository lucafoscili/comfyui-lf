import { getLFManager } from '../utils/utils.js';
import { app } from '/scripts/app.js';
export const createDOMWidget = (name, type, element, node, options = undefined) => {
    getLFManager().log(`Creating '${type}'`, { element });
    return node.addDOMWidget(name, type, element, options);
};
export const getNode = (id) => {
    getLFManager().log(`Fetching node '${id}'`);
    return app.graph?.getNodeById(+(id || app.runningNodeId));
};
export const getWidget = (node, name) => {
    getLFManager().log(`Updating '${name}'`, { node });
    return node?.widgets?.find((w) => w.name === name);
};
export const initProps = (event) => {
    getLFManager().log(`Event '${event.type}' received`, { event }, 'success');
    const payload = event.detail;
    const node = getNode(payload.id);
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
    }
    else {
        getLFManager().log(`Whoops! It seems this node wasn't found '${payload.id}'`, { event }, 'error');
    }
    return node;
};
export const redrawCanvas = () => requestAnimationFrame(() => {
    app.graph.setDirtyCanvas(true, false);
});
