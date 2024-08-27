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
var _LFNodes_EXT_PREFIX, _LFNodes_NAMES;
import { NODE_NAMES_MAP } from '../utils/constants.js';
import { getApiRoutes } from '../utils/utils.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        _LFNodes_EXT_PREFIX.set(this, 'LFExtension_');
        _LFNodes_NAMES.set(this, void 0);
        this.register = {
            controlPanel: (set_w, add_w) => {
                const name = __classPrivateFieldGet(this, _LFNodes_EXT_PREFIX, "f") + __classPrivateFieldGet(this, _LFNodes_NAMES, "f").controlPanel;
                const extension = {
                    name: __classPrivateFieldGet(this, _LFNodes_EXT_PREFIX, "f") + __classPrivateFieldGet(this, _LFNodes_NAMES, "f").controlPanel,
                    beforeRegisterNodeDef: async (nodeType) => {
                        if (nodeType.comfyClass === __classPrivateFieldGet(this, _LFNodes_NAMES, "f").controlPanel) {
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
                getApiRoutes().register(extension);
            },
        };
        __classPrivateFieldSet(this, _LFNodes_NAMES, NODE_NAMES_MAP, "f");
    }
}
_LFNodes_EXT_PREFIX = new WeakMap(), _LFNodes_NAMES = new WeakMap();
