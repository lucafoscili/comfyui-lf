import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance } from './kul-manager-26d0782a.js';
import { g as getProps } from './componentUtils-a994b230.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulUploadProps;
(function (KulUploadProps) {
    KulUploadProps["kulLabel"] = "Sets the button's label.";
    KulUploadProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulUploadProps["kulStyle"] = "Custom style of the component.";
    KulUploadProps["kulValue"] = "Initializes the component with these files.";
})(KulUploadProps || (KulUploadProps = {}));

const kulUploadCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_upload_backdrop_filter:var(--kul-upload-backdrop-filter, blur(5px));--kul_upload_backdrop_filter_hover:var(\n    --kul-upload-backdrop-filter-hover,\n    blur(10px)\n  );--kul_upload_border:var(\n    --kul-upload-border,\n    1px solid rgba(var(--kul-border-color-rgb), 0.2)\n  );--kul_upload_border_radius:var(--kul-upload-border-radius, 4px);--kul_upload_button_height:var(--kul-upload-button-height, 42px);--kul_upload_button_text_transform:var(\n    --kul-upload-button_text-transform,\n    uppercase\n  );--kul_upload_grid_gap:var(--kul-upload-grid-gap, 20px);--kul_upload_info_height:var(--kul-upload-info-height, minmax(auto, 25vh));--kul_upload_item_padding:var(--kul-upload-item-padding, 0.75em);--kul_upload_padding:var(--kul-upload-backdrop-filter, 1em);display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}.wrapper{-webkit-backdrop-filter:var(--kul_upload_backdrop_filter);backdrop-filter:var(--kul_upload_backdrop_filter);background:rgba(255, 255, 255, 0.1);border:var(--kul_upload_border);box-sizing:border-box;display:grid;grid-template-rows:1fr;height:100%;padding:var(--kul_upload_padding);width:100%}.wrapper--with-info{grid-gap:var(--kul_upload_grid_gap);grid-template-rows:var(--kul_upload_button_height) var(--kul_upload_info_height)}.wrapper--with-info .file-info{padding:var(--kul_upload_item_padding)}.file-upload{-webkit-backdrop-filter:var(--kul_upload_backdrop_filter);backdrop-filter:var(--kul_upload_backdrop_filter);border:var(--kul_upload_border);border-radius:var(--kul_upload_border_radius);display:flex;transition:backdrop-filter 80ms ease, box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.file-upload__input{display:none}.file-upload__label{align-content:center;border-radius:var(--kul_upload_border_radius);cursor:pointer;display:block;font-size:0.875em;height:100%;letter-spacing:0.0892857143em;margin:auto;text-align:center;text-transform:var(--kul_upload_button_text_transform);width:100%}.file-upload:hover{-webkit-backdrop-filter:var(--kul_upload_backdrop_filter_hover);backdrop-filter:var(--kul_upload_backdrop_filter_hover);box-shadow:0 5px 5px -3px rgba(var(--kul-text-color-rgb), 0.25), 0 8px 10px 1px rgba(var(--kul-text-color-rgb), 0.18), 0 3px 14px 2px rgba(var(--kul-text-color-rgb), 0.15)}.file-info{background-color:rgba(var(--kul-background-color-rgb), 0.375);border-radius:var(--kul_upload_border_radius);max-height:25dvh;overflow:auto;transition:background-color 0.3s ease}.file-info__item{align-items:center;display:flex;justify-content:center}.file-info__name,.file-info__size{flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-info__name{padding:0 0.5em}.file-info__size{min-width:max-content}.file-info__clear{padding-left:0.5em}";
const KulUploadStyle0 = kulUploadCss;

const KulUpload = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-upload-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.selectedFiles = [];
        this.kulLabel = 'Upload files...';
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulValue = null;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #input;
    #kulManager = kulManagerInstance();
    #rippleSurface;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, file) {
        switch (eventType) {
            case 'delete':
                this.selectedFiles = this.selectedFiles.filter((f) => f !== file);
                break;
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface);
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
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #formatFileSize(size) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
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
    }
    #handleFileChange() {
        if (this.#input.files) {
            this.selectedFiles = Array.from(this.#input.files);
        }
        else {
            this.selectedFiles = [];
        }
        this.onKulEvent(new CustomEvent('upload'), 'upload');
    }
    #prepFileInfo() {
        return this.selectedFiles.map((file, index) => (h("div", { class: "file-info__item", key: index }, h("kul-image", { class: "file-info__type", kulValue: file.type.includes('image')
                ? 'image'
                : file.type.includes('audio')
                    ? 'audiotrack'
                    : file.type.includes('video')
                        ? 'movie'
                        : 'file', kulSizeX: "24px", kulSizeY: "24px", title: file.type }), h("span", { class: "file-info__name", title: file.name }, file.name), h("span", { class: "file-info__size", title: file.size.toString() }, this.#formatFileSize(file.size)), h("kul-button", { class: "file-info__clear", kulIcon: 'clear', kulStyling: "flat", onClick: (e) => {
                this.onKulEvent(e, 'delete', file);
            }, title: "Remove" }))));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (Array.isArray(this.kulValue)) {
            this.selectedFiles = this.kulValue;
        }
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        if (this.#rippleSurface) {
            this.#kulManager.theme.ripple.setup(this.#rippleSurface);
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const hasSelectedFiles = this.selectedFiles && this.selectedFiles.length;
        return (h(Host, { key: 'a00462139e2ea32013e88d4feaaf801f3db60bd9' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '1f4188284cb7559ceb5a06c2246091c2d49e2dc9', id: KUL_WRAPPER_ID }, h("div", { key: '567da2844b2df0d69289d7080765c1d45add9b41', class: `wrapper ${this.selectedFiles && this.selectedFiles.length
                ? 'wrapper--with-info'
                : ''}` }, h("div", { key: '84a4d15ae8205c26f09e06d78fdeadc226460e09', class: "file-upload", onPointerDown: (e) => this.onKulEvent(e, 'pointerdown') }, h("input", { key: '72cf4bacb2f3341ea56471133f2b638d220f0532', class: "file-upload__input", id: "upload-input", multiple: true, onChange: () => this.#handleFileChange(), ref: (el) => {
                this.#input = el;
            }, type: "file" }), h("label", { key: '0d24d73e4755a71b2c1433fc6bfe6ba9ebf6d969', class: "file-upload__label", htmlFor: "upload-input", ref: (el) => {
                if (this.kulRipple) {
                    this.#rippleSurface = el;
                }
            } }, h("div", { key: 'b00137a0876d71a7a86db7d400f377a275b98480', class: "file-upload__text" }, this.kulLabel))), h("div", { key: '406affa669d0cc9c92d49cc5b19bf492aab9e5c3', class: "file-info" }, hasSelectedFiles
            ? this.#prepFileInfo()
            : undefined)))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulUpload.style = KulUploadStyle0;

export { KulUpload as kul_upload };

//# sourceMappingURL=kul-upload.entry.js.map