var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFNodes_instances, _LFNodes_EXT_PREFIX, _LFNodes_NAMES, _LFNodes_getExtName;
import { getApiRoutes } from '../utils/utils.js';
/*-------------------------------------------------*/
/*               N o d e s   C l a s s             */
/*-------------------------------------------------*/
export class LFNodes {
    constructor() {
        _LFNodes_instances.add(this);
        _LFNodes_EXT_PREFIX.set(this, 'LFExtension_');
        _LFNodes_NAMES.set(this, {
            controlPanel: 'LF_ControlPanel',
            displayJson: 'LF_DisplayJSON',
            imageHistogram: 'LF_ImageHistogram',
            loadImages: 'LF_LoadImages',
            switchImage: 'LF_SwitchImage',
            switchInteger: 'LF_SwitchInteger',
            switchJSON: 'LF_SwitchJSON',
            switchString: 'LF_SwitchString',
        });
        this.register = {
            controlPanel: (setW, addW) => {
                const name = __classPrivateFieldGet(this, _LFNodes_NAMES, "f").controlPanel;
                const extension = {
                    name: __classPrivateFieldGet(this, _LFNodes_instances, "m", _LFNodes_getExtName).call(this, name),
                    beforeRegisterNodeDef: async (nodeType) => {
                        if (nodeType.comfyClass === name) {
                            const onNodeCreated = nodeType.prototype.onNodeCreated;
                            nodeType.prototype.onNodeCreated = function () {
                                const r = onNodeCreated?.apply(this, arguments);
                                const node = this;
                                addW(node, name);
                                return r;
                            };
                        }
                    },
                    getCustomWidgets: setW,
                };
                getApiRoutes().register(extension);
            },
            displayJson: (setW, addW) => {
                const name = __classPrivateFieldGet(this, _LFNodes_NAMES, "f").displayJson;
                const extension = {
                    name: __classPrivateFieldGet(this, _LFNodes_instances, "m", _LFNodes_getExtName).call(this, name),
                    beforeRegisterNodeDef: async (nodeType) => {
                        if (nodeType.comfyClass === name) {
                            const onNodeCreated = nodeType.prototype.onNodeCreated;
                            nodeType.prototype.onNodeCreated = function () {
                                const r = onNodeCreated?.apply(this, arguments);
                                const node = this;
                                addW(node, name);
                                return r;
                            };
                        }
                    },
                    getCustomWidgets: setW,
                };
                getApiRoutes().register(extension);
            },
        };
    }
}
_LFNodes_EXT_PREFIX = new WeakMap(), _LFNodes_NAMES = new WeakMap(), _LFNodes_instances = new WeakSet(), _LFNodes_getExtName = function _LFNodes_getExtName(name) {
    return __classPrivateFieldGet(this, _LFNodes_EXT_PREFIX, "f") + name;
};
