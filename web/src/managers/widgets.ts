import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { chartFactory } from '../widgets/chart.js';
import { CustomWidgetName } from '../types/widgets.js';
import { imagePreviewFactory } from '../widgets/imagePreview.js';

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
    [CustomWidgetName.imagePreview]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.imagePreview](
        nodeType,
        CustomWidgetName.imagePreview,
      ).widget;
      return widget;
    },
  };

  option = {
    [CustomWidgetName.chart]: (chart: HTMLKulChartElement) => chartFactory.options(chart),
    [CustomWidgetName.code]: (code: HTMLKulCodeElement) => codeFactory.options(code),
    [CustomWidgetName.controlPanel]: () => controlPanelFactory.options(),
    [CustomWidgetName.imagePreview]: (content: HTMLDivElement) =>
      imagePreviewFactory.options(content),
  };

  resizerHandler = {
    [CustomWidgetName.chart]: (nodeType: NodeType) => chartFactory.resize(nodeType),
  };

  set = {
    [CustomWidgetName.chart]: () => {
      return {
        [CustomWidgetName.chart]: (nodeType: NodeType, name: string) => {
          return chartFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.code]: () => {
      return {
        [CustomWidgetName.code]: (nodeType: NodeType, name: string) => {
          return codeFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.controlPanel]: () => {
      return {
        [CustomWidgetName.controlPanel]: (nodeType: NodeType, name: string) => {
          return controlPanelFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.imagePreview]: () => {
      return {
        [CustomWidgetName.imagePreview]: (nodeType: NodeType, name: string) => {
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
