import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-9aa60797.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-ed681a28.js';

var KulSwitchProps;
(function (KulSwitchProps) {
    KulSwitchProps["kulDisabled"] = "When true, the component is disabled.";
    KulSwitchProps["kulLabel"] = "Defines text to display along with the switch.";
    KulSwitchProps["kulLeadingLabel"] = " Defaults at false. When set to true, the label will be displayed before the component";
    KulSwitchProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulSwitchProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulSwitchProps["kulValue"] = "If true, the button is marked as checked.";
})(KulSwitchProps || (KulSwitchProps = {}));

const kulSwitchCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_switch_font_family:var(\n    --kul-switch-font-family,\n    var(--kul-font-family)\n  );--kul_switch_font_size:var(--kul-switch-font-size, var(--kul-font-size));--kul_switch_font_weight:var(--kul-switch-font-weight, 400);--kul_switch_label_color:var(\n    --kul-switch-label-color,\n    var(--kul-text-color)\n  );--kul_switch_primary_color:var(\n    --kul-switch-primary-color,\n    var(--kul-primary-color)\n  );--kul_switch_primary_color_rgb:var(\n    --kul-switch-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_switch_thumb_color:var(\n    --kul-switch-thumb-color,\n    var(--kul-border-color)\n  );display:block;font-family:var(--kul_switch_font_family);font-size:var(--kul_switch_font_size)}.form-field{font-size:0.875em;line-height:2em;font-weight:var(--kul_switch_font_weight);letter-spacing:0.0178571429em;color:var(--kul_switch_label_color);display:inline-flex;align-items:center;vertical-align:middle}.form-field--align-end .switch__label{margin-left:auto;margin-right:0px;padding-left:0px;padding-right:4px;order:-1}.form-field__label{color:var(--kul_switch_label_color);cursor:pointer;font-family:var(--kul-font-family);margin-left:0px;margin-right:auto;order:0;padding-left:4px;padding-right:0px;user-select:none}.switch{display:inline-block;position:relative;outline:none;user-select:none;margin:0 0.75em}.switch--disabled{cursor:auto;opacity:0.5;pointer-events:none}.switch--checked .switch__track{background-color:var(--kul_switch_primary_color);opacity:0.54}.switch--checked .switch__thumb-underlay{transform:translateX(16px)}.switch--checked .switch__thumb{background-color:var(--kul_switch_primary_color);border-color:var(--kul_switch_primary_color)}.switch--checked .switch__thumb .switch__native-control{transform:translateX(-16px)}.switch__track{box-sizing:border-box;width:36px;height:14px;border:1px solid transparent;border-radius:7px;opacity:0.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.switch__thumb-underlay{border-radius:50%;display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), border-color 90ms cubic-bezier(0.4, 0, 0.2, 1);left:-14px;right:initial;top:-16px;width:48px;height:48px}.switch__thumb-underlay:hover{background-color:rgba(var(--kul_switch_primary_color_rgb), 0.125)}.switch__thumb{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;z-index:1;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1), background-color 90ms cubic-bezier(0.4, 0, 0.2, 1), border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1);width:64px;height:48px}.switch:not(.switch--checked) .switch__track{background-color:var(--kul_switch_label_color)}.switch:not(.switch--checked) .switch__thumb{background-color:var(--kul_switch_thumb_color);border-color:var(--kul_switch_thumb_color)}:host(.kul-danger){--kul-switch-primary-color:var(--kul-danger-color);--kul-switch-primary-color-rgb:var(--kul-danger-color-rgb)}:host(.kul-info){--kul-switch-primary-color:var(--kul-info-color);--kul-switch-primary-color-rgb:var(--kul-info-color-rgb)}:host(.kul-secondary){--kul-switch-primary-color:var(--kul-secondary-color);--kul-switch-primary-color-rgb:var(--kul-secondary-color-rgb)}:host(.kul-success){--kul-switch-primary-color:var(--kul-success-color);--kul-switch-primary-color-rgb:var(--kul-success-color-rgb)}:host(.kul-warning){--kul-switch-primary-color:var(--kul-warning-color);--kul-switch-primary-color-rgb:var(--kul-warning-color-rgb)}";
const KulSwitchStyle0 = kulSwitchCss;

const KulSwitch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-switch-event", 6);
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
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #rippleSurface;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted for various switch interactions like click, focus, blur.
     */
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
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
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
        return getProps(this, KulSwitchProps, descriptions);
    }
    /**
     * Used to retrieve the component's current state.
     * @returns {Promise<KulSwitchState>} Promise resolved with the current state of the component.
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
     * @param {KulSwitchState} value - The new state to be set on the component.
     * @returns {Promise<void>}
     */
    async setValue(value) {
        this.#updateState(value);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #isOn() {
        return this.value === 'on' ? true : false;
    }
    #updateState(value, e = new CustomEvent('change')) {
        if (!this.kulDisabled && (value === 'off' || value === 'on')) {
            this.value = value;
            this.onKulEvent(e, 'change');
        }
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
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
            switch: true,
            'switch--checked': this.#isOn(),
            'switch--disabled': this.kulDisabled,
        };
        const formClassName = {
            'form-field': true,
            'form-field--align-end': this.kulLeadingLabel,
        };
        return (h(Host, { key: 'fcf38a96b44416df91e138007171e3d98e61544d' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '406a8cd0760d6a85a891670975d0aa29afe343fc', id: KUL_WRAPPER_ID }, h("div", { key: '247852f3755865c06af75794309458c23bab3003', class: formClassName }, h("div", { key: '401751930e12ccc27c88ea53252de821ece78d9a', class: className }, h("div", { key: '438046e78f069a04b7c711f02a4ab66710c79000', class: "switch__track" }), h("div", { key: '31d54b73e3aca1572fe2a345bd78a4281ac2bdf3', class: "switch__thumb-underlay" }, h("div", { key: '41228d3ee5b545ef70f18d3b6e123ea0f16392af', class: "switch__thumb" }, h("div", { key: 'bb176ea550a4012ac59f2d6dbd817890c3d2b653', ref: (el) => {
                if (this.kulRipple) {
                    this.#rippleSurface = el;
                }
            } }), h("input", { key: '6edfee9c4852ccf8e92df123d509cfdf59cc6b82', class: "switch__native-control", checked: this.#isOn(), "data-cy": KulDataCyAttributes.INPUT, disabled: this.kulDisabled, onBlur: (e) => {
                this.onKulEvent(e, 'blur');
            }, onChange: (e) => {
                this.#updateState(this.#isOn() ? 'off' : 'on', e);
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus');
            }, onPointerDown: (e) => {
                this.onKulEvent(e, 'pointerdown');
            }, role: "switch", type: "checkbox", value: this.value ? 'on' : 'off' })))), h("label", { key: '156614555984002a7b851d9ee0773194f6a8c1db', class: "switch__label", onClick: (e) => {
                this.onKulEvent(e, 'change');
            } }, this.kulLabel)))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulSwitch.style = KulSwitchStyle0;

export { KulSwitch as kul_switch };
