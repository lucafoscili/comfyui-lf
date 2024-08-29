var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_CSS_EMBEDS;
import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { chartFactory } from '../widgets/chart.js';
import { CustomWidgetName } from '../types/widgets.js';
/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        _LFWidgets_CSS_EMBEDS.set(this, [...Object.keys(CustomWidgetName)]);
        this.add = {
            [CustomWidgetName.chart]: (nodeType) => {
                const widget = app.widgets[CustomWidgetName.chart](nodeType, CustomWidgetName.chart).widget;
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
        };
        this.option = {
            [CustomWidgetName.chart]: (chart) => chartFactory.options(chart),
            [CustomWidgetName.code]: (code) => codeFactory.options(code),
            [CustomWidgetName.controlPanel]: () => controlPanelFactory.options(),
        };
        this.resizerHandler = {
            [CustomWidgetName.chart]: (nodeType) => chartFactory.resize(nodeType),
        };
        this.set = {
            [CustomWidgetName.chart]: () => {
                return {
                    [CustomWidgetName.chart]: (nodeType, name) => {
                        return chartFactory.render(nodeType, name);
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
        };
        this.get = {
            adders: this.add,
            options: this.option,
            resizerHandlers: this.resizerHandler,
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
