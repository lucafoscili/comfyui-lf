var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_CSS_EMBEDS;
import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { histogramFactory } from '../widgets/histogram.js';
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
/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        _LFWidgets_CSS_EMBEDS.set(this, [...Object.keys(CustomWidgetName)]);
        this.add = {
            [CustomWidgetName.booleanViewer]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.booleanViewer](nodeType, CustomWidgetName.booleanViewer).widget;
                return widget;
            },
            [CustomWidgetName.card]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.card](nodeType, CustomWidgetName.card).widget;
                return widget;
            },
            [CustomWidgetName.chat]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.chat](nodeType, CustomWidgetName.chat).widget;
                return widget;
            },
            [CustomWidgetName.chip]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.chip](nodeType, CustomWidgetName.chip).widget;
                return widget;
            },
            [CustomWidgetName.code]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.code](nodeType, CustomWidgetName.code).widget;
                return widget;
            },
            [CustomWidgetName.controlPanel]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.controlPanel](nodeType, CustomWidgetName.controlPanel).widget;
                return widget;
            },
            [CustomWidgetName.countBarChart]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.countBarChart](nodeType, CustomWidgetName.countBarChart).widget;
                return widget;
            },
            [CustomWidgetName.histogram]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.histogram](nodeType, CustomWidgetName.histogram).widget;
                return widget;
            },
            [CustomWidgetName.history]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.history](nodeType, CustomWidgetName.history).widget;
                return widget;
            },
            [CustomWidgetName.imagePreview]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.imagePreview](nodeType, CustomWidgetName.imagePreview).widget;
                return widget;
            },
            [CustomWidgetName.jsonInput]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.jsonInput](nodeType, CustomWidgetName.jsonInput).widget;
                return widget;
            },
            [CustomWidgetName.messenger]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.messenger](nodeType, CustomWidgetName.messenger).widget;
                return widget;
            },
            [CustomWidgetName.rollViewer]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.rollViewer](nodeType, CustomWidgetName.rollViewer).widget;
                return widget;
            },
            [CustomWidgetName.tree]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.tree](nodeType, CustomWidgetName.tree).widget;
                return widget;
            },
            [CustomWidgetName.upload]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.upload](nodeType, CustomWidgetName.upload).widget;
                return widget;
            },
        };
        this.option = {
            [CustomWidgetName.booleanViewer]: (booleanViewer) => booleanViewerFactory.options(booleanViewer),
            [CustomWidgetName.card]: (card) => cardFactory.options(card),
            [CustomWidgetName.chat]: (chat) => chatFactory.options(chat),
            [CustomWidgetName.chip]: (chip) => chipFactory.options(chip),
            [CustomWidgetName.code]: (code) => codeFactory.options(code),
            [CustomWidgetName.controlPanel]: () => controlPanelFactory.options(),
            [CustomWidgetName.countBarChart]: (chart, chip, button) => countBarChartFactory.options(chart, chip, button),
            [CustomWidgetName.histogram]: (histogram) => histogramFactory.options(histogram),
            [CustomWidgetName.history]: (history) => historyFactory.options(history),
            [CustomWidgetName.jsonInput]: (content) => jsonInputFactory.options(content),
            [CustomWidgetName.imagePreview]: (content, isSelectable) => imagePreviewFactory.options(content, isSelectable),
            [CustomWidgetName.messenger]: (messenger, placeholder) => messengerFactory.options(messenger, placeholder),
            [CustomWidgetName.rollViewer]: (rollViewer, nodeType) => rollViewerFactory.options(rollViewer, nodeType),
            [CustomWidgetName.tree]: (tree) => treeFactory.options(tree),
            [CustomWidgetName.upload]: (upload) => uploadFactory.options(upload),
        };
        this.set = {
            [CustomWidgetName.booleanViewer]: () => {
                return {
                    [CustomWidgetName.booleanViewer]: (nodeType, name) => {
                        return booleanViewerFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.card]: () => {
                return {
                    [CustomWidgetName.card]: (nodeType, name) => {
                        return cardFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.chat]: () => {
                return {
                    [CustomWidgetName.chat]: (nodeType, name) => {
                        return chatFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.chip]: () => {
                return {
                    [CustomWidgetName.chip]: (nodeType, name) => {
                        return chipFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.code]: () => {
                return {
                    [CustomWidgetName.code]: (nodeType, name) => {
                        return codeFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.controlPanel]: () => {
                return {
                    [CustomWidgetName.controlPanel]: (nodeType, name) => {
                        return controlPanelFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.countBarChart]: () => {
                return {
                    [CustomWidgetName.countBarChart]: (nodeType, name) => {
                        return countBarChartFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.histogram]: () => {
                return {
                    [CustomWidgetName.histogram]: (nodeType, name) => {
                        return histogramFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.history]: () => {
                return {
                    [CustomWidgetName.history]: (nodeType, name) => {
                        return historyFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.jsonInput]: () => {
                return {
                    [CustomWidgetName.jsonInput]: (nodeType, name) => {
                        return jsonInputFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.imagePreview]: () => {
                return {
                    [CustomWidgetName.imagePreview]: (nodeType, name) => {
                        return imagePreviewFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.messenger]: () => {
                return {
                    [CustomWidgetName.messenger]: (nodeType, name) => {
                        return messengerFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.rollViewer]: () => {
                return {
                    [CustomWidgetName.rollViewer]: (nodeType, name) => {
                        return rollViewerFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.tree]: () => {
                return {
                    [CustomWidgetName.tree]: (nodeType, name) => {
                        return treeFactory.render(nodeType, name);
                    },
                };
            },
            [CustomWidgetName.upload]: () => {
                return {
                    [CustomWidgetName.upload]: (nodeType, name) => {
                        return uploadFactory.render(nodeType, name);
                    },
                };
            },
        };
        this.get = {
            adders: this.add,
            options: this.option,
            setters: this.set,
        };
        for (let index = 0; index < __classPrivateFieldGet(this, _LFWidgets_CSS_EMBEDS, "f").length; index++) {
            const cssFileName = __classPrivateFieldGet(this, _LFWidgets_CSS_EMBEDS, "f")[index];
            const link = document.createElement('link');
            link.dataset.filename = cssFileName.toString();
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = `extensions/comfyui-lf/css/${cssFileName}.css`;
            document.head.appendChild(link);
        }
    }
}
_LFWidgets_CSS_EMBEDS = new WeakMap();
