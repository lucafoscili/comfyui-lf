var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFEvents_instances, _LFEvents_NAMES, _LFEvents_initProps, _LFEvents_getW;
import { getApiRoutes, getLFManager } from '../utils/utils.js';
/*-------------------------------------------------*/
/*             E v e n t s   C l a s s             */
/*-------------------------------------------------*/
export class LFEvents {
    constructor() {
        _LFEvents_instances.add(this);
        _LFEvents_NAMES.set(this, {
            controlPanel: 'lf-controlpanel',
            displayJson: 'lf-displayjson',
            imageHistogram: 'lf-imagehistogram',
            loadImages: 'lf-loadimages',
            switchImage: 'lf-switchimage',
            switchInteger: 'lf-switchinteger',
            switchJSON: 'lf-switchjson',
            switchString: 'lf-switchstring',
        });
        this.eventHandler = {
            displayJson: (event, addW) => {
                getLFManager().log(`Event '${__classPrivateFieldGet(this, _LFEvents_NAMES, "f").displayJson}' received`, { event }, 'success');
                const payload = event.detail;
                const node = getApiRoutes().getNodeById(payload.id);
                if (node) {
                    __classPrivateFieldGet(this, _LFEvents_instances, "m", _LFEvents_initProps).call(this, node, payload);
                    const widget = __classPrivateFieldGet(this, _LFEvents_instances, "m", _LFEvents_getW).call(this, node, 'KUL_CODE', addW);
                    const comp = widget.options.getComp();
                    comp.kulLanguage = 'json';
                    widget.options.setValue(event.detail.json);
                    getApiRoutes().redraw();
                }
            },
        };
        this.get = {
            eventHandlers: this.eventHandler,
        };
    }
}
_LFEvents_NAMES = new WeakMap(), _LFEvents_instances = new WeakSet(), _LFEvents_initProps = function _LFEvents_initProps(node, payload) {
    const isInitialized = node.lfProps?.isInitialized;
    if (isInitialized) {
        node.lfProps = Object.assign(node.lfProps, {
            ...node.lfProps,
            payload,
        });
    }
    else {
        node.lfProps = { isInitialized: true, payload: { id: '', isDebug: false, ...payload } };
    }
}, _LFEvents_getW = function _LFEvents_getW(node, name, addW) {
    return node?.widgets?.find((w) => w.name === name) || addW(node, name).widget;
};
