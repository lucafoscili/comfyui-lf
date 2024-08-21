var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFNodesManager_EXT_PREFIX, _LFNodesManager_NODES_DICT;
import { DisplayJSONAdapter } from '../helpers/displayJson.js';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
class LFNodesManager {
    constructor() {
        _LFNodesManager_EXT_PREFIX.set(this, 'LFExtension_');
        _LFNodesManager_NODES_DICT.set(this, {
            LF_DisplayJSON: DisplayJSONAdapter(),
        });
        for (const key in __classPrivateFieldGet(this, _LFNodesManager_NODES_DICT, "f")) {
            if (Object.prototype.hasOwnProperty.call(__classPrivateFieldGet(this, _LFNodesManager_NODES_DICT, "f"), key)) {
                const node = __classPrivateFieldGet(this, _LFNodesManager_NODES_DICT, "f")[key];
                const name = __classPrivateFieldGet(this, _LFNodesManager_EXT_PREFIX, "f") + key;
                app.registerExtension({
                    name,
                });
                api.addEventListener(node.eventName, node.eventCb);
            }
        }
    }
}
_LFNodesManager_EXT_PREFIX = new WeakMap(), _LFNodesManager_NODES_DICT = new WeakMap();
const lfNodesManager = new LFNodesManager();
console.log('LF Nodes initialized.', lfNodesManager);
