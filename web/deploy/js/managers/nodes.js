var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFNodes_EXT_PREFIX;
import { getLFManager } from '../utils/utils.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        _LFNodes_EXT_PREFIX.set(this, 'LFExtension_');
        this.NAMES = {
            controlPanel: 'LF_ControlPanel',
            displayJson: 'LF_DisplayJSON',
            imageHistogram: 'LF_ImageHistogram',
            loadImages: 'LF_LoadImages',
            switchImage: 'LF_SwitchImage',
            switchInteger: 'LF_SwitchInteger',
            switchJSON: 'LF_SwitchJSON',
            switchString: 'LF_SwitchString',
        };
        this.register = {
            controlPanel: (set_w, add_w) => {
                const name = __classPrivateFieldGet(this, _LFNodes_EXT_PREFIX, "f") + this.NAMES.controlPanel;
                const extension = {
                    name: __classPrivateFieldGet(this, _LFNodes_EXT_PREFIX, "f") + this.NAMES.controlPanel,
                    beforeRegisterNodeDef: async (nodeType) => {
                        if (nodeType.comfyClass === this.NAMES.controlPanel) {
                            const onNodeCreated = nodeType.prototype.onNodeCreated;
                            nodeType.prototype.onNodeCreated = function () {
                                const r = onNodeCreated?.apply(this, arguments);
                                const node = this;
                                add_w(node, name);
                                return r;
                            };
                        }
                    },
                    getCustomWidgets: set_w,
                };
                getLFManager().APIS.register(extension);
            },
        };
    }
}
_LFNodes_EXT_PREFIX = new WeakMap();
