import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { chartFactory } from '../widgets/chart.js';
import { CustomWidgetName } from '../types/widgets.js';
import { imagePreviewFactory } from '../widgets/imagePreview.js';
import { booleanViewerFactory } from '../widgets/booleanViewer.js';
import { jsonInputFactory } from '../widgets/jsonInput.js';

/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/

export class LFWidgets {
  #CSS_EMBEDS = [...Object.keys(CustomWidgetName)];

  constructor() {
    for (let index = 0; index < this.#CSS_EMBEDS.length; index++) {
      const cssFileName = this.#CSS_EMBEDS[index];
      const link = document.createElement('link');
      link.dataset.filename = cssFileName.toString();
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `extensions/comfyui-lf/css/${cssFileName}.css`;
      document.head.appendChild(link);
    }
  }

  add = {
    [CustomWidgetName.booleanViewer]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.booleanViewer](
        nodeType,
        CustomWidgetName.booleanViewer,
      ).widget;
      return widget;
    },
    [CustomWidgetName.chart]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.chart](nodeType, CustomWidgetName.chart).widget;
      return widget;
    },
    [CustomWidgetName.code]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.code](nodeType, CustomWidgetName.code).widget;
      return widget;
    },
    [CustomWidgetName.controlPanel]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.controlPanel](
        nodeType,
        CustomWidgetName.controlPanel,
      ).widget;
      return widget;
    },
    [CustomWidgetName.jsonInput]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.jsonInput](
        nodeType,
        CustomWidgetName.jsonInput,
      ).widget;
      return widget;
    },
    [CustomWidgetName.imagePreview]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.imagePreview](
        nodeType,
        CustomWidgetName.imagePreview,
      ).widget;
      return widget;
    },
  };

  option = {
    [CustomWidgetName.booleanViewer]: (booleanViewer: HTMLKulTextfieldElement) =>
      booleanViewerFactory.options(booleanViewer),
    [CustomWidgetName.chart]: (chart: HTMLKulChartElement) => chartFactory.options(chart),
    [CustomWidgetName.code]: (code: HTMLKulCodeElement) => codeFactory.options(code),
    [CustomWidgetName.controlPanel]: () => controlPanelFactory.options(),
    [CustomWidgetName.jsonInput]: (content: HTMLTextAreaElement) =>
      jsonInputFactory.options(content),
    [CustomWidgetName.imagePreview]: (content: HTMLDivElement) =>
      imagePreviewFactory.options(content),
  };

  resizerHandler = {
    [CustomWidgetName.chart]: (nodeType: NodeType) => chartFactory.resize(nodeType),
  };

  set = {
    [CustomWidgetName.booleanViewer]: () => {
      return {
        [CustomWidgetName.booleanViewer]: (nodeType: NodeType, name: CustomWidgetName) => {
          return booleanViewerFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.chart]: () => {
      return {
        [CustomWidgetName.chart]: (nodeType: NodeType, name: CustomWidgetName) => {
          return chartFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.code]: () => {
      return {
        [CustomWidgetName.code]: (nodeType: NodeType, name: CustomWidgetName) => {
          return codeFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.controlPanel]: () => {
      return {
        [CustomWidgetName.controlPanel]: (nodeType: NodeType, name: CustomWidgetName) => {
          return controlPanelFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.jsonInput]: () => {
      return {
        [CustomWidgetName.jsonInput]: (nodeType: NodeType, name: CustomWidgetName) => {
          return jsonInputFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.imagePreview]: () => {
      return {
        [CustomWidgetName.imagePreview]: (nodeType: NodeType, name: CustomWidgetName) => {
          return imagePreviewFactory.render(nodeType, name);
        },
      };
    },
  };

  get = {
    adders: this.add,
    options: this.option,
    resizerHandlers: this.resizerHandler,
    setters: this.set,
  };
}
