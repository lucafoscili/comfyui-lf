import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, a as getAssetPath, h, H as Host } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-6e71b245.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
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

const kulProgressbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_progressbar_border_radius:var(--kul-progressbar-border-radius, 4px);--kul_progressbar_font_family:var(\n    --kul-progressbar-font-family,\n    var(--kul-font-family)\n  );--kul_progressbar_font_size:var(\n    --kul-progressbar-font-size,\n    var(--kul-font-size)\n  );--kul_progressbar_height:var(--kul-progressbar-height, 2.5em);--kul_progressbar_primary_color:var(\n    --kul-progressbar-primary-color,\n    var(--kul-primary-color)\n  );--kul_progressbar_text_color:var(\n    --kul-progressbar-text-color,\n    var(--kul-text-color)\n  );--kul_progressbar_text_color_rgb:var(\n    --kul-progressbar-text-color-rgb,\n    var(--kul-text-color-rgb)\n  );--kul_progressbar_text_on_primary_color:var(\n    --kul-progressbar-text-on-primary-color,\n    var(--kul-text-on-primary-color)\n  );--kul_progressbar_track_color:var(\n    --kul-progressbar-track-color,\n    var(--kul-disabled-background-color)\n  );--kul_progressbar_width:var(--kul-progressbar-width, 100%)}:host{display:block;font-family:var(--kul_progressbar_font_family);font-size:var(--kul_progressbar_font_size);width:var(--kul_progressbar_width)}.progress-bar{background:var(--kul_progressbar_track_color);border-radius:var(--kul_progressbar_border_radius);height:var(--kul_progressbar_height);overflow:hidden;width:var(--kul_progressbar_width)}.progress-bar__icon{background:var(--kul_progressbar_text_color);height:1.5em;margin:0 0.25em;width:1.5em}.progress-bar__label{align-items:center;display:flex;height:100%;justify-content:center;left:0;min-width:max-content;position:absolute;top:0;width:100%}.progress-bar__mu{font-size:calc(var(--kul_progressbar_font_size) * 0.75)}.progress-bar__percentage{background:var(--kul_progressbar_primary_color);border-radius:var(--kul_progressbar_border_radius);box-sizing:border-box;color:var(--kul_progressbar_text_color);height:var(--kul_progressbar_height);padding:0.5em 0;position:relative;text-align:center;transition:width 0.2s ease;width:var(--kul_progressbar_percentage_width)}:host([kul-centered-label]) .progress-bar{position:relative}:host([kul-centered-label]) .progress-bar__percentage{position:static}:host([kul-is-radial]){box-sizing:border-box;margin:auto;padding:1.25em 0px}:host([kul-is-radial]) #kul-component{display:flex;font-size:10em;margin:auto}:host([kul-is-radial]) .progress-bar{background:none;height:1em;margin:auto;overflow:visible;position:relative;width:1em}:host([kul-is-radial]) .progress-bar:nth-child(3n+1){clear:both}:host([kul-is-radial]) .progress-bar .pie{height:1em;width:1em;clip:rect(0, 1em, 1em, 0.5em);left:0;position:absolute;top:0}:host([kul-is-radial]) .progress-bar .pie.has-value .half-circle{border-color:var(--kul_progressbar_primary_color)}:host([kul-is-radial]) .progress-bar .pie.has-value .half-circle.left-side{transform:var(--kul_progressbar_transform);transition:transform 0.2s ease}:host([kul-is-radial]) .progress-bar .pie.has-value.half-empty .right-side{display:none}:host([kul-is-radial]) .progress-bar .pie.has-value.half-full{clip:rect(auto, auto, auto, auto)}:host([kul-is-radial]) .progress-bar .pie.has-value.half-full .right-side{transform:rotate(180deg)}:host([kul-is-radial]) .progress-bar .pie .half-circle{height:1em;width:1em;border:0.1em solid var(--kul_progressbar_track_color);border-radius:50%;clip:rect(0, 0.5em, 1em, 0);left:0;position:absolute;top:0}:host([kul-is-radial]) .progress-bar__icon{height:0.75em;margin:0 0.15em;width:0.75em}:host([kul-is-radial]) .progress-bar__label{color:var(--kul_progressbar_text_color);cursor:default;display:flex;font-size:0.25em}:host([kul-is-radial]) .progress-bar__track{height:1em;width:1em;border:0.1em solid var(--kul_progressbar_track_color);border-radius:50%}:host([kul-is-radial]) .progress-bar__um{color:var(--kul_progressbar_text_color);font-size:0.75em;padding-bottom:0.75em}:host([kul-is-radial]) *,:host([kul-is-radial]) *:before,:host([kul-is-radial]) *:after{box-sizing:border-box}@keyframes running-stripes{0%{background-position:0 0}100%{background-position:3em 3em}}:host(.kul-animated) .progress-bar__percentage{animation:running-stripes 2s linear infinite;background-image:linear-gradient(-45deg, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 25%, transparent 25%, transparent 50%, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 50%, rgba(var(--kul_progressbar_text_color_rgb), 0.125) 75%, transparent 75%, transparent);background-size:3em 3em}:host(.kul-padded) .progress-bar{padding:0.5em;width:calc(100% - 1em)}:host(.kul-slim) #kul-component .progress-bar{--kul_progressbar_height:calc(\n    var(--kul-progressbar-height, 2.5em) * 0.5\n  );border-radius:9px}:host(.kul-slim) #kul-component .progress-bar__percentage{border-radius:9px;padding:0}:host(.kul-slim) #kul-component .progress-bar .pie .half-circle{border-width:0.05em}:host(.kul-slim) #kul-component .progress-bar__track{border-width:0.05em}:host(.kul-danger){--kul-progressbar-primary-color:var(--kul-danger-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-info){--kul-progressbar-primary-color:var(--kul-info-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-secondary){--kul-progressbar-primary-color:var(--kul-secondary-color);--kul-progressbar-text-on-primary-color:var(--kul-text-on-secondary-color)}:host(.kul-success){--kul-progressbar-primary-color:var(--kul-success-color);--kul-progressbar-text-on-primary-color:white}:host(.kul-warning){--kul-progressbar-primary-color:var(--kul-warning-color);--kul-progressbar-text-on-primary-color:white}";
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
        return (h(Host, { key: 'e3da6d6e7cee60d3fc8f6fd47b5500850d05835d' }, this.kulStyle && (h("style", { key: 'c01b7042f8cbb9912ddee16a0531631e6d42df7b', id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))), h("div", { key: 'd7fc51caf730e1fe642a1c11db9c5554fbc02573', id: KUL_WRAPPER_ID, style: style }, this.kulIsRadial
            ? this.#prepRadialBar()
            : this.#prepProgressBar())));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulProgressbar.style = KulProgressbarStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulTextfieldProps;
(function (KulTextfieldProps) {
    KulTextfieldProps["kulDisabled"] = "Enables or disables the text field to prevent user interaction.";
    KulTextfieldProps["kulFullWidth"] = "Applies a full-width styling to the text field, making it occupy all available horizontal space.";
    KulTextfieldProps["kulHelper"] = "Specifies helper text to display alongside the text field.";
    KulTextfieldProps["kulHtmlAttributes"] = "Allows customization of the input or textarea element through additional HTML attributes.";
    KulTextfieldProps["kulIcon"] = "Defines the icon to be displayed within the text field.";
    KulTextfieldProps["kulLabel"] = "Assigns a label to the text field, improving accessibility and providing context to the user about what kind of input is expected.";
    KulTextfieldProps["kulStyle"] = "Accepts custom CSS styles to apply directly to the text field component.";
    KulTextfieldProps["kulStyling"] = "Determines the overall styling theme of the text field, affecting its shape and border.";
    KulTextfieldProps["kulTrailingIcon"] = "Controls whether the icon should appear after the text input, typically used for action buttons like clear or search.";
    KulTextfieldProps["kulValue"] = "Initializes the text field with a default value when the component is first rendered.";
})(KulTextfieldProps || (KulTextfieldProps = {}));

const kulTextfieldCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_textfield_backdrop_filter:var(\n    --kul-textfield-backdrop-filter,\n    blur(3.5px)\n  );--kul_textfield_backdrop_filter_hover:var(\n    --kul-textfield-backdrop-filter-hover,\n    blur(5px)\n  );--kul_textfield_background_color:var(\n    --kul-textfield-background-color,\n    rgba(var(--kul-text-color-rgb), 0.125)\n  );--kul_textfield_background_color_hover:var(\n    --kul-textfield-background-color-hover,\n    rgba(var(--kul-text-color-rgb), 0.175)\n  );--kul_textfield_border_radius:var(--kul-textfield-border-radius, 4px);--kul_textfield_input_color:var(\n    --kul-textfield-input-color,\n    var(--kul-text-color)\n  );--kul_textfield_input_color_rgb:var(\n    --kul-textfield-input-color-rgb,\n    var(--kul-text-color-rgb)\n  );--kul_textfield_font_family:var(\n    --kul-textfield-font-family,\n    var(--kul-font-family)\n  );--kul_textfield_input_font_size:var(\n    --kul-textfield-input-font-size,\n    var(--kul-font-size)\n  );--kul_textfield_input_font_weight:var(\n    --kul-textfield-input-font-weight,\n    400\n  );--kul_textfield_label_color:var(\n    --kul-textfield-label-color,\n    rgba(var(--kul-text-color-rgb), 0.875)\n  );--kul_textfield_label_font_size:var(\n    --kul-textfield-label-font-size,\n    var(--kul-font-size)\n  );--kul_textfield_label_font_weight:var(\n    --kul-textfield-label-font-weight,\n    400\n  );--kul_textfield_padding:var(--kul-textfield-padding, 0 16px);--kul_textfield_primary_color:var(\n    --kul-textfield-primary-color,\n    var(--kul-primary-color)\n  );display:block;font-family:var(--kul-font-family);width:100%}.textfield{align-items:baseline;-webkit-backdrop-filter:var(--kul_textfield_backdrop_filter);backdrop-filter:var(--kul_textfield_backdrop_filter);background-color:var(--kul_textfield_background_color);border-radius:var(--kul_textfield_border_radius);box-sizing:border-box;display:inline-flex;height:56px;overflow:hidden;padding:var(--kul_textfield_padding);position:relative;transition:background-color 125ms ease;width:100%}.textfield--full-width{padding:0}.textfield--full-width.textfield--flat .textfield__input,.textfield--full-width.textfield--raised .textfield__input{padding-top:0}.textfield--has-icon{width:100%}.textfield--has-icon .textfield__label{left:20px}.textfield--has-label .textfield__label{display:inline-block}.textfield--outlined:hover .textfield__notched-outline__leading,.textfield--outlined:hover .textfield__notched-outline__notch,.textfield--outlined:hover .textfield__notched-outline__trailing,.textfield--outlined.textfield--focused .textfield__notched-outline__leading,.textfield--outlined.textfield--focused .textfield__notched-outline__notch,.textfield--outlined.textfield--focused .textfield__notched-outline__trailing,.textfield--textarea:hover .textfield__notched-outline__leading,.textfield--textarea:hover .textfield__notched-outline__notch,.textfield--textarea:hover .textfield__notched-outline__trailing,.textfield--textarea.textfield--focused .textfield__notched-outline__leading,.textfield--textarea.textfield--focused .textfield__notched-outline__notch,.textfield--textarea.textfield--focused .textfield__notched-outline__trailing{border-color:var(--kul_textfield_primary_color)}.textfield--outlined.textfield--focused .textfield__notched-outline__leading,.textfield--outlined.textfield--focused .textfield__notched-outline__notch,.textfield--outlined.textfield--focused .textfield__notched-outline__trailing,.textfield--textarea.textfield--focused .textfield__notched-outline__leading,.textfield--textarea.textfield--focused .textfield__notched-outline__notch,.textfield--textarea.textfield--focused .textfield__notched-outline__trailing{border-width:2px}.textfield--outlined{height:56px;overflow:visible}.textfield--outlined.textfield--has-icon .textfield__label{left:3em}.textfield--outlined.textfield--filled .textfield__label,.textfield--outlined.textfield--focused .textfield__label{-webkit-backdrop-filter:blur(15px);backdrop-filter:blur(15px);background-color:rgba(var(--kul-background-color-rgb), 0.75);border:1px solid rgba(var(--kul_textfield_input_color_rgb), 0.575);border-radius:8px;left:4px;padding:0.25em 1em;transform:scale(0.75) translateY(-3.25em)}.textfield--outlined.textfield--filled .textfield__label{border:1px solid rgba(var(--kul_textfield_input_color_rgb), 0.575)}.textfield--outlined.textfield--focused .textfield__label{border:1px solid rgba(var(--kul_textfield_primary_color_rgb), 0.575)}.textfield--outlined .textfield__input{background-color:transparent;border:none;display:flex;height:100%}.textfield--outlined .textfield__label{max-width:100%;position:relative}.textfield--filled .textfield__label,.textfield--focused .textfield__label{color:var(--kul_textfield_primary_color);font-weight:600}.textfield--disabled{-webkit-text-fill-color:var(--kul-disabled-color);background:var(--kul-disabled-background-color);color:var(--kul-disabled-color);pointer-events:none}.textfield--disabled .textfield__icon{background-color:var(--kul-disabled-color)}.textfield--focused,.textfield:hover{-webkit-backdrop-filter:var(--kul_textfield_backdrop_filter_hover);backdrop-filter:var(--kul_textfield_backdrop_filter_hover);background-color:var(--kul_textfield_background_color_hover)}.textfield--focused .textfield__line-ripple:after{width:100%}.textfield--flat{-webkit-backdrop-filter:none;backdrop-filter:none;background-color:transparent}.textfield--flat--focused,.textfield--flat:hover{-webkit-backdrop-filter:none;backdrop-filter:none;background-color:transparent}.textfield--flat.textfield--filled .textfield__label,.textfield--flat.textfield--focused .textfield__label,.textfield--raised.textfield--filled .textfield__label,.textfield--raised.textfield--focused .textfield__label{transform:translateY(-150%) scale(0.75)}.textfield--flat.textfield--has-icon .textfield__label,.textfield--raised.textfield--has-icon .textfield__label{left:3.75em}.textfield--flat .textfield__input,.textfield--raised .textfield__input{padding-top:0.75em}.textfield--flat .textfield__label,.textfield--raised .textfield__label{left:1.15em;right:initial}.textfield--textarea{align-items:center;flex-direction:column;height:auto;overflow:visible;padding:0;transition:none}.textfield--textarea .textfield__input{box-sizing:border-box;flex-grow:1;height:auto;line-height:1.5rem;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;padding:16px;resize:none;transform:translateX(1px) translateY(1px)}.textfield--textarea.textfield--filled .textfield__label,.textfield--textarea.textfield--focused .textfield__label{-webkit-backdrop-filter:blur(15px);backdrop-filter:blur(15px);background-color:rgba(var(--kul-background-color-rgb), 0.75);border:1px solid rgba(var(--kul_textfield_input_color_rgb), 0.575);border-radius:8px;padding:0.25em 1em;transform:scale(0.75) translateY(-4.25em)}.textfield--textarea .textfield__label{left:4px;position:relative;top:42px}.textfield__input,.textfield__label{box-sizing:border-box;font-family:var(--kul_textfield_font_family)}.textfield__icon{align-self:center;background-color:var(--kul_textfield_input_color);cursor:pointer;height:1.75em;outline:none;padding:0 0.5em;width:1.75em}.textfield__input{appearance:none;background:none;border:none;border-radius:0;box-sizing:border-box;caret-color:var(--kul_textfield_primary_color);color:var(--kul_textfield_input_color);font-size:var(--kul_textfield_input_font_size);font-weight:var(--kul_textfield_font_weight);height:100%;letter-spacing:0.009375em;min-width:0;outline:none;text-decoration:inherit;text-transform:inherit;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%}.textfield__label{color:var(--kul_textfield_label_color);cursor:text;display:none;font-size:var(--kul_textfield_label_font_size);font-weight:400;left:4px;letter-spacing:0.009375em;line-height:1.15em;overflow:hidden;pointer-events:none;position:absolute;right:initial;text-align:left;text-decoration:inherit;text-overflow:ellipsis;text-transform:inherit;top:50%;transform:translateY(-50%);transform-origin:left top;transition:all 125ms cubic-bezier(0.4, 0, 0.2, 1);white-space:nowrap}.textfield__notched-outline{box-sizing:border-box;display:flex;height:100%;left:0;max-width:100%;opacity:1;pointer-events:none;position:absolute;right:0;text-align:left;top:0;width:100%;z-index:1}.textfield__notched-outline__leading,.textfield__notched-outline__notch,.textfield__notched-outline__trailing{border-bottom:1px solid;border-top:1px solid;border-color:rgba(var(--kul_textfield_input_color_rgb), 0.575);box-sizing:border-box;height:100%;pointer-events:none}.textfield__notched-outline__leading{border-bottom-left-radius:4px;border-bottom-right-radius:0;border-bottom-style:inset;border-left:1px solid;border-right:none;border-top-left-radius:4px;border-top-right-radius:0;width:12px}.textfield__notched-outline__notch{border-bottom-style:inset;flex:0 0 auto;width:auto;max-width:calc(100% - 24px)}.textfield__notched-outline__trailing{border-bottom-left-radius:0;border-bottom-right-radius:4px;border-bottom-style:inset;border-left:none;border-right:1px solid;border-top-left-radius:0;border-top-right-radius:4px;flex-grow:1}.textfield__line-ripple:before,.textfield__line-ripple:after{border-radius:2px;bottom:0;content:\"\";height:2px;left:0;position:absolute}.textfield__line-ripple:before{background-color:rgba(var(--kul_textfield_input_color_rgb), 0.225);width:100%}.textfield__line-ripple:after{background-color:var(--kul_textfield_primary_color);transition:width 125ms ease;width:0}.textfield__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both;transform:translateX(-1px) translateY(-1px)}.textfield__helper-text{font-family:var(--kul_textfield_font_family);line-height:1.25em;display:block;font-size:0.75em;font-weight:400;letter-spacing:0.0333333333em;line-height:normal;margin:0;margin-top:0;opacity:0;text-decoration:inherit;text-transform:inherit;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);will-change:opacity}.textfield__helper-text--persistent{transition:none;opacity:1;will-change:initial}.textfield__helper-line{display:flex;justify-content:space-between;box-sizing:border-box;padding-right:16px;padding-left:16px}:host(.kul-full-height){height:100%}:host(.kul-full-height) #kul-component,:host(.kul-full-height) .textfield{height:100%}:host(.kul-danger){--kul-textfield-primary-color:var(--kul-danger-color)}:host(.kul-info){--kul-textfield-primary-color:var(--kul-info-color)}:host(.kul-secondary){--kul-textfield-primary-color:var(--kul-secondary-color)}:host(.kul-success){--kul-textfield-primary-color:var(--kul-success-color)}:host(.kul-warning){--kul-textfield-primary-color:var(--kul-warning-color)}";
const KulTextfieldStyle0 = kulTextfieldCss;

const KulTextfield = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-textfield-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.status = new Set();
        this.value = '';
        this.kulDisabled = false;
        this.kulFullWidth = false;
        this.kulHelper = null;
        this.kulHtmlAttributes = {};
        this.kulIcon = '';
        this.kulLabel = '';
        this.kulStyle = '';
        this.kulStyling = 'raised';
        this.kulTrailingIcon = false;
        this.kulValue = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #hasOutline;
    #input;
    #kulManager = kulManagerInstance();
    #maxLength;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        const target = e.target;
        const inputValue = target?.value;
        switch (eventType) {
            case 'blur':
                this.status.delete('focused');
                this.status = new Set(this.status);
                break;
            case 'focus':
                this.status.add('focused');
                this.status = new Set(this.status);
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            inputValue,
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
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulTextfieldProps, descriptions);
    }
    /**
     * Used to retrieve the component's current state.
     * @returns {Promise<string>} Promise resolved with the current state of the component.
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
     * Blurs the input element.
     */
    async setBlur() {
        this.#input.blur();
    }
    /**
     * Focuses the input element.
     */
    async setFocus() {
        this.#input.focus();
    }
    /**
     * Sets the component's state.
     * @param {string} value - The new state to be set on the component.
     * @returns {Promise<void>}
     */
    async setValue(value) {
        this.#updateState(value);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #updateState(value, e = new CustomEvent('change')) {
        if (!this.kulDisabled) {
            this.value = value;
            this.onKulEvent(e, 'change');
        }
    }
    #outlineCheck() {
        return this.kulStyling === 'outlined' || this.kulStyling === 'textarea';
    }
    #prepCounter() {
        if (!this.#maxLength) {
            return;
        }
        return (h("div", { class: "textfield__character-counter" }, "'0 / ' + ", this.#maxLength.toString()));
    }
    #prepHelper() {
        if (!this.kulHelper) {
            return;
        }
        const classList = {
            'textfield__helper-text': true,
            'textfield__helper-text--persistent': !this.kulHelper.showWhenFocused,
        };
        return (h("div", { class: "textfield__helper-line" }, h("div", { class: classList }, this.kulHelper.value), this.kulStyling !== 'textarea'
            ? this.#prepCounter()
            : undefined));
    }
    #prepIcon() {
        if (!this.kulIcon) {
            return;
        }
        const path = getAssetPath(`./assets/svg/${this.kulIcon}.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return (h("div", { class: "textfield__icon", onClick: () => { }, style: style }));
    }
    #prepInput() {
        return (h("input", { ...this.kulHtmlAttributes, class: "textfield__input", "data-cy": KulDataCyAttributes.INPUT, disabled: this.kulDisabled, onBlur: (e) => {
                this.onKulEvent(e, 'blur');
            }, onChange: (e) => {
                this.#updateState(e.currentTarget.value);
            }, onClick: (e) => {
                this.onKulEvent(e, 'click');
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus');
            }, onInput: (e) => {
                this.onKulEvent(e, 'input');
            }, placeholder: this.kulFullWidth ? this.kulLabel : undefined, ref: (el) => {
                if (el) {
                    this.#input = el;
                }
            }, value: this.value }));
    }
    #prepLabel() {
        if (this.kulFullWidth) {
            return;
        }
        const labelEl = (h("label", { class: "textfield__label", htmlFor: "input" }, this.kulLabel));
        if (this.#hasOutline) {
            return (h("div", { class: "textfield__notched-outline" }, h("div", { class: "textfield__notched-outline__leading" }), h("div", { class: "textfield__notched-outline__notch" }, labelEl), h("div", { class: "textfield__notched-outline__trailing" })));
        }
        return labelEl;
    }
    #prepRipple() {
        return (!this.#hasOutline && h("span", { class: "textfield__line-ripple" }));
    }
    #prepTextArea() {
        return (h("span", { class: "textfield__resizer" }, h("textarea", { ...this.kulHtmlAttributes, class: "textfield__input", "data-cy": KulDataCyAttributes.INPUT, disabled: this.kulDisabled, id: "input", onBlur: (e) => {
                this.onKulEvent(e, 'blur');
            }, onChange: (e) => {
                this.#updateState(e.currentTarget.value);
            }, onClick: (e) => {
                this.onKulEvent(e, 'click');
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus');
            }, onInput: (e) => {
                this.onKulEvent(e, 'input');
            }, ref: (el) => {
                if (el) {
                    this.#input = el;
                }
            }, value: this.value })));
    }
    #updateStatus() {
        const propertiesToUpdateStatus = [
            { prop: 'value', status: 'filled' },
            { prop: 'kulDisabled', status: 'disabled' },
            { prop: 'kulFullWidth', status: 'full-width' },
            { prop: 'kulIcon', status: 'has-icon' },
            { prop: 'kulLabel', status: 'has-label' },
        ];
        propertiesToUpdateStatus.forEach(({ prop, status }) => {
            const propName = prop;
            const propValue = this[propName];
            if (propValue) {
                this.status.add(status);
            }
            else {
                this.status.delete(status);
            }
        });
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (this.kulValue) {
            this.status.add('filled');
            this.value = this.kulValue;
        }
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
        this.#hasOutline = this.#outlineCheck();
        this.#maxLength = this.kulHtmlAttributes?.maxLength;
        this.#updateStatus();
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        const classList = ['textfield', 'textfield--' + this.kulStyling];
        this.status.forEach((status) => {
            classList.push(`textfield--${status}`);
        });
        return (h(Host, { key: '471474f3e057f40832f8d9342b988afa480cfc89' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '0eeaa32f5313800d5fbf9e1ca20a77c5dc9d096d', id: KUL_WRAPPER_ID }, h("div", { key: '69b1bf3fc35deede97c867b1145802cc79bd1e7e', class: classList.join(' ') }, this.kulStyling === 'textarea'
            ? [
                this.#prepCounter(),
                this.#prepIcon(),
                this.#prepTextArea(),
                this.#prepLabel(),
            ]
            : [
                this.#prepIcon(),
                this.#prepInput(),
                this.#prepLabel(),
                this.#prepRipple(),
                this.kulFullWidth
                    ? undefined
                    : this.#prepHelper(),
            ]), this.kulFullWidth ? this.#prepHelper() : undefined)));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulTextfield.style = KulTextfieldStyle0;

export { KulProgressbar as kul_progressbar, KulTextfield as kul_textfield };

//# sourceMappingURL=kul-progressbar_2.entry.js.map