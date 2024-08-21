var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LFManager_DEBUG, _LFManager_EXT_PREFIX, _LFManager_NODES_DICT;
import { DisplayJSONAdapter } from '../helpers/displayJson.js';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
class LFManager {
    constructor() {
        _LFManager_DEBUG.set(this, false);
        _LFManager_EXT_PREFIX.set(this, 'LFExtension_');
        _LFManager_NODES_DICT.set(this, {
            LF_DisplayJSON: DisplayJSONAdapter(),
        });
        for (const key in __classPrivateFieldGet(this, _LFManager_NODES_DICT, "f")) {
            if (Object.prototype.hasOwnProperty.call(__classPrivateFieldGet(this, _LFManager_NODES_DICT, "f"), key)) {
                const node = __classPrivateFieldGet(this, _LFManager_NODES_DICT, "f")[key];
                const name = __classPrivateFieldGet(this, _LFManager_EXT_PREFIX, "f") + key;
                app.registerExtension({
                    name,
                });
                api.addEventListener(node.eventName, node.eventCb);
            }
        }
    }
    getDebug() {
        return __classPrivateFieldGet(this, _LFManager_DEBUG, "f");
    }
    log(message) {
        if (__classPrivateFieldGet(this, _LFManager_DEBUG, "f")) {
            console.log(message);
        }
    }
    toggleDebug() {
        __classPrivateFieldSet(this, _LFManager_DEBUG, !__classPrivateFieldGet(this, _LFManager_DEBUG, "f"), "f");
    }
}
_LFManager_DEBUG = new WeakMap(), _LFManager_EXT_PREFIX = new WeakMap(), _LFManager_NODES_DICT = new WeakMap();
if (!window.lfManager) {
    window.lfManager = new LFManager();
}
