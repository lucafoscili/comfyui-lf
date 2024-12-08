import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-5c52ec0e.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-c48a993d.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulUploadProps;
(function (KulUploadProps) {
    KulUploadProps["kulLabel"] = "Sets the button's label.";
    KulUploadProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulUploadProps["kulStyle"] = "Custom style of the component.";
    KulUploadProps["kulValue"] = "Initializes the component with these files.";
})(KulUploadProps || (KulUploadProps = {}));
//#endregion

const kulUploadCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_upload_backdrop_filter:var(--kul-upload-backdrop-filter, blur(5px));--kul_upload_backdrop_filter_hover:var(\n    --kul-upload-backdrop-filter-hover,\n    blur(10px)\n  );--kul_upload_border:var(\n    --kul-upload-border,\n    1px solid rgba(var(--kul-border-color-rgb), 0.2)\n  );--kul_upload_border_radius:var(--kul-upload-border-radius, 4px);--kul_upload_button_height:var(--kul-upload-button-height, 42px);--kul_upload_button_text_transform:var(\n    --kul-upload-button_text-transform,\n    uppercase\n  );--kul_upload_grid_gap:var(--kul-upload-grid-gap, 20px);--kul_upload_info_height:var(--kul-upload-info-height, minmax(auto, 25vh));--kul_upload_item_padding:var(--kul-upload-item-padding, 0.75em);--kul_upload_padding:var(--kul-upload-backdrop-filter, 1em);display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}.wrapper{-webkit-backdrop-filter:var(--kul_upload_backdrop_filter);backdrop-filter:var(--kul_upload_backdrop_filter);background:rgba(255, 255, 255, 0.1);border:var(--kul_upload_border);box-sizing:border-box;display:grid;grid-template-rows:1fr;height:100%;padding:var(--kul_upload_padding);width:100%}.wrapper--with-info{grid-gap:var(--kul_upload_grid_gap);grid-template-rows:var(--kul_upload_button_height) var(--kul_upload_info_height)}.wrapper--with-info .file-info{padding:var(--kul_upload_item_padding)}.file-upload{-webkit-backdrop-filter:var(--kul_upload_backdrop_filter);backdrop-filter:var(--kul_upload_backdrop_filter);border:var(--kul_upload_border);border-radius:var(--kul_upload_border_radius);display:flex;transition:backdrop-filter 80ms ease, box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.file-upload__input{display:none}.file-upload__label{align-content:center;border-radius:var(--kul_upload_border_radius);cursor:pointer;display:block;font-size:0.875em;height:100%;letter-spacing:0.0892857143em;margin:auto;text-align:center;text-transform:var(--kul_upload_button_text_transform);width:100%}.file-upload:hover{-webkit-backdrop-filter:var(--kul_upload_backdrop_filter_hover);backdrop-filter:var(--kul_upload_backdrop_filter_hover);box-shadow:0 5px 5px -3px rgba(var(--kul-text-color-rgb), 0.25), 0 8px 10px 1px rgba(var(--kul-text-color-rgb), 0.18), 0 3px 14px 2px rgba(var(--kul-text-color-rgb), 0.15)}.file-info{background-color:rgba(var(--kul-background-color-rgb), 0.375);border-radius:var(--kul_upload_border_radius);max-height:25dvh;overflow:auto;transition:background-color 0.3s ease}.file-info__item{align-items:center;display:flex;justify-content:center}.file-info__name,.file-info__size{flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-info__name{padding:0 0.5em}.file-info__size{min-width:max-content}.file-info__clear{padding-left:0.5em}";
const KulUploadStyle0 = kulUploadCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m")
        throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _KulUpload_instances, _KulUpload_input, _KulUpload_kulManager, _KulUpload_rippleSurface, _KulUpload_formatFileSize, _KulUpload_handleFileChange, _KulUpload_prepFileInfo;
const KulUpload = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-upload-event", 6);
        _KulUpload_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulUpload_input.set(this, void 0);
        _KulUpload_kulManager.set(this, kulManagerInstance());
        _KulUpload_rippleSurface.set(this, void 0);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.selectedFiles = [];
        this.kulLabel = "Upload files...";
        this.kulRipple = true;
        this.kulStyle = "";
        this.kulValue = null;
    }
    onKulEvent(e, eventType, file) {
        switch (eventType) {
            case "delete":
                this.selectedFiles = this.selectedFiles.filter((f) => f !== file);
                break;
            case "pointerdown":
                if (this.kulRipple) {
                    __classPrivateFieldGet(this, _KulUpload_kulManager, "f").theme.ripple.trigger(e, __classPrivateFieldGet(this, _KulUpload_rippleSurface, "f"));
                }
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            selectedFiles: this.selectedFiles,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves to a KulDebugLifecycleInfo object containing debug information.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    async getProps(descriptions) {
        return getProps(this, KulUploadProps, descriptions);
    }
    /**
     * Returns the component's internal value.
     */
    async getValue() {
        return this.selectedFiles;
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    async unmount(ms = 0) {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent("unmount"), "unmount");
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulUpload_kulManager, "f").theme.register(this);
        if (Array.isArray(this.kulValue)) {
            this.selectedFiles = this.kulValue;
        }
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        if (__classPrivateFieldGet(this, _KulUpload_rippleSurface, "f")) {
            __classPrivateFieldGet(this, _KulUpload_kulManager, "f").theme.ripple.setup(__classPrivateFieldGet(this, _KulUpload_rippleSurface, "f"));
        }
        __classPrivateFieldGet(this, _KulUpload_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulUpload_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulUpload_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        const hasSelectedFiles = this.selectedFiles && this.selectedFiles.length;
        return (h(Host, { key: '0c2f3f56951a643e024b101d7efe2aeb0b96dc72' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulUpload_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'bcd5e2db8ac658b9d51966a6106e200d58e8a478', id: KUL_WRAPPER_ID }, h("div", { key: 'ed379e2e3be3d4c5504fadd4f5222b6b73db5aed', class: `wrapper ${this.selectedFiles && this.selectedFiles.length
                ? "wrapper--with-info"
                : ""}` }, h("div", { key: '26c53d2daf48015085dc9437d9acca8634e52acb', class: "file-upload", onPointerDown: (e) => this.onKulEvent(e, "pointerdown") }, h("input", { key: '2a8b52e9601ce35095b509213f3f0ee7aa46f196', class: "file-upload__input", id: "upload-input", multiple: true, onChange: () => __classPrivateFieldGet(this, _KulUpload_instances, "m", _KulUpload_handleFileChange).call(this), ref: (el) => {
                __classPrivateFieldSet(this, _KulUpload_input, el, "f");
            }, type: "file" }), h("label", { key: 'f1ba616585b6299c24303a00ff63600636f764bf', class: "file-upload__label", htmlFor: "upload-input", ref: (el) => {
                if (this.kulRipple) {
                    __classPrivateFieldSet(this, _KulUpload_rippleSurface, el, "f");
                }
            } }, h("div", { key: '4e4908db0198534365ebe88456db0c3b41ca7990', class: "file-upload__text" }, this.kulLabel))), h("div", { key: 'bb6c5d2c8ba054985822fa7c9ed8a97608972516', class: "file-info" }, hasSelectedFiles ? __classPrivateFieldGet(this, _KulUpload_instances, "m", _KulUpload_prepFileInfo).call(this) : undefined)))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulUpload_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
};
_KulUpload_input = new WeakMap(), _KulUpload_kulManager = new WeakMap(), _KulUpload_rippleSurface = new WeakMap(), _KulUpload_instances = new WeakSet(), _KulUpload_formatFileSize = function _KulUpload_formatFileSize(size) {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    if (size > 10000) {
        size /= 1024;
        size /= 1024;
        unitIndex = 2;
    }
    else {
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}, _KulUpload_handleFileChange = function _KulUpload_handleFileChange() {
    if (__classPrivateFieldGet(this, _KulUpload_input, "f").files) {
        this.selectedFiles = Array.from(__classPrivateFieldGet(this, _KulUpload_input, "f").files);
    }
    else {
        this.selectedFiles = [];
    }
    this.onKulEvent(new CustomEvent("upload"), "upload");
}, _KulUpload_prepFileInfo = function _KulUpload_prepFileInfo() {
    return this.selectedFiles.map((file, index) => (h("div", { class: "file-info__item", key: index }, h("kul-image", { class: "file-info__type", kulValue: file.type.includes("image")
            ? "image"
            : file.type.includes("audio")
                ? "audiotrack"
                : file.type.includes("video")
                    ? "movie"
                    : "file", kulSizeX: "24px", kulSizeY: "24px", title: file.type }), h("span", { class: "file-info__name", title: file.name }, file.name), h("span", { class: "file-info__size", title: file.size.toString() }, __classPrivateFieldGet(this, _KulUpload_instances, "m", _KulUpload_formatFileSize).call(this, file.size)), h("kul-button", { class: "file-info__clear", kulIcon: "clear", kulStyling: "flat", onClick: (e) => {
            this.onKulEvent(e, "delete", file);
        }, title: "Remove" }))));
};
KulUpload.style = KulUploadStyle0;

export { KulUpload as kul_upload };

//# sourceMappingURL=kul-upload.entry.js.map