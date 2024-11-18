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
var _LFTooltip_instances, _LFTooltip_CB, _LFTooltip_CSS_CLASSES, _LFTooltip_LAYOUT, _LFTooltip_TOOLTIP_ELEMENT, _LFTooltip_initialize, _LFTooltip_uploadLayout, _LFTooltip_buttonEventHandler;
import { getKulManager, getLFManager } from '../utils/common.js';
import { LogSeverity, } from '../types/manager/manager.js';
/*-------------------------------------------------*/
/*           T o o l t i p   C l a s s             */
/*-------------------------------------------------*/
export class LFTooltip {
    constructor() {
        _LFTooltip_instances.add(this);
        _LFTooltip_CB.set(this, {});
        _LFTooltip_CSS_CLASSES.set(this, {
            wrapper: 'lf-tooltip',
            content: `lf-tooltip__content`,
        });
        _LFTooltip_LAYOUT.set(this, void 0); // more in the future?
        _LFTooltip_TOOLTIP_ELEMENT.set(this, void 0);
        _LFTooltip_buttonEventHandler.set(this, async (upload, e) => {
            const { eventType } = e.detail;
            switch (eventType) {
                case 'click':
                    const lfManager = getLFManager();
                    switch (__classPrivateFieldGet(this, _LFTooltip_LAYOUT, "f")) {
                        case 'upload':
                            const files = await upload.getValue();
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const result = e.target?.result;
                                let base64String = '';
                                if (typeof result === 'string') {
                                    base64String = result.replace(/^data:.*,/, '');
                                }
                                else if (result instanceof ArrayBuffer) {
                                    const arrayBufferView = new Uint8Array(result);
                                    base64String = btoa(String.fromCharCode.apply(null, arrayBufferView));
                                }
                                if (__classPrivateFieldGet(this, _LFTooltip_CB, "f")) {
                                    lfManager.log('Invoking upload callback.', { base64String }, LogSeverity.Info);
                                    __classPrivateFieldGet(this, _LFTooltip_CB, "f")[__classPrivateFieldGet(this, _LFTooltip_LAYOUT, "f")](base64String);
                                }
                            };
                            reader.readAsDataURL(files[0]);
                            break;
                    }
            }
        });
        const link = document.createElement('link');
        link.dataset.filename = 'tooltip';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `extensions/comfyui-lf/css/tooltip.css`;
        document.head.appendChild(link);
    }
    create(anchor, layout, cb) {
        const kulManager = getKulManager();
        if (__classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f")) {
            __classPrivateFieldGet(this, _LFTooltip_instances, "m", _LFTooltip_initialize).call(this);
        }
        __classPrivateFieldSet(this, _LFTooltip_CB, cb ? { [layout]: cb } : {}, "f");
        __classPrivateFieldSet(this, _LFTooltip_LAYOUT, layout ?? 'upload', "f");
        __classPrivateFieldSet(this, _LFTooltip_TOOLTIP_ELEMENT, document.createElement('div'), "f");
        __classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f").classList.add(__classPrivateFieldGet(this, _LFTooltip_CSS_CLASSES, "f").wrapper);
        switch (__classPrivateFieldGet(this, _LFTooltip_LAYOUT, "f")) {
            case 'upload':
                __classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f").appendChild(__classPrivateFieldGet(this, _LFTooltip_instances, "m", _LFTooltip_uploadLayout).call(this));
                break;
        }
        kulManager.dynamicPosition.register(__classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f"), anchor, 0, '', true);
        kulManager.dynamicPosition.start(__classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f"));
        kulManager.addClickCallback({ cb: () => this.destroy(), el: __classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f") });
        requestAnimationFrame(() => document.body.appendChild(__classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f")));
    }
    destroy() {
        __classPrivateFieldGet(this, _LFTooltip_instances, "m", _LFTooltip_initialize).call(this);
    }
}
_LFTooltip_CB = new WeakMap(), _LFTooltip_CSS_CLASSES = new WeakMap(), _LFTooltip_LAYOUT = new WeakMap(), _LFTooltip_TOOLTIP_ELEMENT = new WeakMap(), _LFTooltip_buttonEventHandler = new WeakMap(), _LFTooltip_instances = new WeakSet(), _LFTooltip_initialize = function _LFTooltip_initialize() {
    __classPrivateFieldGet(this, _LFTooltip_TOOLTIP_ELEMENT, "f")?.remove();
    __classPrivateFieldSet(this, _LFTooltip_TOOLTIP_ELEMENT, null, "f");
    __classPrivateFieldSet(this, _LFTooltip_CB, {}, "f");
    __classPrivateFieldSet(this, _LFTooltip_LAYOUT, null, "f");
}, _LFTooltip_uploadLayout = function _LFTooltip_uploadLayout() {
    const content = document.createElement('div');
    const upload = document.createElement('kul-upload');
    const button = document.createElement('kul-button');
    content.classList.add(__classPrivateFieldGet(this, _LFTooltip_CSS_CLASSES, "f").content);
    button.classList.add('kul-full-width');
    button.kulIcon = 'upload';
    button.kulLabel = 'Update cover';
    content.appendChild(upload);
    content.appendChild(button);
    button.addEventListener('kul-button-event', __classPrivateFieldGet(this, _LFTooltip_buttonEventHandler, "f").bind(__classPrivateFieldGet(this, _LFTooltip_buttonEventHandler, "f"), upload));
    return content;
};
