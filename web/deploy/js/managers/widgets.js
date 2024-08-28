var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFWidgets_NAMES;
import { app } from '/scripts/app.js';
import { renderControlPanel } from '../widgets/controlPanel.js';
import { renderCode } from '../widgets/code.js';
import { getLFManager, unescapeJson } from '../utils/utils.js';
/*-------------------------------------------------*/
/*            W i d g e t s   C l a s s            */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        _LFWidgets_NAMES.set(this, {
            controlPanel: 'KUL_CONTROL_PANEL',
            displayJson: 'KUL_CODE',
        });
        this.add = {
            controlPanel: (nodeType) => {
                const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel).widget;
                return widget;
            },
            code: (nodeType) => {
                const widget = app.widgets.KUL_CODE(nodeType, __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").displayJson).widget;
                return widget;
            },
        };
        this.option = {
            code: (code) => {
                return {
                    hideOnZoom: false,
                    getComp() {
                        return code;
                    },
                    getProps() {
                        return code.getProps();
                    },
                    getValue() {
                        return code.kulValue;
                    },
                    refresh: () => { },
                    setProps(props) {
                        for (const key in props) {
                            if (Object.prototype.hasOwnProperty.call(props, key)) {
                                const prop = props[key];
                                code[prop] = prop;
                            }
                        }
                    },
                    setValue(value) {
                        try {
                            if (typeof value === 'string') {
                                code.kulValue = JSON.stringify(unescapeJson(value));
                            }
                            else {
                                code.kulValue = JSON.stringify(value);
                            }
                        }
                        catch (error) {
                            getLFManager().log('Error when setting value!', { error }, 'error');
                            if (value === undefined || value === '') {
                                code.kulValue = 'Wow. Such empty!';
                            }
                        }
                    },
                };
            },
        };
        this.set = {
            controlPanel: () => {
                const type = __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").controlPanel;
                return {
                    KUL_CONTROL_PANEL: (nodeType, name) => {
                        return renderControlPanel(nodeType, name, type);
                    },
                };
            },
            code: () => {
                const type = __classPrivateFieldGet(this, _LFWidgets_NAMES, "f").displayJson;
                return {
                    KUL_CODE: (nodeType, name) => {
                        return renderCode(nodeType, name, type, this.option.code);
                    },
                };
            },
        };
        this.get = {
            adders: this.add,
            options: this.option,
            setters: this.set,
        };
    }
}
_LFWidgets_NAMES = new WeakMap();
