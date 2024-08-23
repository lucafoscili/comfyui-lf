import { app } from '/scripts/app.js';
const widgetName = 'histogram';
const eventName = 'lf-imagehistogram';
const cssClasses = {
    wrapper: 'lf-imagehistogram',
    widget: 'lf-imagehistogram__widget',
};
const eventCb = (event) => {
    window.lfManager.log(`Event '${eventName}' received`, { event });
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
    window.lfManager.log(`Updating '${eventName}'`, { node });
    const existingWidget = node?.widgets?.find((w) => w.name === widgetName);
    if (existingWidget) {
        existingWidget.element.refresh();
    }
    else {
        const widget = app.widgets.KUL_CHART(node, widgetName).widget;
        widget.serializeValue = false;
    }
    requestAnimationFrame(() => {
        app.graph.setDirtyCanvas(true, false);
    });
};
export const ImageHistogramAdapter = () => {
    return {
        getCustomWidgets: () => {
            let timeoutId = null;
            return {
                KUL_CHART(node, name) {
                    window.lfManager.log(`Adding 'KUL_CHART' custom widget`, { node }, 'success');
                    const props = node.lfProps;
                    const domWidget = document.createElement('div');
                    domWidget.refresh = () => {
                        window.lfManager.log(`Refreshing KUL_CHART custom widget`, { domWidget });
                        if (domWidget.firstChild) {
                            domWidget.removeChild(domWidget.firstChild);
                        }
                        const content = createWidget(props);
                        domWidget.appendChild(content);
                    };
                    domWidget.refresh();
                    const widget = node.addDOMWidget(name, widgetName, domWidget);
                    node.onResize = (number) => {
                        try {
                            if (domWidget?.firstChild && !timeoutId) {
                                timeoutId = setTimeout(() => {
                                    const chart = widget.element.querySelector('kul-chart');
                                    if (chart?.kulSizeX !== '100%') {
                                        chart.kulSizeX = '100%';
                                        chart.kulSizeY = '100%';
                                    }
                                    timeoutId = null;
                                }, 125);
                            }
                        }
                        catch (error) {
                            window.lfManager.log('Whoops! It seems there is no chart. :V', { error, number }, 'error');
                        }
                    };
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
    const dataset = props?.payload?.dataset;
    const content = document.createElement('div');
    content.classList.add(cssClasses.wrapper);
    const chartWidget = document.createElement('kul-chart');
    chartWidget.classList.add(cssClasses.widget);
    chartWidget.addEventListener('kul-chart-event', ({ detail }) => {
        window.lfManager.log(`Histogram ready, resizing`, { detail });
        const { comp, eventType } = detail;
        if (eventType === 'ready') {
            const refresh = () => {
                comp.kulSizeX = '100%';
                comp.kulSizeY = '100%';
            };
            setTimeout(refresh, 1000);
        }
    });
    chartWidget.kulAxis = 'Axis_0';
    chartWidget.kulColors = ['red', 'green', 'blue'];
    chartWidget.kulData = dataset;
    chartWidget.kulSeries = ['Series_0', 'Series_1', 'Series_2'];
    chartWidget.kulSizeX = '300px';
    chartWidget.kulSizeY = '200px';
    chartWidget.kulTypes = ['area'];
    content.appendChild(chartWidget);
    return content;
}
