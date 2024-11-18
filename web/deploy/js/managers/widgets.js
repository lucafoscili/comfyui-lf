import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { CustomWidgetName } from '../types/widgets.js';
import { masonryFactory } from '../widgets/masonry.js';
import { textareaFactory } from '../widgets/textarea.js';
import { treeFactory } from '../widgets/tree.js';
import { chatFactory } from '../widgets/chat.js';
import { historyFactory } from '../widgets/history.js';
import { countBarChartFactory } from '../widgets/countBarChart.js';
import { uploadFactory } from '../widgets/upload.js';
import { chipFactory } from '../widgets/chip.js';
import { messengerFactory } from '../widgets/messenger.js';
import { cardFactory } from '../widgets/card.js';
import { cardsWithChipFactory } from '../widgets/cardsWithChip.js';
import { tabBarChartFactory } from '../widgets/tabBarChart.js';
import { compareFactory } from '../widgets/compare.js';
import { NodeName } from '../types/nodes.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
import { cardPlaceholders, fetchModelMetadata } from '../utils/api.js';
import { showNotification } from '../helpers/notify.js';
import { progressbarFactory } from '../widgets/progressbar.js';
import { carouselFactory } from '../widgets/carousel.js';
import { imageEditorFactory } from '../widgets/imageEditor.js';
import { LogSeverity } from '../types/manager/manager.js';
/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        this.decorators = {
            card: (payload, widget) => {
                const { apiFlags, datasets, hashes, paths, chip } = payload;
                cardPlaceholders(widget, 1);
                const value = {
                    props: [],
                    chip,
                };
                const models = [];
                for (let index = 0; index < datasets?.length; index++) {
                    const apiFlag = apiFlags[index];
                    const dataset = datasets[index];
                    const hash = hashes[index];
                    const path = paths[index];
                    models.push({ dataset, hash, path, apiFlag });
                }
                fetchModelMetadata(models).then((r) => {
                    for (let index = 0; index < r.length; index++) {
                        const cardProps = r[index];
                        if (cardProps.kulData) {
                            value.props.push(cardProps);
                        }
                        else {
                            value.props.push({
                                ...cardProps,
                                kulData: models[index].dataset,
                            });
                        }
                    }
                    widget.options.setValue(JSON.stringify(value));
                    getApiRoutes().redraw();
                });
            },
        };
        this.option = {
            [CustomWidgetName.card]: (grid) => cardFactory.options(grid),
            [CustomWidgetName.cardsWithChip]: (grid) => cardsWithChipFactory.options(grid),
            [CustomWidgetName.carousel]: (carousel) => carouselFactory.options(carousel),
            [CustomWidgetName.chat]: (chat) => chatFactory.options(chat),
            [CustomWidgetName.chip]: (chip) => chipFactory.options(chip),
            [CustomWidgetName.code]: (code) => codeFactory.options(code),
            [CustomWidgetName.compare]: (compare) => compareFactory.options(compare),
            [CustomWidgetName.controlPanel]: () => controlPanelFactory.options(),
            [CustomWidgetName.countBarChart]: (chart, chip, button) => countBarChartFactory.options(chart, chip, button),
            [CustomWidgetName.history]: (history) => historyFactory.options(history),
            [CustomWidgetName.imageEditor]: (imageviewer, actionButtons, grid) => imageEditorFactory.options(imageviewer, actionButtons, grid),
            [CustomWidgetName.masonry]: (masonry) => masonryFactory.options(masonry),
            [CustomWidgetName.messenger]: (messenger, placeholder) => messengerFactory.options(messenger, placeholder),
            [CustomWidgetName.progressbar]: (progressbar, nodeType) => progressbarFactory.options(progressbar, nodeType),
            [CustomWidgetName.tabBarChart]: (chart, tabbar, textfield, node) => tabBarChartFactory.options(chart, tabbar, textfield, node),
            [CustomWidgetName.textarea]: (content) => textareaFactory.options(content),
            [CustomWidgetName.tree]: (tree) => treeFactory.options(tree),
            [CustomWidgetName.upload]: (upload) => uploadFactory.options(upload),
        };
        this.set = {
            [CustomWidgetName.card]: (nodeType) => {
                return cardFactory.render(nodeType, CustomWidgetName.card);
            },
            [CustomWidgetName.carousel]: (nodeType) => {
                return carouselFactory.render(nodeType, CustomWidgetName.carousel);
            },
            [CustomWidgetName.cardsWithChip]: (nodeType) => {
                return cardsWithChipFactory.render(nodeType, CustomWidgetName.cardsWithChip);
            },
            [CustomWidgetName.chat]: (nodeType) => {
                return chatFactory.render(nodeType, CustomWidgetName.chat);
            },
            [CustomWidgetName.chip]: (nodeType) => {
                return chipFactory.render(nodeType, CustomWidgetName.chip);
            },
            [CustomWidgetName.code]: (nodeType) => {
                return codeFactory.render(nodeType, CustomWidgetName.code);
            },
            [CustomWidgetName.compare]: (nodeType) => {
                return compareFactory.render(nodeType, CustomWidgetName.compare);
            },
            [CustomWidgetName.controlPanel]: (nodeType) => {
                return controlPanelFactory.render(nodeType, CustomWidgetName.controlPanel);
            },
            [CustomWidgetName.countBarChart]: (nodeType) => {
                return countBarChartFactory.render(nodeType, CustomWidgetName.countBarChart);
            },
            [CustomWidgetName.history]: (nodeType) => {
                return historyFactory.render(nodeType, CustomWidgetName.history);
            },
            [CustomWidgetName.imageEditor]: (nodeType) => {
                return imageEditorFactory.render(nodeType, CustomWidgetName.imageEditor);
            },
            [CustomWidgetName.masonry]: (nodeType) => {
                return masonryFactory.render(nodeType, CustomWidgetName.masonry);
            },
            [CustomWidgetName.messenger]: (nodeType) => {
                return messengerFactory.render(nodeType, CustomWidgetName.messenger);
            },
            [CustomWidgetName.progressbar]: (nodeType) => {
                return progressbarFactory.render(nodeType, CustomWidgetName.progressbar);
            },
            [CustomWidgetName.tabBarChart]: (nodeType) => {
                return tabBarChartFactory.render(nodeType, CustomWidgetName.tabBarChart);
            },
            [CustomWidgetName.textarea]: (nodeType) => {
                return textareaFactory.render(nodeType, CustomWidgetName.textarea);
            },
            [CustomWidgetName.tree]: (nodeType) => {
                return treeFactory.render(nodeType, CustomWidgetName.tree);
            },
            [CustomWidgetName.upload]: (nodeType) => {
                return uploadFactory.render(nodeType, CustomWidgetName.upload);
            },
        };
        this.onEvent = (name, event, widgets) => {
            const lfManager = getLFManager();
            const payload = event.detail;
            const node = lfManager.getApiRoutes().getNodeById(payload.id);
            if (node) {
                lfManager.log(`${node.comfyClass} (#${node.id}): event '${name}' fired`, { payload, node }, LogSeverity.Info);
                switch (name) {
                    case NodeName.notify:
                        if ('action' in payload) {
                            showNotification(payload);
                        }
                        break;
                }
                for (let index = 0; index < widgets.length; index++) {
                    const widgetName = widgets[index];
                    const widget = getCustomWidget(node, widgetName);
                    switch (widgetName) {
                        case CustomWidgetName.imageEditor:
                            switch (name) {
                                case NodeName.imagesEditingBreakpoint:
                                    if (widget && 'value' in payload) {
                                        const { value } = payload;
                                        lfManager.log(`Initiating JSON data fetch for editing breakpoint from path: ${value}`, { widget, value });
                                        getApiRoutes()
                                            .json.get(value)
                                            .then((r) => {
                                            if (r.status === LogSeverity.Success) {
                                                lfManager.log('JSON data fetched successfully for image editing breakpoint.', { data: r.data }, LogSeverity.Success);
                                                widget.options.setValue(JSON.stringify(r.data));
                                            }
                                            else {
                                                lfManager.log(`Failed to fetch JSON data: ${r.message}`, { response: r }, LogSeverity.Error);
                                            }
                                        })
                                            .catch((error) => {
                                            lfManager.log(`Error during JSON fetch for editing breakpoint: ${error.toString()}`, { error }, LogSeverity.Error);
                                        });
                                    }
                                    else {
                                        lfManager.log(`Image editor widget handling failed: missing 'widget' or 'value' in payload.`, { widget, payload }, LogSeverity.Warning);
                                    }
                                    break;
                                default:
                                    if (widget && 'dataset' in payload) {
                                        const { dataset } = payload;
                                        widget.options.setValue(JSON.stringify(dataset));
                                    }
                                    break;
                            }
                            break;
                        case CustomWidgetName.card:
                        case CustomWidgetName.cardsWithChip:
                            if (widget && 'apiFlags' in payload) {
                                this.decorators.card(payload, widget);
                            }
                            break;
                        case CustomWidgetName.code:
                        case CustomWidgetName.upload:
                            if (widget && 'value' in payload) {
                                const { value } = payload;
                                widget.options.setValue(value);
                            }
                            break;
                        case CustomWidgetName.masonry:
                        case CustomWidgetName.progressbar:
                            if (widget) {
                                widget.options.setValue(JSON.stringify(payload));
                            }
                            break;
                        case CustomWidgetName.countBarChart:
                        case CustomWidgetName.tabBarChart:
                            if (widget && 'datasets' in payload) {
                                const { datasets } = payload;
                                widget.options.setValue(JSON.stringify(datasets));
                            }
                            break;
                        default:
                            if (widget && 'dataset' in payload) {
                                const { dataset } = payload;
                                widget.options.setValue(JSON.stringify(dataset));
                            }
                            break;
                    }
                }
                lfManager.getApiRoutes().redraw();
            }
            else {
                lfManager.log(`Event '${name}' was fired but its related node (#${payload.id}) wasn't found in the graph! Skipping handling the event.`, { payload, name }, LogSeverity.Warning);
            }
        };
        const link = document.createElement('link');
        link.dataset.filename = 'tooltip';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `extensions/comfyui-lf/css/widgets.css`;
        document.head.appendChild(link);
    }
}
