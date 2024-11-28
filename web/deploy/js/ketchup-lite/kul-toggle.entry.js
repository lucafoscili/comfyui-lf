import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-7cf82e95.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, a as KulDataCyAttributes, b as KUL_STYLE_ID } from './kul-manager-72505221.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulToggleProps;
(function (KulToggleProps) {
    KulToggleProps["kulDisabled"] = "When true, the component is disabled.";
    KulToggleProps["kulLabel"] = "Defines text to display along with the toggle.";
    KulToggleProps["kulLeadingLabel"] = " Defaults at false. When set to true, the label will be displayed before the component";
    KulToggleProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulToggleProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulToggleProps["kulValue"] = "If true, the button is marked as checked.";
})(KulToggleProps || (KulToggleProps = {}));
//#endregion

const kulToggleCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_toggle_font_family:var(\n    --kul-toggle-font-family,\n    var(--kul-font-family)\n  );--kul_toggle_font_size:var(--kul-toggle-font-size, var(--kul-font-size));--kul_toggle_font_weight:var(--kul-toggle-font-weight, 400);--kul_toggle_label_color:var(\n    --kul-toggle-label-color,\n    var(--kul-text-color)\n  );--kul_toggle_primary_color:var(\n    --kul-toggle-primary-color,\n    var(--kul-primary-color)\n  );--kul_toggle_primary_color_rgb:var(\n    --kul-toggle-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_toggle_thumb_color:var(\n    --kul-toggle-thumb-color,\n    var(--kul-border-color)\n  );display:block;font-family:var(--kul_toggle_font_family);font-size:var(--kul_toggle_font_size)}.form-field{font-size:0.875em;line-height:2em;font-weight:var(--kul_toggle_font_weight);letter-spacing:0.0178571429em;color:var(--kul_toggle_label_color);display:inline-flex;align-items:center;vertical-align:middle}.form-field--align-end .toggle__label{margin-left:auto;margin-right:0px;padding-left:0px;padding-right:4px;order:-1}.form-field__label{color:var(--kul_toggle_label_color);cursor:pointer;font-family:var(--kul-font-family);margin-left:0px;margin-right:auto;order:0;padding-left:4px;padding-right:0px;user-select:none}.toggle{display:inline-block;position:relative;outline:none;user-select:none;margin:0 0.75em}.toggle--disabled{cursor:auto;opacity:0.5;pointer-events:none}.toggle--checked .toggle__track{background-color:var(--kul_toggle_primary_color);opacity:0.54}.toggle--checked .toggle__thumb-underlay{transform:translateX(16px)}.toggle--checked .toggle__thumb{background-color:var(--kul_toggle_primary_color);border-color:var(--kul_toggle_primary_color)}.toggle--checked .toggle__thumb .toggle__native-control{transform:translateX(-16px)}.toggle__track{box-sizing:border-box;width:36px;height:14px;border:1px solid transparent;border-radius:7px;opacity:0.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.toggle__thumb-underlay{border-radius:50%;display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), border-color 90ms cubic-bezier(0.4, 0, 0.2, 1);left:-14px;right:initial;top:-16px;width:48px;height:48px}.toggle__thumb-underlay:hover{background-color:rgba(var(--kul_toggle_primary_color_rgb), 0.125)}.toggle__thumb{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;z-index:1;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.toggle__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1);width:64px;height:48px}.toggle:not(.toggle--checked) .toggle__track{background-color:var(--kul_toggle_label_color)}.toggle:not(.toggle--checked) .toggle__thumb{background-color:var(--kul_toggle_thumb_color);border-color:var(--kul_toggle_thumb_color)}:host(.kul-danger){--kul-toggle-primary-color:var(--kul-danger-color);--kul-toggle-primary-color-rgb:var(--kul-danger-color-rgb)}:host(.kul-info){--kul-toggle-primary-color:var(--kul-info-color);--kul-toggle-primary-color-rgb:var(--kul-info-color-rgb)}:host(.kul-secondary){--kul-toggle-primary-color:var(--kul-secondary-color);--kul-toggle-primary-color-rgb:var(--kul-secondary-color-rgb)}:host(.kul-success){--kul-toggle-primary-color:var(--kul-success-color);--kul-toggle-primary-color-rgb:var(--kul-success-color-rgb)}:host(.kul-warning){--kul-toggle-primary-color:var(--kul-warning-color);--kul-toggle-primary-color-rgb:var(--kul-warning-color-rgb)}";
const KulToggleStyle0 = kulToggleCss;

const KulToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-toggle-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = 'off';
        this.kulDisabled = false;
        this.kulLabel = '';
        this.kulLeadingLabel = false;
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulValue = false;
    }
    get rootElement() { return getElement(this); }
    //#endregion
    //#region Internal variables
    #kulManager = kulManagerInstance();
    #rippleSurface;
    //#endregion
    //#region Events
    kulEvent;
    onKulEvent(e, eventType) {
        switch (eventType) {
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
            value: this.value,
            valueAsBoolean: this.value === 'on' ? true : false,
        });
    }
    //#endregion
    //#region Public methods
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's properties and descriptions.
     * @param {boolean} descriptions - When true, includes descriptions for each property.
     * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
     */
    async getProps(descriptions) {
        return getProps(this, KulToggleProps, descriptions);
    }
    /**
     * Used to retrieve the component's current state.
     * @returns {Promise<KulToggleState>} Promise resolved with the current state of the component.
     */
    async getValue() {
        return this.value;
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Sets the component's state.
     * @param {KulToggleState} value - The new state to be set on the component.
     * @returns {Promise<void>}
     */
    async setValue(value) {
        this.#updateState(value);
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
    //#endregion
    //#region Private methods
    #isOn() {
        return this.value === 'on' ? true : false;
    }
    #updateState(value, e = new CustomEvent('change')) {
        if (typeof value === 'boolean') {
            value = value ? 'on' : 'off';
        }
        if (!this.kulDisabled && (value === 'off' || value === 'on')) {
            this.value = value;
            this.onKulEvent(e, 'change');
        }
    }
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        if (this.kulValue) {
            this.value = 'on';
        }
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#rippleSurface) {
            this.#kulManager.theme.ripple.setup(this.#rippleSurface);
        }
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const className = {
            toggle: true,
            'toggle--checked': this.#isOn(),
            'toggle--disabled': this.kulDisabled,
        };
        const formClassName = {
            'form-field': true,
            'form-field--align-end': this.kulLeadingLabel,
        };
        return (h(Host, { key: '5121cd1e1edf578cbadc12310dee1f1df943588b' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'b9010e62c0b5b7e12336a9a20789a9fe9d507321', id: KUL_WRAPPER_ID }, h("div", { key: '0b2e435cf5f6174be39e17e815247ecd38dd12b0', class: formClassName }, h("div", { key: 'a353fd122797388a0f3b9ccfd60f1e0ecbec643a', class: className }, h("div", { key: '707a4259117e7a43969cb9e482c461ee089b711d', class: "toggle__track" }), h("div", { key: '211e13818b2c5c53f4e8b9d6264b329e49da91ff', class: "toggle__thumb-underlay" }, h("div", { key: '8761108b9306f0aa03d87caefc486de52d4bf203', class: "toggle__thumb" }, h("div", { key: '461610173d4b7b4bc90cdecb7fe3aee5ae38b374', ref: (el) => {
                if (this.kulRipple) {
                    this.#rippleSurface = el;
                }
            } }), h("input", { key: '16c8284ea8873ff01f07186918760ed891a2dca8', class: "toggle__native-control", checked: this.#isOn(), "data-cy": KulDataCyAttributes.INPUT, disabled: this.kulDisabled, onBlur: (e) => {
                this.onKulEvent(e, 'blur');
            }, onChange: (e) => {
                this.#updateState(this.#isOn() ? 'off' : 'on', e);
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus');
            }, onPointerDown: (e) => {
                this.onKulEvent(e, 'pointerdown');
            }, role: "toggle", type: "checkbox", value: this.value ? 'on' : 'off' })))), h("label", { key: '337dddb33dcdf1866604fdd18b59b8ed045da470', class: "toggle__label", onClick: (e) => {
                this.onKulEvent(e, 'change');
            } }, this.kulLabel)))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulToggle.style = KulToggleStyle0;

export { KulToggle as kul_toggle };

//# sourceMappingURL=kul-toggle.entry.js.map