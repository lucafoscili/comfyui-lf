import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host, F as Fragment, a as getAssetPath } from './index-4ebcb21f.js';
import { k as kulManagerInstance, c as KulThemeColorValues, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID, g as KUL_DROPDOWN_CLASS_VISIBLE, h as KulDynamicPositionPlacement, i as KUL_DROPDOWN_CLASS, a as KulDataCyAttributes, C as CSS_VAR_PREFIX, f as KulLanguageGeneric } from './kul-manager-74b8aa66.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulBadgeProps;
(function (KulBadgeProps) {
    KulBadgeProps["kulImageProps"] = "The props of the image displayed inside the badge.";
    KulBadgeProps["kulLabel"] = "The text displayed inside the badge.";
    KulBadgeProps["kulStyle"] = "Custom style of the component.";
})(KulBadgeProps || (KulBadgeProps = {}));

const kulBadgeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_badge_border_radius:var(--kul-badge-border-radius, 30px);--kul_badge_font_family:var(--kul-badge-font-family, var(--kul-font-family));--kul_badge_font_size:var(--kul-badge-font-size, var(--kul-font-size));--kul_badge_min_size:var(--kul-badge-min-size, 1.5em);--kul_badge_padding:var(--kul-badge-padding, 0.25em);--kul_badge_primary_color:var(\n    --kul-badge-primary-color,\n    var(--kul-primary-color)\n  );--kul_badge_text_on_primary_color:var(\n    --kul-badge-text-on-primary-color,\n    var(--kul-text-on-primary-color)\n  );display:block;font-family:var(--kul_badge_font_family);font-size:var(--kul_badge_font_size);position:absolute;top:0;left:0;transform:translate(-50%, -50%)}#kul-component{background-color:var(--kul_badge_primary_color);border-radius:var(--kul_badge_border_radius);color:var(--kul_badge_text_on_primary_color);font-size:0.875em;min-height:var(--kul_badge_min_size);min-width:var(--kul_badge_min_size);padding:var(--kul_badge_padding);text-align:center}kul-image{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%)}:host(.kul-top-right){bottom:unset;left:unset;right:0;top:0;transform:translate(50%, -50%)}:host(.kul-bottom-right){bottom:0;left:unset;right:0;top:unset;transform:translate(50%, 50%)}:host(.kul-bottom-left){bottom:0;left:0;right:unset;top:unset;transform:translate(-50%, 50%)}:host(.kul-danger){--kul-badge-primary-color:var(--kul-danger-color);--kul-badge-text-on-primary-color:white}:host(.kul-info){--kul-badge-primary-color:var(--kul-info-color);--kul-badge-text-on-primary-color:white}:host(.kul-secondary){--kul-badge-primary-color:var(--kul-secondary-color);--kul-badge-text-on-primary-color:var(--kul-text-on-secondary-color)}:host(.kul-success){--kul-badge-primary-color:var(--kul-success-color);--kul-badge-text-on-primary-color:white}:host(.kul-warning){--kul-badge-primary-color:var(--kul-warning-color);--kul-badge-text-on-primary-color:white}";
const KulBadgeStyle0 = kulBadgeCss;

const KulBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-badge-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulImageProps = null;
        this.kulLabel = '';
        this.kulStyle = '';
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
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
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
        return getProps(this, KulBadgeProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
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
        let imageEl = null;
        if (!this.kulLabel && this.kulImageProps) {
            if (!this.kulImageProps.kulColor) {
                this.kulImageProps.kulColor = `var(${KulThemeColorValues.TEXT_ON_PRIMARY})`;
            }
            imageEl = h("kul-image", { key: '854661916f5cb1bd1443f42e0e08ce9c1cc8ce7e', ...this.kulImageProps });
        }
        return (h(Host, { key: '4100fc0f5ad4d0a4f8a93501009d107af5e2f273' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '7747a710d13277fc05b5d3e2cd7f1ca203209f95', id: KUL_WRAPPER_ID, onClick: (e) => this.onKulEvent(e, 'click') }, this.kulLabel, imageEl)));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulBadge.style = KulBadgeStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulButtonProps;
(function (KulButtonProps) {
    KulButtonProps["kulData"] = "Actual data of the button, used to render dropdown buttons.";
    KulButtonProps["kulDisabled"] = "When true, the component is disabled.";
    KulButtonProps["kulIcon"] = "Specifies an icon to display.";
    KulButtonProps["kulIconOff"] = "Icon to be used for the off state when the button is toggable.";
    KulButtonProps["kulLabel"] = "Defines text to display on the button.";
    KulButtonProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulButtonProps["kulShowSpinner"] = "When true, a spinner will be shown on the button.";
    KulButtonProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulButtonProps["kulStyling"] = "Defines the button appearance. Possible values are \"flat\", \"floating\", \"icon\", \"outlined\", and \"raised\". The default is \"raised\".";
    KulButtonProps["kulToggable"] = "Makes the button toggable between an on and off state.";
    KulButtonProps["kulTrailingIcon"] = "If set, displays an icon after the text.";
    KulButtonProps["kulType"] = "Defines the button type attribute.";
    KulButtonProps["kulValue"] = "If true, the button is marked as checked.";
})(KulButtonProps || (KulButtonProps = {}));

const kulButtonCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_button_backdrop_filter:var(--kul-button-backdrop-filter, blur(3.5px));--kul_button_backdrop_filter_hover:var(\n    --kul-button-backdrop-filter-hover,\n    blur(5px)\n  );--kul_button_border_radius:var(--kul-button-border-radius, 4px);--kul_button_disabled_color:var(\n    --kul-button-disabled-color,\n    var(--kul-disabled-color)\n  );--kul_button_font_family:var(\n    --kul-button-font-family,\n    var(--kul-font-family)\n  );--kul_button_font_size:var(--kul-button-font-size, var(--kul-font-size));--kul_button_font_weight:var(--kul-button-font-weight, 400);--kul_button_height:var(--kul-button-height, 3em);--kul_button_padding:var(--kul-button-padding, 0 1.25em);--kul_button_primary_color:var(\n    --kul-button-primary-color,\n    var(--kul-primary-color)\n  );--kul_button_primary_color_h:var(\n    --kul-button-primary-color-h,\n    var(--kul-primary-color-h)\n  );--kul_button_primary_color_s:var(\n    --kul-button-primary-color-s,\n    var(--kul-primary-color-s)\n  );--kul_button_primary_color_l:var(\n    --kul-button-primary-color-l,\n    var(--kul-primary-color-l)\n  );--kul_button_primary_color_rgb:var(\n    --kul-button-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_button_text_on_primary_color:var(\n    --kul-button-text-on-primary-color,\n    var(--kul-text-on-primary-color)\n  );--kul_button_text_transform:var(--kul-button-text-transform, uppercase);--kul_spinner_color:var(--kul_button_primary_color);display:block;font-size:var(--kul_button_font_size);width:max-content}#kul-component{align-items:center;display:flex}.button{align-items:center;background-color:transparent;border:none;border-radius:var(--kul_button_border_radius);box-sizing:border-box;color:var(--kul_button_primary_color);cursor:pointer;display:inline-flex;font-family:var(--kul_button_font_family);font-size:0.775em;font-weight:var(--kul_button_font_weight);height:var(--kul_button_height);justify-content:center;letter-spacing:0.0892857143em;line-height:inherit;min-width:64px;outline:none;overflow:visible;padding:var(--kul_button_padding);position:relative;text-decoration:none;text-transform:var(--kul_button_text_transform);transition:background-color 80ms linear, box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);user-select:none;vertical-align:middle}.button:hover{background-color:rgba(var(--kul_button_primary_color_rgb), 0.125)}.button:focus{background-color:rgba(var(--kul_button_primary_color_rgb), 0.375)}.button--floating,.button--raised,.button--outlined{-webkit-backdrop-filter:var(--kul_button_backdrop_filter);backdrop-filter:var(--kul_button_backdrop_filter)}.button--floating,.button--raised{--kul-spinner-color:var(--kul-text-color)}.button--floating:not(.button--disabled),.button--raised:not(.button--disabled){--kul-spinner-border-color:hsl(\n    var(--kul_button_primary_color_h),\n    calc(var(--kul_button_primary_color_s) * 0.75),\n    calc(var(--kul_button_primary_color_l) * 0.85)\n  );background-color:rgba(var(--kul_button_primary_color_rgb), 0.15)}.button--floating:focus,.button--floating:hover,.button--raised:focus,.button--raised:hover{-webkit-backdrop-filter:var(--kul_button_backdrop_filter);backdrop-filter:var(--kul_button_backdrop_filter)}.button--floating.button--disabled,.button--raised.button--disabled{background-color:var(--kul-disabled-background-color);box-shadow:none}.button--floating{border-radius:24px;box-shadow:0 0.215em 0.35em -1px rgba(var(--kul-text-color-rgb), 0.2), 0 0.43em 0.71em 0 rgba(var(--kul-text-color-rgb), 0.14), 0 0.07em 1.285em 0 rgba(var(--kul-text-color-rgb), 0.12);font-weight:500;font-size:1em;height:3.4em;width:auto;padding:0 1.5em}.button--floating.button--no-label{border-radius:50%;height:4em;padding:0;width:4em}.button--floating:hover,.button--floating:focus{box-shadow:0 5px 5px -3px rgba(var(--kul-text-color-rgb), 0.25), 0 8px 10px 1px rgba(var(--kul-text-color-rgb), 0.18), 0 3px 14px 2px rgba(var(--kul-text-color-rgb), 0.15)}.button--floating:active{box-shadow:0 7px 8px -4px rgba(var(--kul-text-color-rgb), 0.2), 0 12px 17px 2px rgba(var(--kul-text-color-rgb), 0.14), 0 5px 22px 4px rgba(var(--kul-text-color-rgb), 0.12)}.button--disabled{color:var(--kul_button_disabled_color);cursor:auto;opacity:0.75;pointer-events:none}.button--no-label{min-width:unset;padding:0 0.5em}.button--no-label .button__icon{margin:0}.button--outlined{border-width:1px;border-style:solid}.button--outlined:not(.button--disabled){border-color:var(--kul_button_primary_color);background-color:transparent;color:var(--kul_button_primary_color)}.button--outlined:focus,.button--outlined:hover{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}.button--outlined:hover{background-color:rgba(var(--kul_button_primary_color_rgb), 0.125)}.button--outlined:focus{background-color:rgba(var(--kul_button_primary_color_rgb), 0.175)}.button--outlined.button--disabled{opacity:0.75;border-color:var(--kul_button_disabled_color)}.button--raised{box-shadow:0 3px 1px -2px rgba(var(--kul-text-color-rgb), 0.2), 0 2px 2px 0 rgba(var(--kul-text-color-rgb), 0.14), 0 1px 5px 0 rgba(var(--kul-text-color-rgb), 0.12)}.button--raised:focus,.button--raised:hover{box-shadow:0 2px 4px -1px rgba(var(--kul-text-color-rgb), 0.25), 0 4px 5px 0 rgba(var(--kul-text-color-rgb), 0.18), 0 1px 10px 0 rgba(var(--kul-text-color-rgb), 0.15)}.button--raised:active{box-shadow:0 5px 5px -3px rgba(var(--kul-text-color-rgb), 0.2), 0 8px 10px 1px rgba(var(--kul-text-color-rgb), 0.14), 0 3px 14px 2px rgba(var(--kul-text-color-rgb), 0.12)}.button--with-spinner{opacity:0.8;pointer-events:none}.button--dropdown{max-width:max-content;min-width:unset;padding:0.5em;position:relative}.button--dropdown:before{background-color:var(--kul-border-color);content:\"\";height:100%;left:0;opacity:0.75;position:absolute;top:0;width:1px}.button--dropdown kul-image{margin:0}.button__spinner-container{width:100%;height:var(--kul_button_spinner_height);left:0;position:absolute}.button__icon{margin-left:-0.25em;margin-right:0.75em}.button__icon--hidden{visibility:hidden}.button__label+.button__icon{margin-left:0.75em;margin-right:-0.25em}.icon-button{background-color:transparent;color:var(--kul_button_primary_color);display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;font-size:var(--kul_button_font_size);text-decoration:none;cursor:pointer;user-select:none;padding:0.75em;border-radius:50%}.icon-button:hover,.icon-button:focus{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background-color:rgba(var(--kul_button_primary_color_rgb), 0.125)}.icon-button__icon{display:flex;margin:auto}.icon-button__icon.icon-button__icon--on{display:none}.icon-button--with-spinner{pointer-events:none}.icon-button--with-spinner .icon-button__icon{opacity:0}.icon-button--with-spinner .button__spinner-container{width:100%;height:100%;left:0;position:absolute;top:0}.icon-button--disabled{opacity:0.75;pointer-events:none}.icon-button__spinner-container{width:var(--kul_button_spinner_width);height:var(--kul_button_spinner_height)}.content--hidden{visibility:hidden}@keyframes pulsating{0%{transform:scale(2);box-shadow:0 0 0 0 rgba(var(--kul_button_primary_color_rgb), 0.7)}70%{transform:scale(2.75);box-shadow:0 0 0 10px rgba(var(--kul_button_primary_color_rgb), 0)}100%{transform:scale(2);box-shadow:0 0 0 0 rgba(var(--kul_button_primary_color_rgb), 0)}}:host(.kul-full-height){height:100%}:host(.kul-full-height) #kul-component,:host(.kul-full-height) .button{height:100%}:host(.kul-full-width){width:100%}:host(.kul-full-width) #kul-component,:host(.kul-full-width) .button{width:100%}:host(.kul-large) button{font-size:1.25em}:host(.kul-shaped) .button{border-radius:18px}:host(.kul-shaped) .button.button--floating{border-radius:50% 0}:host(.kul-slim) button{font-size:0.675em}:host(.kul-pulsating) .icon-button--on:after{content:\"\";animation:pulsating 1250ms infinite;position:absolute;height:2px;width:2px;top:calc(50% - 1px);left:calc(50% - 1px);border-radius:50%}:host(.kul-danger){--kul-button-primary-color:var(--kul-danger-color);--kul-button-primary-color-h:var(--kul-danger-color-h);--kul-button-primary-color-s:var(--kul-danger-color-s);--kul-button-primary-color-l:var(--kul-danger-color-l);--kul-button-primary-color-rgb:var(--kul-danger-color-rgb);--kul-button-text-on-primary-color:white}:host(.kul-info){--kul-button-primary-color:var(--kul-info-color);--kul-button-primary-color-h:var(--kul-info-color-h);--kul-button-primary-color-s:var(--kul-info-color-s);--kul-button-primary-color-l:var(--kul-info-color-l);--kul-button-primary-color-rgb:var(--kul-info-color-rgb);--kul-button-text-on-primary-color:white}:host(.kul-secondary){--kul-button-primary-color:var(--kul-secondary-color);--kul-button-primary-color-h:var(--kul-secondary-color-h);--kul-button-primary-color-s:var(--kul-secondary-color-s);--kul-button-primary-color-l:var(--kul-secondary-color-l);--kul-button-primary-color-rgb:var(--kul-secondary-color-rgb);--kul-button-text-on-primary-color:var(--kul-text-on-secondary-color)}:host(.kul-success){--kul-button-primary-color:var(--kul-success-color);--kul-button-primary-color-h:var(--kul-success-color-h);--kul-button-primary-color-s:var(--kul-success-color-s);--kul-button-primary-color-l:var(--kul-success-color-l);--kul-button-primary-color-rgb:var(--kul-success-color-rgb);--kul-button-text-on-primary-color:white}:host(.kul-warning){--kul-button-primary-color:var(--kul-warning-color);--kul-button-primary-color-h:var(--kul-warning-color-h);--kul-button-primary-color-s:var(--kul-warning-color-s);--kul-button-primary-color-l:var(--kul-warning-color-l);--kul-button-primary-color-rgb:var(--kul-warning-color-rgb);--kul-button-text-on-primary-color:white}";
const KulButtonStyle0 = kulButtonCss;

const KulButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-button-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = 'off';
        this.kulData = null;
        this.kulDisabled = false;
        this.kulIcon = '';
        this.kulIconOff = '';
        this.kulLabel = '';
        this.kulRipple = true;
        this.kulShowSpinner = false;
        this.kulStyle = '';
        this.kulStyling = 'raised';
        this.kulToggable = false;
        this.kulTrailingIcon = false;
        this.kulType = 'button';
        this.kulValue = false;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #clickCb;
    #dropdown;
    #dropdownRippleSurface;
    #list;
    #kulManager = kulManagerInstance();
    #rippleSurface;
    #timeout;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted for various button interactions like click, focus, blur.
     */
    kulEvent;
    onKulEvent(e, eventType, isDropdown = false) {
        switch (eventType) {
            case 'click':
                this.#updateState(this.#isOn() ? 'off' : 'on');
                break;
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(e, isDropdown
                        ? this.#dropdownRippleSurface
                        : this.#rippleSurface);
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
        return getProps(this, KulButtonProps, descriptions);
    }
    /**
     * Used to retrieve the component's current state.
     * @returns {Promise<KulButtonState>} Promise resolved with the current state of the component.
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
     * Temporarily sets a different label/icon combination, falling back to their previous value after a timeout.
     * @param {string} label - Temporary label to display.
     * @param {string} icon - Temporary icon to display.
     * @param {number} timeout - Time in ms to wait before restoring previous values.
     * @returns {Promise<void>}
     */
    async setMessage(label = 'Copied!', icon = 'check', timeout = 1000) {
        if (this.#timeout) {
            return;
        }
        const oldIcon = this.kulIcon;
        const oldLabel = this.kulLabel;
        requestAnimationFrame(() => {
            this.kulLabel = label;
            this.kulIcon = icon;
        });
        this.#timeout = setTimeout(() => {
            this.kulLabel = oldLabel;
            this.kulIcon = oldIcon;
            this.#timeout = null;
        }, timeout);
    }
    /**
     * Sets the component's state.
     * @param {KulButtonState} value - The new state to be set on the component.
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
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #listManager() {
        return {
            close: () => {
                this.#kulManager.dynamicPosition.stop(this.#list);
                this.#kulManager.removeClickCallback(this.#clickCb);
            },
            isOpened: () => {
                return this.#list.classList.contains(KUL_DROPDOWN_CLASS_VISIBLE);
            },
            open: () => {
                if (this.#kulManager.dynamicPosition.isRegistered(this.#list)) {
                    this.#kulManager.dynamicPosition.changeAnchor(this.#list, this.#dropdown);
                }
                else {
                    this.#kulManager.dynamicPosition.register(this.#list, this.#dropdown, 0, KulDynamicPositionPlacement.AUTO, true);
                }
                this.#kulManager.dynamicPosition.start(this.#list);
                if (!this.#clickCb) {
                    this.#clickCb = {
                        cb: () => {
                            this.#listManager().close();
                        },
                        el: this.#list,
                    };
                }
                this.#kulManager.addClickCallback(this.#clickCb, true);
            },
            toggle: () => {
                if (this.#listManager().isOpened()) {
                    this.#listManager().close();
                }
                else {
                    this.#listManager().open();
                }
            },
        };
    }
    #isDropdown() {
        return this.kulData?.nodes?.[0]?.children?.length;
    }
    #isOn() {
        return this.value === 'on' ? true : false;
    }
    #updateState(value) {
        if (this.kulToggable &&
            !this.kulDisabled &&
            (value === 'off' || value === 'on')) {
            this.value = value;
        }
    }
    #prepIcon(image) {
        return this.kulIcon ? (h("kul-image", { class: `button__icon kul-icon ${this.kulShowSpinner ? 'button__icon--hidden' : ''}`, ...image })) : undefined;
    }
    #prepLabel(className) {
        return h("span", { class: className }, this.kulLabel);
    }
    #prepNode(node) {
        const currentNode = h("div", null, node.value);
        if (Array.isArray(node.children) && node.children.length > 0) {
            const childrenNodes = node.children.map((childNode) => this.#prepNode(childNode));
            return (h(Fragment, null, currentNode, childrenNodes));
        }
        else {
            return currentNode;
        }
    }
    #prepRipple(isDropdown = false) {
        return this.kulRipple ? (h("div", { ref: (el) => {
                if (el && this.kulRipple) {
                    if (isDropdown) {
                        this.#dropdownRippleSurface = el;
                    }
                    else {
                        this.#rippleSurface = el;
                    }
                }
            } })) : undefined;
    }
    #prepSpinner() {
        return this.kulShowSpinner ? (h("div", { class: "button__spinner-container" }, h("slot", { name: "spinner" }))) : undefined;
    }
    #normalizedStyling() {
        return this.kulStyling
            ? this.kulStyling.toLowerCase()
            : 'raised';
    }
    #renderButton() {
        const buttonStyling = this.#normalizedStyling();
        const image = {
            kulColor: this.kulDisabled
                ? `var(--kul_button_disabled_color)`
                : `var(--kul_button_primary_color)`,
            kulValue: this.kulIcon,
            kulSizeX: buttonStyling === 'floating' ? '1.75em' : '1.475em',
            kulSizeY: buttonStyling === 'floating' ? '1.75em' : '1.475em',
        };
        const className = {
            button: true,
            'button--disabled': this.kulDisabled ? true : false,
            [`button--${buttonStyling}`]: true,
            'button--no-label': !this.kulLabel || this.kulLabel === ' ' ? true : false,
            'button--with-spinner': this.kulShowSpinner,
        };
        const labelClassName = {
            button__label: true,
            'content--hidden': this.kulShowSpinner && !this.kulDisabled ? true : false,
        };
        const styleSpinnerContainer = {
            '--kul_button_spinner_height': image.kulSizeY,
        };
        return [
            h("button", { "aria-label": this.rootElement.title, class: className, disabled: this.kulDisabled, onBlur: (e) => this.onKulEvent(e, 'blur'), onClick: (e) => this.onKulEvent(e, 'click'), onFocus: (e) => this.onKulEvent(e, 'focus'), onPointerDown: (e) => this.onKulEvent(e, 'pointerdown'), style: styleSpinnerContainer, type: this.kulType ? this.kulType : 'button' }, this.#prepRipple(), this.kulTrailingIcon
                ? [this.#prepLabel(labelClassName), this.#prepIcon(image)]
                : [this.#prepIcon(image), this.#prepLabel(labelClassName)], this.#prepSpinner()),
            this.#renderDropdown(image, buttonStyling),
        ];
    }
    #renderIconButton() {
        const isLarge = this.rootElement.classList.contains('large');
        const isOn = this.#isOn();
        const image = {
            kulColor: this.kulDisabled
                ? `var(--kul_button_disabled_color)`
                : `var(--kul_button_primary_color)`,
            kulSizeX: isLarge ? 'calc(1.75em * 1.5)' : '1.75em',
            kulSizeY: isLarge ? 'calc(1.75em * 1.5)' : '1.75em',
        };
        const className = {
            'icon-button': true,
            'button--disabled': this.kulDisabled ? true : false,
            'icon-button--on': this.kulToggable && isOn ? true : false,
            toggable: this.kulToggable ? true : false,
            'icon-button--with-spinner': this.kulShowSpinner ? true : false,
        };
        const styleSpinnerContainer = {
            '--kul_button_spinner_height': image.kulSizeY,
            '--kul_button_spinner_width': image.kulSizeX,
        };
        const iconOff = this.kulIconOff
            ? this.kulIconOff
            : this.kulIcon + '_border';
        return [
            h("button", { "aria-label": this.rootElement.title, class: className, disabled: this.kulDisabled, onBlur: (e) => this.onKulEvent(e, 'blur'), onClick: (e) => this.onKulEvent(e, 'click'), onFocus: (e) => this.onKulEvent(e, 'focus'), onPointerDown: (e) => this.onKulEvent(e, 'pointerdown'), style: styleSpinnerContainer, value: this.value, type: this.kulType ? this.kulType : 'button' }, this.#prepRipple(), h("kul-image", { class: "icon-button__icon", ...image, kulValue: this.kulToggable && !isOn ? iconOff : this.kulIcon }), this.#prepSpinner()),
            this.#renderDropdown(image, 'icon'),
        ];
    }
    #renderDropdown(image, styling) {
        if (!this.#isDropdown()) {
            return;
        }
        const className = {
            button: true,
            [`button--${styling}`]: true,
            ['button--dropdown']: true,
            'button--disabled': this.kulDisabled ? true : false,
        };
        const eventHandler = (e) => {
            if (e.detail.eventType === 'click') {
                this.onKulEvent(e, 'kul-event');
                this.#listManager().close();
            }
        };
        return (h("button", { class: className, "data-cy": KulDataCyAttributes.DROPDOWN_BUTTON, disabled: this.kulDisabled, onClick: () => {
                this.#listManager().toggle();
            }, onPointerDown: (e) => this.onKulEvent(e, 'pointerdown', true), ref: (el) => {
                if (el) {
                    this.#dropdown = el;
                }
            } }, this.#prepRipple(true), h("kul-image", { ...image, kulValue: '--kul-dropdown-icon' }), h("kul-list", { class: KUL_DROPDOWN_CLASS, "data-cy": KulDataCyAttributes.DROPDOWN_MENU, kulData: { nodes: this.kulData.nodes[0].children }, "onKul-list-event": eventHandler, ref: (el) => (this.#list = el) })));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        if (this.kulValue) {
            this.value = 'on';
        }
        const firstNode = this.kulData?.nodes?.[0];
        if (firstNode) {
            if (!this.kulIcon) {
                this.kulIcon = firstNode.icon;
            }
            if (!this.kulLabel) {
                this.kulLabel = this.#kulManager.data.cell.stringify(firstNode.value);
            }
        }
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#rippleSurface) {
            this.#kulManager.theme.ripple.setup(this.#rippleSurface);
        }
        if (this.#dropdownRippleSurface) {
            this.#kulManager.theme.ripple.setup(this.#dropdownRippleSurface);
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
        const buttonStyling = this.#normalizedStyling();
        const isIconButton = !!(buttonStyling === 'icon' ||
            (buttonStyling === 'raised' &&
                this.kulIcon &&
                (this.kulLabel === null || this.kulLabel === undefined)));
        if (!this.kulLabel && !this.kulIcon && !this.kulData) {
            this.#kulManager.debug.logs.new(this, 'Empty button.', 'informational');
            return;
        }
        return (h(Host, null, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID }, isIconButton
            ? this.#renderIconButton()
            : this.#renderButton())));
    }
    disconnectedCallback() {
        if (this.#list) {
            this.#kulManager.dynamicPosition.unregister([this.#list]);
        }
        this.#kulManager.theme.unregister(this);
    }
};
KulButton.style = KulButtonStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulImageProps;
(function (KulImageProps) {
    KulImageProps["kulBadgeProps"] = "Sets the props to show a badge.";
    KulImageProps["kulColor"] = "The color of the icon, defaults to the CSS variable --kul-icon-color.";
    KulImageProps["kulShowSpinner"] = "When set to true, a spinner will be displayed until the image finished loading. Not compatible with SVGs.";
    KulImageProps["kulSizeX"] = "The width of the icon, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).";
    KulImageProps["kulSizeY"] = "The height of the icon, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).";
    KulImageProps["kulStyle"] = "Custom style of the component.";
    KulImageProps["kulValue"] = "Defines the source URL of the image. This property is used to set the image resource that the component should display.";
})(KulImageProps || (KulImageProps = {}));

const kulImageCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_image_aspect_ratio:var(--kul-image-aspect-ratio, 1);--kul_image_background:var(--kul-image-background, transparent);--kul_image_height:var(--kul-image-height, 100%);--kul_image_margin:var(--kul-image-margin, auto);--kul_image_mask:var(--kul-image-mask, none);--kul_image_spinner_offset:var(\n    --kul-image-spinner-offset,\n    calc(var(--kul_image_spinner_size) / 2)\n  );--kul_image_spinner_size:var(--kul-image-spinner-size, 32px);--kul_image_transition_duration:var(--kul-image-transition-duration, 0.2s);--kul_image_transition_timing_function:var(\n    --kul-image-transition-timing-function,\n    ease\n  );--kul_image_width:var(--kul-image-width, 100%);display:block;height:var(--kul_image_height);margin:var(--kul_image_margin);min-height:var(--kul_image_height);min-width:var(--kul_image_width);position:relative;transition:color var(--kul_image_transition_duration) var(--kul_image_transition_timing_function);width:var(--kul_image_width)}#kul-component{height:100%;margin:var(--kul_image_margin);position:relative;transition:color var(--kul_image_transition_duration) var(--kul_image_transition_timing_function);width:100%}.image{display:block;height:var(--kul_image_height);margin:var(--kul_image_margin);position:relative;width:var(--kul_image_width)}.image__icon{aspect-ratio:var(--kul_image_aspect_ratio);background-color:var(--kul_image_background);height:var(--kul_image_height);margin:var(--kul_image_margin);mask:var(--kul_image_mask);-webkit-mask:var(--kul_image_mask);width:var(--kul_image_width)}img{display:block;height:var(--kul_image_height);margin:var(--kul_image_margin);width:var(--kul_image_width)}.spinner{height:var(--kul_image_spinner_size);left:calc(50% - var(--kul_image_spinner_offset));position:absolute;top:calc(50% - var(--kul_image_spinner_offset));width:var(--kul_image_spinner_size)}:host(.kul-fit) img{max-width:max-content;object-fit:contain}:host(.kul-cover) img{object-fit:cover}";
const KulImageStyle0 = kulImageCss;

const KulImage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-image-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.error = false;
        this.kulBadgeProps = null;
        this.kulColor = `var(${KulThemeColorValues.ICON})`;
        this.kulShowSpinner = false;
        this.kulSizeX = '100%';
        this.kulSizeY = '100%';
        this.kulStyle = '';
        this.kulValue = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*        I n t e r n a l   V a r i a b l e s      */
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
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
        });
    }
    /*-------------------------------------------------*/
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async resetState() {
        this.error = false;
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
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulImageProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
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
    createIcon() {
        const className = {
            image__icon: true,
        };
        const style = {
            ['--kul_image_background']: this.kulColor
                ? this.kulColor
                : `var(${KulThemeColorValues.ICON})`,
            ['--kul_image_mask']: '',
        };
        const isThemeIcon = this.kulValue.indexOf(CSS_VAR_PREFIX) > -1;
        if (isThemeIcon) {
            const themeIcon = this.kulValue.replace('--', '');
            className['kul-icon'] = true;
            className[themeIcon] = true;
        }
        const icon = this.error
            ? 'broken_image'
            : isThemeIcon
                ? this.#kulManager.theme.list[this.#kulManager.theme.name].icons[this.kulValue]
                : this.kulValue;
        style['--kul_image_mask'] =
            `url('${getAssetPath(`./assets/svg/${icon}.svg`)}') no-repeat center`;
        return h("div", { class: className, style: style });
    }
    createImage() {
        return (h("img", { onError: (e) => {
                this.error = true;
                this.onKulEvent(e, 'error');
            }, onLoad: (e) => {
                this.resetState();
                this.onKulEvent(e, 'load');
            }, src: this.kulValue }));
    }
    isResourceUrl() {
        return !!(this.kulValue &&
            (this.kulValue.indexOf('.') > -1 ||
                this.kulValue.indexOf('/') > -1 ||
                this.kulValue.indexOf('\\') > -1));
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
        if (!this.kulValue) {
            this.#kulManager.debug.logs.new(this, 'Empty image.');
            return;
        }
        let el;
        let feedback;
        const isUrl = this.isResourceUrl();
        let spinnerLayout;
        let style = {
            '--kul_image_height': this.kulSizeY ? this.kulSizeY : 'auto',
            '--kul_image_width': this.kulSizeX ? this.kulSizeX : '100%',
        };
        if (isUrl && !this.error) {
            el = this.createImage();
        }
        else {
            el = this.createIcon();
        }
        if (this.kulShowSpinner && isUrl) {
            spinnerLayout = 14;
            feedback = (h("div", { class: "spinner", title: "Image not loaded yet..." }, h("kul-spinner", { kulActive: true, kulDimensions: "3px", kulLayout: spinnerLayout })));
        }
        return (h(Host, { style: style }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, feedback, h("div", { id: KUL_WRAPPER_ID }, h("div", { class: "image", onClick: (e) => {
                this.onKulEvent(e, 'click');
            } }, el, this.kulBadgeProps ? (h("kul-badge", { ...this.kulBadgeProps })) : undefined))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get assetsDirs() { return ["assets/svg"]; }
    static get watchers() { return {
        "kulValue": ["resetState"]
    }; }
};
KulImage.style = KulImageStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulListProps;
(function (KulListProps) {
    KulListProps["kulData"] = "The actual data of the list.";
    KulListProps["kulEmptyLabel"] = "Text displayed when the list is empty.";
    KulListProps["kulEnableDeletions"] = "Defines whether items can be removed from the list or not.";
    KulListProps["kulNavigation"] = "When true, enables items' navigation through arrow keys.";
    KulListProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulListProps["kulSelectable"] = "Defines whether items are selectable or not.";
    KulListProps["kulStyle"] = "Custom style of the component.";
})(KulListProps || (KulListProps = {}));

const kulListCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_list_backdrop_filter:var(--kul-list-backdrop-filter, blur(3.5px));--kul_list_background_color:rgba(var(--kul-background-color-rgb), 0.75);--kul_list_font_family:var(--kul-list-font-family, var(--kul-font-family));--kul_list_font_size:var(--kul-list-font-size, var(--kul-font-size));--kul_list_font_weight:var(--kul-list-font-weight, 400);--kul_list_group_item_height:var(--kul-list-group-item-height, 3em);--kul_list_item_height:var(--kul-list-item-height, 2.5em);--kul_list_item_padding:var(--kul-list-item-padding, 0 0.75em);--kul_list_primary_color:var(\n    --kul-list-primary-color,\n    var(--kul-primary-color)\n  );--kul_list_primary_color_rgb:var(\n    --kul-list-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_list_text_color:var(--kul-list-text-color, var(--kul-text-color));--kul_list_text_color_rgb:var(\n    --kul-list-text-color-rgb,\n    var(--kul-text-color-rgb)\n  );--kul_list_transition:var(--kul-list-transition, 125ms);-webkit-backdrop-filter:var(--kul_list_backdrop_filter);backdrop-filter:var(--kul_list_backdrop_filter);background-color:var(--kul_list_background_color);display:block;font-family:var(--kul_list_font_family);font-size:var(--kul_list_font_size);height:100%;outline:none;width:100%}#kul-component{height:100%;width:100%}.list{box-sizing:border-box;color:var(--kul_list_text_color);font-weight:var(--kul_list_font_weight);height:100%;letter-spacing:0.009375em;line-height:1.5em;list-style-type:none;margin:0;padding:0.5em 0;text-decoration:inherit;text-transform:inherit;width:100%}.list--empty{padding:0}.list--selectable .node{cursor:pointer;pointer-events:all}.list--selectable .node:not(.node--selected):hover,.list--selectable .node:not(.node--selected).node--focused{background-color:rgba(var(--kul_list_text_color_rgb), 0.125)}.list--selectable .node.node--selected:hover{background-color:rgba(var(--kul_list_primary_color_rgb), 0.225);color:var(--kul_list_primary_color)}.list-item{align-items:center;display:flex;width:100%}.list-item:hover .delete{width:1.5em}.delete{box-sizing:border-box;cursor:pointer;height:var(--kul_list_item_height);opacity:0.75;overflow:hidden;transition:opacity 125ms ease, width 125ms ease;width:0}.delete:hover{opacity:1}.delete__icon{background-color:var(--kul_list_text_color);height:100%;margin:0;width:100%}.node{align-items:center;display:flex;height:var(--kul_list_item_height);justify-content:flex-start;padding:var(--kul_list_item_padding);pointer-events:none;position:relative;outline:none;overflow:hidden;transition:background-color var(--kul_list_transition), color var(--kul_list_transition);width:100%}.node--has-description{align-self:flex-start;height:3.6em}.node--selected{background-color:rgba(var(--kul_list_primary_color_rgb), 0.175);color:var(--kul_list_primary_color)}.node__title{display:block;line-height:normal;margin-bottom:-1.5em;margin-top:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.node__title:before{content:\"\";display:inline-block;width:0;height:1.5em;vertical-align:0}.node__title:after{content:\"\";display:inline-block;width:0;height:2em;vertical-align:-2em}.node__subtitle{color:var(--kul_list_text_color);display:block;font-size:0.875em;font-weight:400;letter-spacing:0.0178571429em;line-height:normal;margin-top:0;opacity:0.75;overflow:hidden;padding-bottom:0.5em;text-decoration:inherit;text-transform:inherit;text-overflow:ellipsis;white-space:nowrap}.node__icon{background-color:var(--kul_list_text_color);height:1.5em;margin:0 0.75em 0 0;width:1.5em}.empty-data{align-items:center;display:flex;justify-content:center;height:100%;width:100%}:host(.kul-dropdown-menu){display:none;height:max-content;max-height:50dvh;max-width:75dvw;overflow:auto;width:max-content}:host(.kul-dropdown-menu--visible){display:block}";
const KulListStyle0 = kulListCss;

const KulList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-list-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.focused = undefined;
        this.selected = undefined;
        this.kulData = null;
        this.kulEmptyLabel = '';
        this.kulEnableDeletions = false;
        this.kulNavigation = true;
        this.kulRipple = true;
        this.kulSelectable = true;
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #listItems = [];
    #rippleSurface = [];
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, node, index = 0) {
        switch (eventType) {
            case 'blur':
                this.focused = null;
                break;
            case 'click':
                this.focused = index;
                this.#handleSelection(index);
                break;
            case 'delete':
                if (index > -1) {
                    this.kulData.nodes.splice(index, 1);
                    this.refresh();
                }
                break;
            case 'focus':
                this.focused = index;
                break;
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface[index]);
                }
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            node,
        });
    }
    /*-------------------------------------------------*/
    /*                L i s t e n e r s                */
    /*-------------------------------------------------*/
    listenKeydown(e) {
        if (this.kulNavigation) {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    e.stopPropagation();
                    this.focusNext();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    e.stopPropagation();
                    this.focusPrevious();
                    break;
                case 'Enter':
                    e.preventDefault();
                    e.stopPropagation();
                    this.#handleSelection(this.focused);
                    break;
            }
        }
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Focuses the next element of the list.
     */
    async focusNext() {
        if (isNaN(this.focused) ||
            this.focused === null ||
            this.focused === undefined) {
            this.focused = this.selected;
        }
        else {
            this.focused++;
        }
        if (this.focused > this.#listItems.length - 1) {
            this.focused = 0;
        }
        this.#listItems[this.focused].focus();
    }
    /**
     * Focuses the previous element of the list.
     */
    async focusPrevious() {
        if (isNaN(this.focused) ||
            this.focused === null ||
            this.focused === undefined) {
            this.focused = this.selected;
        }
        else {
            this.focused--;
        }
        if (this.focused < 0) {
            this.focused = this.#listItems.length - 1;
        }
        this.#listItems[this.focused].focus();
    }
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
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
        return getProps(this, KulListProps, descriptions);
    }
    /**
     * Returns the selected node.
     * @returns {Promise<KulListNode>} Selected node.
     */
    async getSelected() {
        return this.kulData.nodes[this.selected];
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Calls handleSelection private method to select the given item.
     * @param {number} index - Zero-based index of the item that must be selected, when not provided the list will attempt to select the focused element.
     */
    async selectNode(index) {
        if (index === undefined) {
            index = this.focused;
        }
        this.#handleSelection(index);
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
    #handleSelection(index) {
        if (this.kulSelectable &&
            index !== null &&
            index !== undefined &&
            !isNaN(index)) {
            this.selected = index;
        }
    }
    #prepDeleteIcon(node) {
        const path = getAssetPath(`./assets/svg/clear.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return (h("div", { class: "delete", "data-cy": KulDataCyAttributes.BUTTON, onClick: (e) => {
                const index = this.kulData?.nodes?.indexOf(node);
                this.onKulEvent(e, 'delete', node, index);
            } }, h("div", { class: "delete__icon", key: node.id + '_delete', style: style })));
    }
    #prepIcon(node) {
        const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return h("div", { class: "node__icon", style: style });
    }
    #prepNode(node, index) {
        const isFocused = this.focused ===
            this.kulData.nodes.findIndex((n) => n.id === node.id);
        const isSelected = this.selected ===
            this.kulData.nodes.findIndex((n) => n.id === node.id);
        const className = {
            node: true,
            'node--focused': isFocused,
            'node--has-description': !!node.description,
            'node--selected': isSelected,
        };
        return (h("li", { class: "list-item" }, this.kulEnableDeletions ? this.#prepDeleteIcon(node) : null, h("div", { "aria-selected": isSelected, "aria-checked": isSelected, class: className, "data-cy": KulDataCyAttributes.NODE, "data-index": index.toString(), onBlur: (e) => this.onKulEvent(e, 'blur', node, index), onClick: (e) => this.onKulEvent(e, 'click', node, index), onFocus: (e) => this.onKulEvent(e, 'focus', node, index), onPointerDown: (e) => this.onKulEvent(e, 'pointerdown', node, index), ref: (el) => {
                if (el) {
                    this.#listItems.push(el);
                }
            }, role: 'option', tabindex: isSelected ? '0' : '-1' }, h("div", { ref: (el) => {
                if (this.kulRipple && el) {
                    this.#rippleSurface.push(el);
                }
            } }), node.icon ? this.#prepIcon(node) : null, h("span", { class: "node__text" }, this.#prepTitle(node), this.#prepSubtitle(node)))));
    }
    #prepSubtitle(node) {
        return node.description ? (h("div", { class: "node__subtitle" }, node.description)) : undefined;
    }
    #prepTitle(node) {
        return String(node.value).valueOf() ? (h("div", { class: "node__title" }, String(node.value).valueOf())) : undefined;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#rippleSurface?.length) {
            this.#rippleSurface.forEach((el) => {
                this.#kulManager.theme.ripple.setup(el);
            });
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
        const isEmpty = !!!this.kulData?.nodes?.length;
        this.#listItems = [];
        const className = {
            list: true,
            'list--empty': isEmpty,
            'list--selectable': this.kulSelectable,
        };
        return (h(Host, { key: 'a858adfe9637493232a939e0429e43cb85f1d67c' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '130e94e78d82dc5d460d6d5a5160511f28fbfd19', id: KUL_WRAPPER_ID }, isEmpty ? (h("div", { class: "empty-data" }, h("div", { class: "empty-data__text" }, this.kulEmptyLabel ||
            this.#kulManager.language.translate(KulLanguageGeneric.EMPTY_DATA)))) : (h("ul", { "aria-multiselectable": 'false', class: className, role: 'listbox' }, this.kulData.nodes.map((item, index) => this.#prepNode(item, index)))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulList.style = KulListStyle0;

//#endregion
//#region Props
var KulSpinnerProps;
(function (KulSpinnerProps) {
    KulSpinnerProps["kulActive"] = "Specifies if the spinner is animating.";
    KulSpinnerProps["kulBarVariant"] = "Controls if the component displays as a bar or a spinner.";
    KulSpinnerProps["kulDimensions"] = "Defines the width and height of the spinner. In the bar variant, it specifies only the height.";
    KulSpinnerProps["kulFader"] = "Applies a blending modal over the component to darken or lighten the view, based on the theme.";
    KulSpinnerProps["kulFaderTimeout"] = "Duration needed for the fader to become active.";
    KulSpinnerProps["kulFullScreen"] = "Fills the entire viewport when enabled.";
    KulSpinnerProps["kulLayout"] = "Selects the spinner layout.";
    KulSpinnerProps["kulStyle"] = "Sets a custom style for the component.";
    KulSpinnerProps["kulTimeout"] = "Duration for the progress bar to fill up (in milliseconds).";
})(KulSpinnerProps || (KulSpinnerProps = {}));
//#endregion

const SPINNER_CONFIGS = {
    7: {
        className: 'spinner-v7',
        elements: () => Array(6)
            .fill(0)
            .map(() => h("div", { class: "sk-spinner-v7-dot" })),
    },
    9: {
        className: 'spinner-v9',
        elements: () => [
            h("div", { class: "sk-spinner-v9-bounce1" }),
            h("div", { class: "sk-spinner-v9-bounce2" }),
        ],
    },
    10: {
        className: 'spinner-v10',
        elements: () => [
            h("div", { class: "sk-spinner-v10-cube1" }),
            h("div", { class: "sk-spinner-v10-cube2" }),
        ],
    },
    12: {
        className: 'spinner-v12',
        elements: () => [
            h("div", { class: "sk-spinner-v12-dot1" }),
            h("div", { class: "sk-spinner-v12-dot2" }),
        ],
    },
    13: {
        className: 'spinner-v13',
        elements: () => Array(9)
            .fill(0)
            .map((_, i) => (h("div", { class: `sk-spinner-v13-cube sk-spinner-v13-cube${i + 1}` }))),
    },
    14: {
        className: 'spinner-v14',
        elements: () => Array(12)
            .fill(0)
            .map((_, i) => (h("div", { class: `sk-spinner-v14-circle${i + 1} sk-spinner-v14-circle` }))),
    },
};
const BAR_SPINNER_CONFIGS = {
    1: {
        className: 'spinner-bar-v1',
        elements: () => [],
    },
    2: {
        className: 'spinner-bar-v2',
        elements: () => [],
    },
    3: {
        className: 'spinner-bar-v3',
        elements: (progress) => [
            h("div", { class: "progress-bar", style: { width: `${progress}%` } }),
        ],
    },
};

const kulSpinnerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_spinner_border_color:var(\n    --kul-spinner-border-color,\n    var(--kul-border-color)\n  );display:block}#loading-wrapper-master{background:transparent;opacity:0;overflow:hidden;transition:opacity 0.8s ease-in, background-color 1s ease-in;transform:translatez(0)}#loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner{width:100%;height:100%;position:relative}#loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner div{margin:auto;position:absolute;top:0;right:0;bottom:0;left:0;transition:top 0.25s ease-in-out, opacity 0.25s ease-in-out}:host([kul-active]) #loading-wrapper-master{opacity:1}:host([kul-active]) #loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner{opacity:1;overflow:hidden}:host([kul-active]) #loading-wrapper-master[kul-bar-variant]>#loading-wrapper-master-bar{opacity:1}:host([kul-active]) #loading-wrapper-master[kul-bar-variant]>#loading-wrapper-master-bar div.spinner-bar-v2{animation:sk-spinner-bar-v2 20s;background-color:var(--kul-spinner-color);left:-1%}:host([kul-active]) #loading-wrapper-master.loading-wrapper-big-wait{background:rgba(128, 128, 128, 0.25)}:host([kul-active]) #loading-wrapper-master.loading-wrapper-big-wait>#loading-wrapper-master-spinner{font-size:10px}:host([kul-full-screen]) #loading-wrapper-master{top:0;left:0;bottom:0;right:0;pointer-events:none;position:fixed;width:100%;z-index:9999}:host([kul-full-screen]) #loading-wrapper-master div,:host([kul-full-screen]) #loading-wrapper-master.spinner-version #loading-wrapper-master-spinner{position:fixed;transition:opacity 1.25s ease-in, background-color 1s ease-in, top 0.5s ease-in}.spinner-v1{border-top:1em solid var(--kul_spinner_border_color);border-right:1em solid var(--kul_spinner_border_color);border-bottom:1em solid var(--kul_spinner_border_color);border-left:1em solid var(--kul-spinner-color);transform:translatez(0);animation:sk-spinner-v1 1.1s infinite linear}.spinner-v1,.spinner-v1:after{border-radius:50%;width:7em;height:7em}@keyframes sk-spinner-v1{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-v2,.spinner-v2:before,.spinner-v2:after{border-radius:50%;width:2em;height:2em;animation-fill-mode:both;animation:sk-spinner-v2 1.4s infinite ease-in-out;transform:translatez(0)}.spinner-v2{backface-visibility:hidden;color:var(--kul-spinner-color);font-size:1em;transform:translateY(-2.5em);animation-delay:-0.16s}.spinner-v2:before,.spinner-v2:after{content:\"\";position:absolute;top:0}.spinner-v2:before{left:-4em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-v2:after{left:4em}@keyframes sk-spinner-v2{0%,80%,100%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}.spinner-v3{color:var(--kul-spinner-color);font-size:6em;width:1em;height:1em;border-radius:50%;transform:translatez(0);animation:sk-spinner-v3 1.7s infinite ease, sk-spinner-v3-1 1.7s infinite ease}@keyframes sk-spinner-v3{0%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}5%,95%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}10%,59%{box-shadow:0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em}20%{box-shadow:0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em}38%{box-shadow:0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em}100%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}}@keyframes sk-spinner-v3-1{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-v4{color:var(--kul-spinner-color);width:1em;height:1em;border-radius:50%;animation:sk-spinner-v4 1.3s infinite linear;transform:translatez(0)}@keyframes sk-spinner-v4{0%,100%{box-shadow:0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em}75%{box-shadow:0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0}87.5%{box-shadow:0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em}}.spinner-v5{margin-top:-0.8em;width:9em;height:9em;border-radius:50%;background:linear-gradient(to right, var(--kul-spinner-color) 10%, rgba(255, 255, 255, 0) 42%);animation:sk-spinner-v5 1.4s infinite linear;transform:translatez(0)}.spinner-v5:before{width:50%;height:50%;background:var(--kul-spinner-color);border-radius:100% 0 0 0;position:absolute;top:0;left:0;content:\"\"}.spinner-v5:after{background:var(--kul_spinner_border_color);width:75%;height:75%;border-radius:50%;content:\"\";margin:auto;position:absolute;top:0;left:0;bottom:0;right:0}@keyframes sk-spinner-v5{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.spinner-v6,.spinner-v6:before,.spinner-v6:after{background:var(--kul-spinner-color);animation:sk-spinner-v6 1s infinite ease-in-out;width:1em;height:4em}.spinner-v6{color:var(--kul-spinner-color);margin-top:2em;transform:translatez(0);animation-delay:-0.16s}.spinner-v6:before,.spinner-v6:after{position:absolute;top:0;content:\"\"}.spinner-v6:before{left:-1.5em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-v6:after{left:1.5em}@keyframes sk-spinner-v6{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}.spinner-v7{width:6em;height:6em;position:relative;animation:sk-spinner-v7 2.5s infinite linear both}.sk-spinner-v7-dot{width:100%;height:100%;position:absolute;left:0;top:0;animation:sk-spinner-v7-dot 2s infinite ease-in-out both}.sk-spinner-v7-dot:before{content:\"\";display:block;width:25%;height:25%;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v7-dot-before 2s infinite ease-in-out both}.sk-spinner-v7-dot:nth-child(1){animation-delay:-1.1s}.sk-spinner-v7-dot:nth-child(2){animation-delay:-1s}.sk-spinner-v7-dot:nth-child(3){animation-delay:-0.9s}.sk-spinner-v7-dot:nth-child(4){animation-delay:-0.8s}.sk-spinner-v7-dot:nth-child(5){animation-delay:-0.7s}.sk-spinner-v7-dot:nth-child(6){animation-delay:-0.6s}.sk-spinner-v7-dot:nth-child(1):before{animation-delay:-1.1s}.sk-spinner-v7-dot:nth-child(2):before{animation-delay:-1s}.sk-spinner-v7-dot:nth-child(3):before{animation-delay:-0.9s}.sk-spinner-v7-dot:nth-child(4):before{animation-delay:-0.8s}.sk-spinner-v7-dot:nth-child(5):before{animation-delay:-0.7s}.sk-spinner-v7-dot:nth-child(6):before{animation-delay:-0.6s}@keyframes sk-spinner-v7{100%{transform:rotate(360deg)}}@keyframes sk-spinner-v7-dot{80%,100%{transform:rotate(360deg)}}@keyframes sk-spinner-v7-dot-before{50%{transform:scale(0.4)}100%,0%{transform:scale(1)}}.spinner-v8{width:8em;height:8em;background-color:var(--kul-spinner-color);animation:sk-spinner-v8 1.2s infinite ease-in-out}@keyframes sk-spinner-v8{0%{transform:perspective(120px) rotateX(0deg) rotateY(0deg)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}.spinner-v9{width:8em;height:8em;position:relative}.sk-spinner-v9-bounce1,.sk-spinner-v9-bounce2{width:100%;height:100%;border-radius:50%;background-color:var(--kul-spinner-color);opacity:0.6;position:absolute;top:0;left:0;animation:sk-spinner-v9 2s infinite ease-in-out}.sk-spinner-v9-bounce2{animation-delay:-1s}@keyframes sk-spinner-v9{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.spinner-v10{width:8em;height:8em;position:relative}.sk-spinner-v10-cube1,.sk-spinner-v10-cube2{backface-visibility:hidden;background-color:var(--kul-spinner-color);width:2em;height:2em;position:absolute;top:0;left:0;bottom:unset !important;right:unset !important;animation:sk-spinner-v10 1.8s infinite ease-in-out}.sk-spinner-v10-cube2{animation-delay:-0.9s}@keyframes sk-spinner-v10{25%{transform:translateX(5em) rotate(-90deg) scale(0.5)}50%{transform:translateX(5em) translateY(5em) rotate(-179deg)}50.1%{transform:translateX(5em) translateY(5em) rotate(-180deg)}75%{transform:translateX(0px) translateY(5em) rotate(-270deg) scale(0.5)}100%{transform:rotate(-360deg)}}.spinner-v11{width:8em;height:8em;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v11 1s infinite ease-in-out}@keyframes sk-spinner-v11{0%{transform:scale(0)}100%{transform:scale(1);opacity:0}}.spinner-v12{width:8em;height:8em;position:relative;text-align:center;animation:sk-spinner-v12 2s infinite linear}.sk-spinner-v12-dot1,.sk-spinner-v12-dot2{width:60%;height:60%;display:inline-block;position:absolute;top:0 !important;left:unset !important;bottom:unset !important;right:unset !important;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v12-1 2s infinite ease-in-out}.sk-spinner-v12-dot2{top:auto !important;bottom:0 !important;left:unset !important;right:unset !important;animation-delay:-1s}@keyframes sk-spinner-v12{100%{transform:rotate(360deg);-webkit-transform:rotate(360deg)}}@keyframes sk-spinner-v12-1{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}.spinner-v13{width:7em;height:7em}.spinner-v13 .sk-spinner-v13-cube{backface-visibility:hidden;background-color:var(--kul-spinner-color);float:left;height:33%;width:33%;position:relative !important;animation:sk-spinner-v13 1.3s infinite ease-in-out;outline:1px solid transparent}.spinner-v13 .sk-spinner-v13-cube1{animation-delay:0.2s}.spinner-v13 .sk-spinner-v13-cube2{animation-delay:0.3s}.spinner-v13 .sk-spinner-v13-cube3{animation-delay:0.4s}.spinner-v13 .sk-spinner-v13-cube4{animation-delay:0.1s}.spinner-v13 .sk-spinner-v13-cube5{animation-delay:0.2s}.spinner-v13 .sk-spinner-v13-cube6{animation-delay:0.3s}.spinner-v13 .sk-spinner-v13-cube7{animation-delay:0s}.spinner-v13 .sk-spinner-v13-cube8{animation-delay:0.1s}.spinner-v13 .sk-spinner-v13-cube9{animation-delay:0.2s}@keyframes sk-spinner-v13{0%,70%,100%{transform:scale3D(1, 1, 1)}35%{transform:scale3D(0, 0, 1)}}.spinner-v14{width:8em;height:8em;position:relative}.spinner-v14 .sk-spinner-v14-circle{width:100%;height:100%;position:absolute;left:0;top:0}.spinner-v14 .sk-spinner-v14-circle:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:var(--kul-spinner-color);border-radius:100%;-webkit-animation:sk-spinner-v14-circleFadeDelay 1.2s infinite ease-in-out both;animation:sk-spinner-v14-circleFadeDelay 1.2s infinite ease-in-out both}.spinner-v14 .sk-spinner-v14-circle2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.spinner-v14 .sk-spinner-v14-circle3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.spinner-v14 .sk-spinner-v14-circle4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.spinner-v14 .sk-spinner-v14-circle5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.spinner-v14 .sk-spinner-v14-circle6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.spinner-v14 .sk-spinner-v14-circle7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.spinner-v14 .sk-spinner-v14-circle8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.spinner-v14 .sk-spinner-v14-circle9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.spinner-v14 .sk-spinner-v14-circle10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.spinner-v14 .sk-spinner-v14-circle11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.spinner-v14 .sk-spinner-v14-circle12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.spinner-v14 .sk-spinner-v14-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner-v14 .sk-spinner-v14-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.spinner-v14 .sk-spinner-v14-circle4:before{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.spinner-v14 .sk-spinner-v14-circle5:before{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.spinner-v14 .sk-spinner-v14-circle6:before{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.spinner-v14 .sk-spinner-v14-circle7:before{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.spinner-v14 .sk-spinner-v14-circle8:before{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.spinner-v14 .sk-spinner-v14-circle9:before{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.spinner-v14 .sk-spinner-v14-circle10:before{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.spinner-v14 .sk-spinner-v14-circle11:before{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.spinner-v14 .sk-spinner-v14-circle12:before{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@keyframes sk-spinner-v14-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}.spinner-bar-v1{height:1em;width:100%;position:absolute;overflow:hidden;transform:translatez(0)}.spinner-bar-v1:before{display:block;position:absolute;content:\"\";width:25%;height:1em;animation:sk-spinner-bar-v1 5s linear infinite;transform:translatez(0)}@keyframes sk-spinner-bar-v1{from{left:-25%;background:var(--kul-spinner-color);background:linear-gradient(to left, var(--kul-spinner-color) 0, rgba(255, 255, 255, 0) 100%)}50%{left:100%}to{left:-25%;background:var(--kul-spinner-color);background:linear-gradient(to right, var(--kul-spinner-color) 0, rgba(255, 255, 255, 0) 100%)}}.spinner-bar-v2{box-shadow:-1px 0px 2px 2px var(--kul-spinner-color);height:calc(1em - 2px);position:absolute;overflow:hidden;animation-timing-function:cubic-bezier(0.19, 0.78, 0.19, 0.78);transform:translatez(0);animation:none;width:100%}@keyframes sk-spinner-bar-v2{from{left:-100%}to{left:-1%}}.spinner-bar-v3{height:calc(1.5em - 2px);overflow:hidden;position:absolute;width:100%;background-color:var(--kul-border-color, #f0f0f0)}.spinner-bar-v3 .progress-bar{height:100%;background-color:var(--kul-spinner-color);animation:sk-spinner-bar-v3 1s infinite ease-in-out;transition:width 0.1s linear}@keyframes sk-spinner-bar-v3{0%{opacity:1}50%{opacity:0.6}100%{opacity:1}}:host(.kul-unclickable) #loading-wrapper-master{cursor:wait;pointer-events:all}";
const KulSpinnerStyle0 = kulSpinnerCss;

const KulSpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-spinner-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulProgress = 0;
        this.kulActive = false;
        this.kulBarVariant = false;
        this.kulDimensions = '';
        this.kulFader = false;
        this.kulFaderTimeout = 3500;
        this.kulFullScreen = false;
        this.kulLayout = 1;
        this.kulStyle = '';
        this.kulTimeout = undefined;
    }
    get rootElement() { return getElement(this); }
    //#endregion
    //#region Internal variables
    #kulManager = kulManagerInstance();
    #progressAnimationFrame;
    //#endregion
    //#region Watchers
    kulTimeoutChanged(newValue, oldValue) {
        if (newValue !== oldValue && this.kulBarVariant) {
            this.#startProgressBar();
        }
    }
    kulBarVariantChanged(newValue) {
        if (newValue && this.kulTimeout) {
            this.#startProgressBar();
        }
        else {
            this.kulProgress = 0;
            cancelAnimationFrame(this.#progressAnimationFrame);
        }
    }
    //#endregion
    //#region Event
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
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
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulSpinnerProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
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
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
        if (this.kulBarVariant && this.kulTimeout) {
            this.#startProgressBar();
        }
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidUpdate() {
        const root = this.rootElement.shadowRoot;
        if (root) {
            root.querySelector('#loading-wrapper-master').classList.remove('loading-wrapper-big-wait');
        }
    }
    componentDidRender() {
        const root = this.rootElement.shadowRoot;
        if (root) {
            if (this.kulFader) {
                setTimeout(() => {
                    root.querySelector('#loading-wrapper-master').classList.add('loading-wrapper-big-wait');
                }, this.kulFaderTimeout);
            }
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        let masterClass = '';
        let wrapperClass = '';
        let spinnerClass = '';
        let spinnerEl = [];
        let elStyle = undefined;
        if (this.kulBarVariant) {
            wrapperClass = 'loading-wrapper-master-bar';
            const barConfig = BAR_SPINNER_CONFIGS[this.kulLayout];
            if (barConfig) {
                spinnerClass = barConfig.className;
                spinnerEl = barConfig.elements(this.kulProgress);
            }
            else {
                spinnerClass = 'spinner-bar-v' + this.kulLayout;
            }
        }
        else {
            masterClass += ' spinner-version';
            wrapperClass = 'loading-wrapper-master-spinner';
            const config = SPINNER_CONFIGS[this.kulLayout];
            if (config) {
                spinnerClass = config.className;
                spinnerEl = config.elements();
            }
            else {
                spinnerClass = 'spinner-v' + this.kulLayout;
            }
        }
        if (!this.kulFullScreen) {
            elStyle = {
                height: '100%',
                width: '100%',
            };
        }
        if (this.kulDimensions) {
            elStyle = {
                ...elStyle,
                fontSize: this.kulDimensions,
            };
        }
        else if (!this.kulBarVariant) {
            elStyle = {
                ...elStyle,
                fontSize: '16px',
            };
        }
        else {
            elStyle = {
                ...elStyle,
                fontSize: '3px',
            };
        }
        return (h(Host, { key: 'a06275f8429b03777b1b9cc650234b5093650667', style: elStyle }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '1b5a3f5df450f7ea67d4c0f724961ab7465d0de0', id: KUL_WRAPPER_ID, style: elStyle }, h("div", { key: '36d03a8075587fbc1a3ca89d2677f4582a9bb4a1', id: "loading-wrapper-master", class: masterClass, style: elStyle }, h("div", { key: 'e9d14d5221b2315e4f7f38a681a1cdd3ddd2a607', id: wrapperClass, style: elStyle }, h("div", { key: '5dd0a6c91b9e0c8eaba85e30bba084e738983b2d', class: spinnerClass }, spinnerEl))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        cancelAnimationFrame(this.#progressAnimationFrame);
    }
    //#region Private methods
    #startProgressBar() {
        this.kulProgress = 0;
        const startTime = Date.now();
        const duration = this.kulTimeout;
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            this.kulProgress = Math.min((elapsed / duration) * 100, 100);
            if (this.kulProgress < 100) {
                this.#progressAnimationFrame =
                    requestAnimationFrame(updateProgress);
            }
            else {
                cancelAnimationFrame(this.#progressAnimationFrame);
            }
        };
        this.#progressAnimationFrame = requestAnimationFrame(updateProgress);
    }
    static get watchers() { return {
        "kulTimeout": ["kulTimeoutChanged"],
        "kulBarVariant": ["kulBarVariantChanged"]
    }; }
};
KulSpinner.style = KulSpinnerStyle0;

export { KulBadge as kul_badge, KulButton as kul_button, KulImage as kul_image, KulList as kul_list, KulSpinner as kul_spinner };

//# sourceMappingURL=kul-badge_5.entry.js.map