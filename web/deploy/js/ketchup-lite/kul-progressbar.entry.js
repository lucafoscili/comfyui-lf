import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, a as getAssetPath, h, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-dc9a333c.js';

var KulProgressbarProps;
(function (KulProgressbarProps) {
    KulProgressbarProps["kulCenteredLabel"] = "Displays the label in the middle of the progress bar. It's the default for the radial variant and can't be changed.";
    KulProgressbarProps["kulIcon"] = "Specifies an icon to replace the label.";
    KulProgressbarProps["kulIsRadial"] = "Radial version.";
    KulProgressbarProps["kulLabel"] = "Specifies a text for the bar's label.";
    KulProgressbarProps["kulShowLabel"] = "Flag to show or hide the progress bar's label.";
    KulProgressbarProps["kulStyle"] = "Custom style of the component.";
    KulProgressbarProps["kulValue"] = "The current value the progress bar must display.";
})(KulProgressbarProps || (KulProgressbarProps = {}));

const kulProgressbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_progressbar_border_radius:var(--kul-progressbar-border-radius, 4px);--kul_progressbar_font_family:var(\n    --kul-progressbar-font-family,\n    var(--kul-font-family)\n  );--kul_progressbar_font_size:var(\n    --kul-progressbar-font-size,\n    var(--kul-font-size)\n  );--kul_progressbar_height:var(--kul-progressbar-height, 2.5em);--kul_progressbar_primary_color:var(\n    --kul-progressbar-primary-color,\n    var(--kul-primary-color)\n  );--kul_progressbar_text_color:var(\n    --kul-progressbar-text-color,\n    var(--kul-text-color)\n  );--kul_progressbar_text_color_rgb:var(\n    --kul-progressbar-text-color-rgb,\n    var(--kul-text-color-rgb)\n  );--kul_progressbar_text_on_primary_color:var(\n    --kul-progressbar-text-on-primary-color,\n    var(--kul-text-on-primary-color)\n  );--kul_progressbar_track_color:var(\n    --kul-progressbar-track-color,\n    var(--kul-disabled-background-color)\n  );--kul_progressbar_width:var(--kul-progressbar-width, 100%)}:host{display:block;font-family:var(--kul_progressbar_font_family);font-size:var(--kul_progressbar_font_size);width:var(--kul_progressbar_width)}.progress-bar{background:var(--kul_progressbar_track_color);border-radius:var(--kul_progressbar_border_radius);height:var(--kul_progressbar_height);overflow:hidden;width:var(--kul_progressbar_width)}.progress-bar__icon{background:var(--kul_progressbar_text_color);height:1.5em;margin:0 0.25em;width:1.5em}.progress-bar__label{align-items:center;display:flex;height:100%;justify-content:center;left:0;min-width:max-content;position:absolute;top:0;width:100%}.progress-bar__mu{font-size:calc(var(--kul_progressbar_font_size) * 0.75)}.progress-bar__percentage{background:var(--kul_progressbar_primary_color);border-radius:var(--kul_progressbar_border_radius);box-sizing:border-box;color:var(--kul_progressbar_text_color);height:var(--kul_progressbar_height);padding:0.5em 0;position:relative;text-align:center;transition:width 0.2s ease;width:var(--kul_progressbar_percentage_width)}:host([kul-centered-label]) .progress-bar{position:relative}:host([kul-centered-label]) .progress-bar__percentage{position:static}:host([kul-is-radial]){box-sizing:border-box;margin:auto;padding:1.25em 0px}:host([kul-is-radial]) #kul-component{display:flex;font-size:10em;margin:auto}:host([kul-is-radial]) .progress-bar{background:none;height:1em;margin:auto;overflow:visible;position:relative;width:1em}:host([kul-is-radial]) .progress-bar:nth-child(3n+1){clear:both}:host([kul-is-radial]) .progress-bar .pie{height:1em;width:1em;clip:rect(0, 1em, 1em, 0.5em);left:0;position:absolute;top:0}:host([kul-is-radial]) .progress-bar .pie.has-value .half-circle{border-color:var(--kul_progressbar_primary_color)}:host([kul-is-radial]) .progress-bar .pie.has-value .half-circle.left-side{transform:var(--kul_progressbar_transform);transition:transform 0.2s ease}:host([kul-is-radial]) .progress-bar .pie.has-value.half-empty .right-side{display:none}:host([kul-is-radial]) .progress-bar .pie.has-value.half-full{clip:rect(auto, auto, auto, auto)}:host([kul-is-radial]) .progress-bar .pie.has-value.half-full .right-side{transform:rotate(180deg)}:host([kul-is-radial]) .progress-bar .pie .half-circle{height:1em;width:1em;border:0.1em solid var(--kul_progressbar_track_color);border-radius:50%;clip:rect(0, 0.5em, 1em, 0);left:0;position:absolute;top:0}:host([kul-is-radial]) .progress-bar__icon{height:0.75em;margin:0 0.15em;width:0.75em}:host([kul-is-radial]) .progress-bar__label{color:var(--kul_progressbar_text_color);cursor:default;display:flex;font-size:0.25em}:host([kul-is-radial]) .progress-bar__track{height:1em;width:1em;border:0.1em solid var(--kul_progressbar_track_color);border-radius:50%}:host([kul-is-radial]) .progress-bar__um{color:var(--kul_progressbar_text_color);font-size:0.75em;padding-bottom:0.75em}:host([kul-is-radial]) *,:host([kul-is-radial]) *:before,:host([kul-is-radial]) *:after{box-sizing:border-box}@keyframes running-stripes{0%{background-position:0 0}100%{background-position:3em 3em}}:host(.kul-animated) .progress-bar__percentage{animation:running-stripes 2s linear infinite;background-image:linear-gradient(-45deg, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 25%, transparent 25%, transparent 50%, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 50%, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 75%, transparent 75%, transparent);background-size:3em 3em}:host(.kul-padded) .progress-bar{padding:0.5em;width:calc(100% - 1em)}:host(.kul-slim) #kul-component .progress-bar{--kul_progressbar_height:calc(\n    var(--kul-progressbar-height, 2.5em) * 0.5\n  );border-radius:9px}:host(.kul-slim) #kul-component .progress-bar__percentage{border-radius:9px;padding:0}:host(.kul-slim) #kul-component .progress-bar .pie .half-circle{border-width:0.05em}:host(.kul-slim) #kul-component .progress-bar__track{border-width:0.05em}:host(.kul-danger){--kul-progressbar-primary-color:var(--kul-danger-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-info){--kul-progressbar-primary-color:var(--kul-info-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-secondary){--kul-progressbar-primary-color:var(--kul-secondary-color);--kul-progressbar-text-on-primary-color:var(--kul-text-on-secondary-color)}:host(.kul-success){--kul-progressbar-primary-color:var(--kul-success-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-warning){--kul-progressbar-primary-color:var(--kul-warning-color);--kul-progressbar-text-on-primary-color:white}";
const KulProgressbarStyle0 = kulProgressbarCss;

const KulProgressbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-progressbar-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulCenteredLabel = false;
        this.kulIcon = '';
        this.kulIsRadial = false;
        this.kulLabel = '';
        this.kulStyle = '';
        this.kulValue = 0;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves to a KulDebugComponentInfo object containing debug information.
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
        return getProps(this, KulProgressbarProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepIcon() {
        const path = getAssetPath(`./assets/svg/${this.kulIcon}.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return h("div", { class: "progress-bar__icon", style: style });
    }
    #prepLabel() {
        const label = this.kulLabel
            ? [h("div", { class: "progress-bar__text" }, this.kulLabel)]
            : [
                h("div", { class: "progress-bar__text" }, this.kulValue),
                h("div", { class: "progress-bar__mu" }, "%"),
            ];
        return (h("div", { class: "progress-bar__label" }, this.kulIcon && this.#prepIcon(), label));
    }
    #prepProgressBar() {
        return (h("div", { class: 'progress-bar' }, h("div", { class: "progress-bar__percentage" }, this.#prepLabel())));
    }
    #prepRadialBar() {
        return (h("div", { class: 'progress-bar' }, this.#prepLabel(), h("div", { class: `pie ${this.kulValue ? 'has-value' : ''}  ${this.kulValue > 50 ? 'half-full' : 'half-empty'}` }, h("div", { class: "left-side half-circle" }), h("div", { class: "right-side half-circle" })), h("div", { class: "progress-bar__track" })));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
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
        const style = {
            ['--kul_progressbar_percentage_width']: `${this.kulValue}%`,
            ['--kul_progressbar_transform']: `rotate(${this.kulValue * 3.6}deg)`,
        };
        return (h(Host, { key: 'f6a97c0e4caa8007ff0f4d60ba69cf6ede8dbbc5' }, this.kulStyle && (h("style", { key: '1a2d9f54458f18c5105b9234e7eac5624c579f81', id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))), h("div", { key: '59b3bd56034db0a5a91ad6b00f6b3d67ee4c9e54', id: KUL_WRAPPER_ID, style: style }, this.kulIsRadial
            ? this.#prepRadialBar()
            : this.#prepProgressBar())));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulProgressbar.style = KulProgressbarStyle0;

export { KulProgressbar as kul_progressbar };
