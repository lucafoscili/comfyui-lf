var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_NAMES;
import { app } from '/scripts/app.js';
import { KUL_CONTROL_PANEL } from '../widgets/controlPanel.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        _LFWidgets_NAMES.set(this, {
            controlPanel: 'KUL_CONTROL_PANEL',
        });
        this.create = {
            controlPanel: (nodeType) => {
                const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel, {
                    isReady: false,
                }).widget;
                widget.serializeValue = false;
            },
        };
        this.get = {
            controlPanel: () => {
                return {
                    KUL_CONTROL_PANEL: (nodeType, name) => {
                        return KUL_CONTROL_PANEL(nodeType, name, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel);
                    },
                };
            },
        };
    }
}
_LFWidgets_NAMES = new WeakMap();
