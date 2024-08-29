var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_CSS_EMBEDS, _LFWidgets_NAMES;
import { app } from '/scripts/app.js';
import { controlPanelFactory } from '../widgets/controlPanel.js';
import { codeFactory } from '../widgets/code.js';
import { chartFactory } from '../widgets/chart.js';
/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        _LFWidgets_CSS_EMBEDS.set(this, ['chart', 'code', 'controlPanel']);
        _LFWidgets_NAMES.set(this, {
            chart: 'KUL_CHART',
            code: 'KUL_CODE',
            controlPanel: 'KUL_CONTROL_PANEL',
        });
        this.add = {
            chart: (nodeType) => {
                const widget = app.widgets.KUL_CHART(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").chart).widget;
                return widget;
            },
            code: (nodeType) => {
                const widget = app.widgets.KUL_CODE(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").code).widget;
                return widget;
            },
            controlPanel: (nodeType) => {
                const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel).widget;
                return widget;
            },
        };
        this.option = {
            chart: (chart) => chartFactory.options(chart),
            code: (code) => codeFactory.options(code),
            controlPanel: () => controlPanelFactory.options(),
        };
        this.resizerHandler = {
            chart: (nodeType) => chartFactory.resize(nodeType),
        };
        this.set = {
            chart: () => {
                return {
                    KUL_CHART: (nodeType, name) => {
                        return chartFactory.render(nodeType, name);
                    },
                };
            },
            code: () => {
                return {
                    KUL_CODE: (nodeType, name) => {
                        return codeFactory.render(nodeType, name);
                    },
                };
            },
            controlPanel: () => {
                return {
                    KUL_CONTROL_PANEL: (nodeType, name) => {
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
_LFWidgets_CSS_EMBEDS = new WeakMap(), _LFWidgets_NAMES = new WeakMap();
