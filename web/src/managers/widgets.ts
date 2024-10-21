import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { CustomWidgetName } from '../types/widgets.js';
import { imagePreviewFactory } from '../widgets/imagePreview.js';
import { booleanViewerFactory } from '../widgets/booleanViewer.js';
import { jsonInputFactory } from '../widgets/jsonInput.js';
import { treeFactory } from '../widgets/tree.js';
import { chatFactory } from '../widgets/chat.js';
import { historyFactory } from '../widgets/history.js';
import { rollViewerFactory } from '../widgets/rollViewer.js';
import { countBarChartFactory } from '../widgets/countBarChart.js';
import { uploadFactory } from '../widgets/upload.js';
import { chipFactory } from '../widgets/chip.js';
import { messengerFactory } from '../widgets/messenger.js';
import { cardFactory } from '../widgets/card.js';
import { cardsWithChipFactory } from '../widgets/cardsWithChip.js';
import { tabBarChartFactory } from '../widgets/tabBarChart.js';
import { compareFactory } from '../widgets/compare.js';
import { NodeName } from '../types/nodes.js';

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
    [CustomWidgetName.card]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.card](nodeType, CustomWidgetName.card).widget;
      return widget;
    },
    [CustomWidgetName.cardsWithChip]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.cardsWithChip](
        nodeType,
        CustomWidgetName.cardsWithChip,
      ).widget;
      return widget;
    },
    [CustomWidgetName.chat]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.chat](nodeType, CustomWidgetName.chat).widget;
      return widget;
    },
    [CustomWidgetName.chip]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.chip](nodeType, CustomWidgetName.chip).widget;
      return widget;
    },
    [CustomWidgetName.code]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.code](nodeType, CustomWidgetName.code).widget;
      return widget;
    },
    [CustomWidgetName.compare]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.compare](
        nodeType,
        CustomWidgetName.compare,
      ).widget;
      return widget;
    },
    [CustomWidgetName.controlPanel]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.controlPanel](
        nodeType,
        CustomWidgetName.controlPanel,
      ).widget;
      return widget;
    },
    [CustomWidgetName.countBarChart]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.countBarChart](
        nodeType,
        CustomWidgetName.countBarChart,
      ).widget;
      return widget;
    },
    [CustomWidgetName.history]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.history](
        nodeType,
        CustomWidgetName.history,
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
    [CustomWidgetName.jsonInput]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.jsonInput](
        nodeType,
        CustomWidgetName.jsonInput,
      ).widget;
      return widget;
    },
    [CustomWidgetName.messenger]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.messenger](
        nodeType,
        CustomWidgetName.messenger,
      ).widget;
      return widget;
    },
    [CustomWidgetName.rollViewer]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.rollViewer](
        nodeType,
        CustomWidgetName.rollViewer,
      ).widget;
      return widget;
    },
    [CustomWidgetName.tabBarChart]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.tabBarChart](
        nodeType,
        CustomWidgetName.tabBarChart,
      ).widget;
      return widget;
    },
    [CustomWidgetName.tree]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.tree](nodeType, CustomWidgetName.tree).widget;
      return widget;
    },
    [CustomWidgetName.upload]: (nodeType: NodeType) => {
      const widget = app.widgets[CustomWidgetName.upload](nodeType, CustomWidgetName.upload).widget;
      return widget;
    },
  };

  option = {
    [CustomWidgetName.booleanViewer]: (booleanViewer: HTMLKulTextfieldElement) =>
      booleanViewerFactory.options(booleanViewer),
    [CustomWidgetName.card]: (grid: HTMLDivElement) => cardFactory.options(grid),
    [CustomWidgetName.cardsWithChip]: (grid: HTMLDivElement) => cardsWithChipFactory.options(grid),
    [CustomWidgetName.chat]: (chat: HTMLKulChatElement) => chatFactory.options(chat),
    [CustomWidgetName.chip]: (chip: HTMLKulChipElement) => chipFactory.options(chip),
    [CustomWidgetName.code]: (code: HTMLKulCodeElement) => codeFactory.options(code),
    [CustomWidgetName.compare]: (compare: HTMLKulCompareElement) => compareFactory.options(compare),
    [CustomWidgetName.controlPanel]: () => controlPanelFactory.options(),
    [CustomWidgetName.countBarChart]: (
      chart: HTMLKulChartElement,
      chip: HTMLKulChipElement,
      button: HTMLKulButtonElement,
    ) => countBarChartFactory.options(chart, chip, button),
    [CustomWidgetName.history]: (history: HTMLKulListElement) => historyFactory.options(history),
    [CustomWidgetName.jsonInput]: (content: HTMLTextAreaElement) =>
      jsonInputFactory.options(content),
    [CustomWidgetName.imagePreview]: (content: HTMLDivElement, isSelectable: boolean) =>
      imagePreviewFactory.options(content, isSelectable),
    [CustomWidgetName.messenger]: (
      messenger: HTMLKulMessengerElement,
      placeholder: HTMLDivElement,
    ) => messengerFactory.options(messenger, placeholder),
    [CustomWidgetName.rollViewer]: (rollViewer: HTMLKulProgressbarElement, nodeType: NodeType) =>
      rollViewerFactory.options(rollViewer, nodeType),
    [CustomWidgetName.tabBarChart]: (
      chart: HTMLKulChartElement,
      tabbar: HTMLKulTabbarElement,
      textfield: HTMLKulTextfieldElement,
      node: NodeName,
    ) => tabBarChartFactory.options(chart, tabbar, textfield, node),
    [CustomWidgetName.tree]: (tree: HTMLKulTreeElement) => treeFactory.options(tree),
    [CustomWidgetName.upload]: (upload: HTMLKulUploadElement) => uploadFactory.options(upload),
  };

  set = {
    [CustomWidgetName.booleanViewer]: () => {
      return {
        [CustomWidgetName.booleanViewer]: (nodeType: NodeType, name: CustomWidgetName) => {
          return booleanViewerFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.card]: () => {
      return {
        [CustomWidgetName.card]: (nodeType: NodeType, name: CustomWidgetName) => {
          return cardFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.cardsWithChip]: () => {
      return {
        [CustomWidgetName.cardsWithChip]: (nodeType: NodeType, name: CustomWidgetName) => {
          return cardsWithChipFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.chat]: () => {
      return {
        [CustomWidgetName.chat]: (nodeType: NodeType, name: CustomWidgetName) => {
          return chatFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.chip]: () => {
      return {
        [CustomWidgetName.chip]: (nodeType: NodeType, name: CustomWidgetName) => {
          return chipFactory.render(nodeType, name);
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
    [CustomWidgetName.compare]: () => {
      return {
        [CustomWidgetName.compare]: (nodeType: NodeType, name: CustomWidgetName) => {
          return compareFactory.render(nodeType, name);
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
    [CustomWidgetName.countBarChart]: () => {
      return {
        [CustomWidgetName.countBarChart]: (nodeType: NodeType, name: CustomWidgetName) => {
          return countBarChartFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.history]: () => {
      return {
        [CustomWidgetName.history]: (nodeType: NodeType, name: CustomWidgetName) => {
          return historyFactory.render(nodeType, name);
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
    [CustomWidgetName.messenger]: () => {
      return {
        [CustomWidgetName.messenger]: (nodeType: NodeType, name: CustomWidgetName) => {
          return messengerFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.rollViewer]: () => {
      return {
        [CustomWidgetName.rollViewer]: (nodeType: NodeType, name: CustomWidgetName) => {
          return rollViewerFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.tabBarChart]: () => {
      return {
        [CustomWidgetName.tabBarChart]: (nodeType: NodeType, name: CustomWidgetName) => {
          return tabBarChartFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.tree]: () => {
      return {
        [CustomWidgetName.tree]: (nodeType: NodeType, name: CustomWidgetName) => {
          return treeFactory.render(nodeType, name);
        },
      };
    },
    [CustomWidgetName.upload]: () => {
      return {
        [CustomWidgetName.upload]: (nodeType: NodeType, name: CustomWidgetName) => {
          return uploadFactory.render(nodeType, name);
        },
      };
    },
  };

  get = {
    adders: this.add,
    options: this.option,
    setters: this.set,
  };
}
