var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_NAMES;
import { app } from '/scripts/app.js';
import { getControlPanel } from '../widgets/controlPanel.js';
import { getCode } from '../widgets/code.js';
import { CUSTOM_WIDGET_NAMES_MAP } from '../utils/constants.js';
/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        _LFWidgets_NAMES.set(this, void 0);
        this.add = {
            controlPanel: (nodeType) => {
                const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel).widget;
                widget.serializeValue = false;
                return widget;
            },
            code: (nodeType) => {
                const widget = app.widgets.KUL_CODE(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").displayJson).widget;
                widget.serializeValue = false;
                return widget;
            },
        };
        this.set = {
            controlPanel: () => {
                return {
                    KUL_CONTROL_PANEL: (nodeType, name) => {
                        return getControlPanel(nodeType, name, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel);
                    },
                };
            },
            code: () => {
                return {
                    KUL_CODE: (nodeType, name) => {
                        return getCode(nodeType, name, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").displayJson);
                    },
                };
            },
        };
        this.get = {
            adders: this.add,
            setters: this.set,
        };
        __classPrivateFieldSet(this, _LFWidgets_NAMES, CUSTOM_WIDGET_NAMES_MAP, "f");
    }
}
_LFWidgets_NAMES = new WeakMap();
