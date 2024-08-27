/*import { getLFManager } from "../../../comfyui-lf/web/src/utils/utils";
import { app } from "/scripts/app.js";

const cssClasses = {
  wrapper: "lf-imagehistogram",
  widget: "lf-imagehistogram__widget",
};
const eventName: EventNames = "lf-imagehistogram";
const widgetName = "histogram";

const eventCb = (event: CustomEvent<ImageHistogramPayload>) => {
  getLFManager().log(`Event '${eventName}' received`, { event });

  const payload = event.detail;
  const node: NodeType = app.graph.getNodeById(
    +(payload.id || app.runningNodeId)
  );
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
    const widget = app.widgets.KUL_CHART(node, widgetName).widget;
    widget.serializeValue = false;
  }

  requestAnimationFrame(() => {
    app.graph.setDirtyCanvas(true, false);
  });
};

export const ImageHistogramAdapter: () => ImageHistogramDictionaryEntry =
  () => {
    return {
      getCustomWidgets: () => {
        let timeoutId: NodeJS.Timeout | null = null;

        return {
          KUL_CHART(node, name) {
            getLFManager().log(
              `Adding 'KUL_CHART' custom widget`,
              { node },
              "success"
            );

            const props = node.lfProps as ImageHistogramProps;
            const domWidget = document.createElement("div") as DOMWidget;
            domWidget.refresh = () => {
              getLFManager().log(`Refreshing KUL_CHART custom widget`, {
                domWidget,
              });

              if (domWidget.firstChild) {
                domWidget.removeChild(domWidget.firstChild);
              }
              const content = createWidget(props);
              domWidget.appendChild(content);
            };
            domWidget.refresh();

            const widget: Widget = node.addDOMWidget(
              name,
              widgetName,
              domWidget
            );
            node.onResize = (number) => {
              try {
                if (domWidget?.firstChild && !timeoutId) {
                  timeoutId = setTimeout(() => {
                    const chart = widget.element.querySelector("kul-chart");
                    chart.refresh();
                    timeoutId = null;
                  }, 125);
                }
              } catch (error) {
                getLFManager().log(
                  "Whoops! It seems there is no chart. :V",
                  { error, number },
                  "error"
                );
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

function createWidget(props: ImageHistogramProps) {
  const dataset = props?.payload?.dataset;
  const readyCb = ({ detail }) => {
    getLFManager().log(`Histogram ready, resizing`, { detail });

    const { eventType } = detail;
    if (eventType === "ready") {
      chartWidget.kulAxis = "Axis_0";
      chartWidget.kulColors = ["red", "green", "blue"];
      chartWidget.kulData = dataset;
      chartWidget.kulSeries = ["Series_0", "Series_1", "Series_2"];
      chartWidget.removeEventListener("kul-chart-event", readyCb);
    }
  };

  const content = document.createElement("div");
  content.classList.add(cssClasses.wrapper);

  const chartWidget = document.createElement("kul-chart");
  chartWidget.classList.add(cssClasses.widget);
  chartWidget.addEventListener("kul-chart-event", readyCb);
  chartWidget.kulSizeX = "100%";
  chartWidget.kulSizeY = "100%";
  chartWidget.kulTypes = ["area"];
  content.appendChild(chartWidget);

  return content;
}
*/
