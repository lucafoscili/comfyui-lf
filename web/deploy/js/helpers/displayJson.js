import { getLFManager } from '../utils/utils.js';
import { app } from '/scripts/app.js';
const widgetName = 'json_value';
const eventName = 'lf-displayjson';
const cssClasses = {
    wrapper: 'lf-displayjson',
    widget: 'lf-displayjson__widget',
};
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
export const DisplayJSONAdapter = () => {
    return {
        getCustomWidgets: () => {
            return {
                KUL_CODE(node, name) {
                    getLFManager().log(`Adding KUL_CODE custom widget`, { node });
                    const props = node.lfProps;
                    const domWidget = document.createElement('div');
                    domWidget.refresh = () => {
                        getLFManager().log(`Refreshing KUL_CODE custom widget`, { domWidget });
                        if (domWidget.firstChild) {
                            domWidget.removeChild(domWidget.firstChild);
                        }
                        const content = createWidget(props);
                        domWidget.appendChild(content);
                    };
                    domWidget.refresh();
                    const widget = node.addDOMWidget(name, widgetName, domWidget);
                    return { widget };
                },
            };
        },
        eventCb,
        eventName,
        updateCb,
    };
};
function createWidget(props) {
    const value = props?.payload?.json;
    const content = document.createElement('div');
    content.classList.add(cssClasses.wrapper);
    const codeWidget = document.createElement('kul-code');
    codeWidget.classList.add(cssClasses.widget);
    codeWidget.kulLanguage = 'json';
    codeWidget.kulValue = value ? JSON.stringify(value, null, 2) : 'Wow. Such empty!';
    content.appendChild(codeWidget);
    return content;
}
