import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement } from './index-64e8bec6.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, K as KulDataCyAttributes, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
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
var _KulToggle_instances, _KulToggle_kulManager, _KulToggle_rippleSurface, _KulToggle_isOn, _KulToggle_updateState;
const KulToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-toggle-event", 6);
        _KulToggle_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulToggle_kulManager.set(this, kulManagerInstance());
        _KulToggle_rippleSurface.set(this, void 0);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = "off";
        this.kulDisabled = false;
        this.kulLabel = "";
        this.kulLeadingLabel = false;
        this.kulRipple = true;
        this.kulStyle = "";
        this.kulValue = false;
    }
    onKulEvent(e, eventType) {
        switch (eventType) {
            case "pointerdown":
                if (this.kulRipple) {
                    __classPrivateFieldGet(this, _KulToggle_kulManager, "f").theme.ripple.trigger(e, __classPrivateFieldGet(this, _KulToggle_rippleSurface, "f"));
                }
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            value: this.value,
            valueAsBoolean: this.value === "on" ? true : false,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
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
        __classPrivateFieldGet(this, _KulToggle_instances, "m", _KulToggle_updateState).call(this, value);
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
        if (this.kulValue) {
            this.value = "on";
        }
        __classPrivateFieldGet(this, _KulToggle_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        if (__classPrivateFieldGet(this, _KulToggle_rippleSurface, "f")) {
            __classPrivateFieldGet(this, _KulToggle_kulManager, "f").theme.ripple.setup(__classPrivateFieldGet(this, _KulToggle_rippleSurface, "f"));
        }
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulToggle_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulToggle_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulToggle_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        const className = {
            toggle: true,
            "toggle--checked": __classPrivateFieldGet(this, _KulToggle_instances, "m", _KulToggle_isOn).call(this),
            "toggle--disabled": this.kulDisabled,
        };
        const formClassName = {
            "form-field": true,
            "form-field--align-end": this.kulLeadingLabel,
        };
        return (h(Host, { key: '99e1341c1d38b69d68a45a467b5b13eae3557535' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulToggle_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'c41c6f9addb9ef045c667d65870e4eb68edc55ca', id: KUL_WRAPPER_ID }, h("div", { key: '647969081b398832704d37d5dfcefd294ec7559e', class: formClassName }, h("div", { key: 'aa6aecb8c83d6b23dbc667b4cb72551a638098d1', class: className }, h("div", { key: 'a4080642754c0594ba8b1a4d35e4bc4162119b28', class: "toggle__track" }), h("div", { key: '4207fda40cf213eaac7a046b6f7d281cceb3dc49', class: "toggle__thumb-underlay" }, h("div", { key: '3eef020f3383ef8cd43c453811d4c56cb8fdbe46', class: "toggle__thumb" }, h("div", { key: '86fa942e392e09f03f0acc65fd6329a0a27fc91f', ref: (el) => {
                if (this.kulRipple) {
                    __classPrivateFieldSet(this, _KulToggle_rippleSurface, el, "f");
                }
            } }), h("input", { key: '60ebee061986fffa00d226faddb5e6bce520706b', class: "toggle__native-control", checked: __classPrivateFieldGet(this, _KulToggle_instances, "m", _KulToggle_isOn).call(this), "data-cy": KulDataCyAttributes.INPUT, disabled: this.kulDisabled, onBlur: (e) => {
                this.onKulEvent(e, "blur");
            }, onChange: (e) => {
                __classPrivateFieldGet(this, _KulToggle_instances, "m", _KulToggle_updateState).call(this, __classPrivateFieldGet(this, _KulToggle_instances, "m", _KulToggle_isOn).call(this) ? "off" : "on", e);
            }, onFocus: (e) => {
                this.onKulEvent(e, "focus");
            }, onPointerDown: (e) => {
                this.onKulEvent(e, "pointerdown");
            }, role: "toggle", type: "checkbox", value: this.value ? "on" : "off" })))), h("label", { key: 'a5926204642ba7708244efd2413584f795240e3d', class: "toggle__label", onClick: (e) => {
                this.onKulEvent(e, "change");
            } }, this.kulLabel)))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulToggle_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
};
_KulToggle_kulManager = new WeakMap(), _KulToggle_rippleSurface = new WeakMap(), _KulToggle_instances = new WeakSet(), _KulToggle_isOn = function _KulToggle_isOn() {
    return this.value === "on" ? true : false;
}, _KulToggle_updateState = function _KulToggle_updateState(value, e = new CustomEvent("change")) {
    if (typeof value === "boolean") {
        value = value ? "on" : "off";
    }
    if (!this.kulDisabled && (value === "off" || value === "on")) {
        this.value = value;
        this.onKulEvent(e, "change");
    }
};
KulToggle.style = KulToggleStyle0;

export { KulToggle as kul_toggle };

//# sourceMappingURL=kul-toggle.entry.js.map