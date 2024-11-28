var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_FACTORIES, _LFWidgets_notifications;
import { apiCall, cardPlaceholders } from '../helpers/card.js';
import { LogSeverity } from '../types/manager/manager.js';
import { CustomWidgetName, NodeName } from '../types/widgets/widgets.js';
import { getApiRoutes, getCustomWidget, getLFManager } from '../utils/common.js';
import { cardFactory } from '../widgets/card.js';
import { cardsWithChipFactory } from '../widgets/cardsWithChip.js';
import { carouselFactory } from '../widgets/carousel.js';
import { chatFactory } from '../widgets/chat.js';
import { chipFactory } from '../widgets/chip.js';
import { codeFactory } from '../widgets/code.js';
import { compareFactory } from '../widgets/compare.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { countBarChartFactory } from '../widgets/countBarChart.js';
import { historyFactory } from '../widgets/history.js';
import { imageEditorFactory } from '../widgets/imageEditor.js';
import { masonryFactory } from '../widgets/masonry.js';
import { messengerFactory } from '../widgets/messenger.js';
import { progressbarFactory } from '../widgets/progressbar.js';
import { tabBarChartFactory } from '../widgets/tabBarChart.js';
import { textareaFactory } from '../widgets/textarea.js';
import { treeFactory } from '../widgets/tree.js';
import { uploadFactory } from '../widgets/upload.js';
export class LFWidgets {
    constructor() {
        _LFWidgets_FACTORIES.set(this, {
            [CustomWidgetName.card]: cardFactory,
            [CustomWidgetName.carousel]: carouselFactory,
            [CustomWidgetName.cardsWithChip]: cardsWithChipFactory,
            [CustomWidgetName.chat]: chatFactory,
            [CustomWidgetName.chip]: chipFactory,
            [CustomWidgetName.code]: codeFactory,
            [CustomWidgetName.compare]: compareFactory,
            [CustomWidgetName.controlPanel]: controlPanelFactory,
            [CustomWidgetName.countBarChart]: countBarChartFactory,
            [CustomWidgetName.history]: historyFactory,
            [CustomWidgetName.imageEditor]: imageEditorFactory,
            [CustomWidgetName.masonry]: masonryFactory,
            [CustomWidgetName.messenger]: messengerFactory,
            [CustomWidgetName.progressbar]: progressbarFactory,
            [CustomWidgetName.tabBarChart]: tabBarChartFactory,
            [CustomWidgetName.textarea]: textareaFactory,
            [CustomWidgetName.tree]: treeFactory,
            [CustomWidgetName.upload]: uploadFactory,
        });
        //#region render
        this.render = (name) => __classPrivateFieldGet(this, _LFWidgets_FACTORIES, "f")[name].render;
        //#endregion
        //#region Decorators
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
                apiCall(models).then((r) => {
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
                    getApiRoutes().comfy.redraw();
                });
            },
        };
        //#endregion
        //#region onEvent
        this.onEvent = (name, event, widgets) => {
            const lfManager = getLFManager();
            const payload = event.detail;
            const node = lfManager.getApiRoutes().comfy.getNodeById(payload.id);
            if (node) {
                lfManager.log(`${node.comfyClass} (#${node.id}): event '${name}' fired`, { payload, node }, LogSeverity.Info);
                switch (name) {
                    case NodeName.notify:
                        if ('action' in payload) {
                            __classPrivateFieldGet(this, _LFWidgets_notifications, "f").show(payload);
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
                lfManager.getApiRoutes().comfy.redraw();
            }
            else {
                lfManager.log(`Event '${name}' was fired but its related node (#${payload.id}) wasn't found in the graph! Skipping handling the event.`, { payload, name }, LogSeverity.Warning);
            }
        };
        //#endregion
        //#region Notifications
        _LFWidgets_notifications.set(this, {
            decorate: (payload) => {
                const { action, image, message, silent, tag, title } = payload;
                const icon = action === 'focus tab'
                    ? 'visibility'
                    : action === 'interrupt'
                        ? 'not_interested'
                        : action === 'interrupt and queue'
                            ? 'refresh'
                            : action === 'queue prompt'
                                ? 'queue'
                                : '';
                const options = {
                    body: message,
                    icon: icon
                        ? window.location.href + `extensions/comfyui-lf/assets/svg/${icon}.svg`
                        : undefined,
                    requireInteraction: action === 'none' ? false : true,
                    silent,
                    tag,
                };
                if ('image' in Notification.prototype && image) {
                    options.image = image;
                }
                if (Notification.permission === 'granted') {
                    const notification = new Notification(title, options);
                    notification.addEventListener('click', () => {
                        const lfManager = getLFManager();
                        const routes = getApiRoutes().comfy;
                        switch (action) {
                            case 'focus tab':
                                window.focus();
                                break;
                            case 'interrupt':
                                routes.interrupt();
                                break;
                            case 'interrupt and queue':
                                routes.interrupt();
                                routes.queuePrompt();
                                lfManager.log('New prompt queued from notification after interrupting.', {}, LogSeverity.Success);
                                break;
                            case 'queue prompt':
                                routes.queuePrompt();
                                lfManager.log('New prompt queued from notification.', {}, LogSeverity.Success);
                                break;
                        }
                    });
                }
            },
            show: (payload) => {
                const lfManager = getLFManager();
                if (Notification.permission !== 'granted') {
                    Notification.requestPermission().then((permission) => {
                        if (permission === 'granted') {
                            __classPrivateFieldGet(this, _LFWidgets_notifications, "f").decorate(payload);
                        }
                        else {
                            lfManager.log('Notification permission denied.', {}, LogSeverity.Warning);
                        }
                    });
                }
                else {
                    __classPrivateFieldGet(this, _LFWidgets_notifications, "f").decorate(payload);
                }
            },
        });
        //#endregion
    }
}
_LFWidgets_FACTORIES = new WeakMap(), _LFWidgets_notifications = new WeakMap();
