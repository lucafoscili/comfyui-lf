import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-7f37b7be.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, a as KulDataCyAttributes, b as KUL_STYLE_ID } from './kul-manager-c62793b7.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulSliderProps;
(function (KulSliderProps) {
    KulSliderProps["kulDisabled"] = "When true, the component is disabled, preventing user interaction.";
    KulSliderProps["kulLabel"] = "Defines text to display as a label for the slider.";
    KulSliderProps["kulLeadingLabel"] = "When true, displays the label before the slider component.";
    KulSliderProps["kulMax"] = "The maximum value allowed by the slider.";
    KulSliderProps["kulMin"] = "The minimum value allowed by the slider.";
    KulSliderProps["kulRipple"] = "Adds a ripple effect when interacting with the slider.";
    KulSliderProps["kulStep"] = "Sets the increment or decrement steps for the slider.";
    KulSliderProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulSliderProps["kulValue"] = "The initial numeric value of the slider within the defined range.";
})(KulSliderProps || (KulSliderProps = {}));

const kulSliderCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_slider_font_family:var(\n    --kul-slider-font-family,\n    var(--kul-font-family)\n  );--kul_slider_font_size:var(--kul-slider-font-size, var(--kul-font-size));--kul_slider_font_weight:var(--kul-slider-font-weight, 400);--kul_slider_label_color:var(\n    --kul-slider-label-color,\n    var(--kul-text-color)\n  );--kul_slider_primary_color:var(\n    --kul-slider-primary-color,\n    var(--kul-primary-color)\n  );--kul_slider_primary_color_rgb:var(\n    --kul-slider-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_slider_thumb_color:var(\n    --kul-slider-thumb-color,\n    var(--kul-border-color)\n  );--kul_slider_label_font_size:var(--kul-slider-label-font-size, 0.875em);--kul_slider_label_line_height:var(--kul-slider-label-line-height, 2em);--kul_slider_label_letter_spacing:var(\n    --kul-slider-label-letter-spacing,\n    0.0178571429em\n  );--kul_slider_label_padding_left:var(--kul-slider-label-padding-left, 4px);--kul_slider_label_padding_right:var(--kul-slider-label-padding-right, 4px);--kul_slider_margin:var(--kul-slider-margin, 0 0.75em);--kul_slider_min_width:var(--kul-slider-min-width, 120px);--kul_slider_value_bottom_position:var(\n    --kul-slider-value-bottom-position,\n    -3em\n  );--kul_slider_value_font_weight:var(--kul-slider-value-font-weight, 500);--kul_slider_value_font_size:var(--kul-slider-value-font-size, 0.875em);--kul_slider_disabled_opacity:var(--kul-slider-disabled-opacity, 0.5);--kul_slider_track_height:var(--kul-slider-track-height, 6px);--kul_slider_track_border_radius:var(--kul-slider-track-border-radius, 12px);--kul_slider_backdrop_filter:var(--kul-slider-backdrop-filter, blur(10px));--kul_slider_box_shadow:var(\n    --kul-slider-box-shadow,\n    0px 4px 8px rgba(0, 0, 0, 0.2)\n  );--kul_slider_transition_duration:var(--kul-slider-transition-duration, 0.3s);--kul_slider_thumb_underlay_top:var(--kul-slider-thumb-underlay-top, -9px);--kul_slider_thumb_width:var(--kul-slider-thumb-width, 24px);--kul_slider_thumb_height:var(--kul-slider-thumb-height, 24px);--kul_slider_thumb_border_radius:var(--kul-slider-thumb-border-radius, 50%);--kul_slider_thumb_backdrop_filter:var(\n    --kul-slider-thumb-backdrop-filter,\n    blur(10px)\n  );--kul_slider_thumb_backdrop_filter_active:var(\n    --kul-slider-thumb-backdrop-filter-active,\n    blur(12px)\n  );--kul_slider_thumb_box_shadow:var(\n    --kul-slider-thumb-box-shadow,\n    0px 4px 8px rgba(0, 0, 0, 0.2)\n  );--kul_slider_thumb_hover_scale:var(--kul-slider-thumb-hover-scale, 1.1);--kul_slider_thumb_active_after_scale:var(\n    --kul-slider-thumb-active-after-scale,\n    1.5\n  );display:block;font-family:var(--kul_slider_font_family);font-size:var(--kul_slider_font_size)}.form-field{font-size:var(--kul_slider_label_font_size);line-height:var(--kul_slider_label_line_height);font-weight:var(--kul_slider_font_weight);letter-spacing:var(--kul_slider_label_letter_spacing);color:var(--kul_slider_label_color);display:inline-flex;align-items:center;vertical-align:middle}.form-field--align-end .form-field__label{margin-left:auto;margin-right:0;padding-left:0;padding-right:var(--kul_slider_label_padding_right);order:-1}.slider{position:relative;display:block;outline:none;user-select:none;margin:var(--kul_slider_margin);min-width:var(--kul_slider_min_width);width:100%}.slider__label{color:var(--kul_slider_label_color);cursor:pointer;font-family:var(--kul_slider_font_family);margin-left:0;margin-right:auto;padding-left:var(--kul_slider_label_padding_left);padding-right:0;user-select:none}.slider__value{position:absolute;bottom:var(--kul_slider_value_bottom_position);left:50%;transform:translateX(-50%);color:var(--kul_slider_label_color);font-weight:var(--kul_slider_value_font_weight);font-size:var(--kul_slider_value_font_size);white-space:nowrap}.slider--disabled{cursor:auto;opacity:var(--kul_slider_disabled_opacity);pointer-events:none}.slider--checked__track{background:rgba(var(--kul_slider_primary_color_rgb), 0.75)}.slider__track{box-sizing:border-box;width:100%;height:var(--kul_slider_track_height);border-radius:var(--kul_slider_track_border_radius);background:rgba(var(--kul_slider_primary_color_rgb), 0.2);backdrop-filter:var(--kul_slider_backdrop_filter);box-shadow:var(--kul_slider_box_shadow);transition:background-color var(--kul_slider_transition_duration)}.slider__thumb-underlay{position:absolute;top:var(--kul_slider_thumb_underlay_top);left:calc(var(--slider-value));transform:translateX(-50%);width:var(--kul_slider_thumb_width);height:var(--kul_slider_thumb_height);display:flex;align-items:center;justify-content:center;border-radius:var(--kul_slider_thumb_border_radius);backdrop-filter:var(--kul_slider_thumb_backdrop_filter);transition:left var(--kul_slider_transition_duration);pointer-events:none}.slider__thumb{width:var(--kul_slider_thumb_width);height:var(--kul_slider_thumb_height);background:rgba(var(--kul_slider_primary_color_rgb), 0.6);border-radius:var(--kul_slider_thumb_border_radius);backdrop-filter:var(--kul_slider_thumb_backdrop_filter_active);box-shadow:var(--kul_slider_thumb_box_shadow);transition:background-color var(--kul_slider_transition_duration), transform var(--kul_slider_transition_duration);cursor:pointer}.slider__thumb:hover{transform:scale(var(--kul_slider_thumb_hover_scale));background:rgba(var(--kul_slider_primary_color_rgb), 0.8)}.slider__native-control{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer;z-index:2}:host(.kul-danger){--kul-slider-primary-color:var(--kul-danger-color);--kul-slider-primary-color-rgb:var(--kul-danger-color-rgb)}:host(.kul-info){--kul-slider-primary-color:var(--kul-info-color);--kul-slider-primary-color-rgb:var(--kul-info-color-rgb)}:host(.kul-secondary){--kul-slider-primary-color:var(--kul-secondary-color);--kul-slider-primary-color-rgb:var(--kul-secondary-color-rgb)}:host(.kul-success){--kul-slider-primary-color:var(--kul-success-color);--kul-slider-primary-color-rgb:var(--kul-success-color-rgb)}:host(.kul-warning){--kul-slider-primary-color:var(--kul-warning-color);--kul-slider-primary-color-rgb:var(--kul-warning-color-rgb)}";
const KulSliderStyle0 = kulSliderCss;

const KulSlider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-slider-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = 0;
        this.kulDisabled = false;
        this.kulLabel = '';
        this.kulLeadingLabel = false;
        this.kulMax = 100;
        this.kulMin = 0;
        this.kulStep = 1;
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulValue = 50;
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
     * Describes event emitted for various slider interactions like click, focus, blur.
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
        return getProps(this, KulSliderProps, descriptions);
    }
    /**
     * Used to retrieve the component's current state.
     * @returns {Promise<KulSliderState>} Promise resolved with the current state of the component.
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
     * @param {KulSliderState} value - The new state to be set on the component.
     * @returns {Promise<void>}
     */
    async setValue(value) {
        this.value = value;
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
        if (this.kulValue) {
            this.value = this.kulValue;
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
            slider: true,
            'slider--disabled': this.kulDisabled,
        };
        const formClassName = {
            'form-field': true,
            'form-field--align-end': this.kulLeadingLabel,
        };
        return (h(Host, { key: 'f947aae0db9ce78d397bb24de5de60b2726f587a' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '15e0b9dfdc0f6f9e1b95bcd23f0ab7377a993f48', id: KUL_WRAPPER_ID }, h("div", { key: '13f721be7264bf78a5f1626c1298b97db0db865e', class: formClassName }, h("div", { key: '457fa07ea128db85b80161664ff2bc2dc38d99b1', class: className, style: {
                '--slider-value': `${((this.value - this.kulMin) / (this.kulMax - this.kulMin)) * 100}%`,
            } }, h("input", { key: '111c8a9c94ea16dc44ded468d904ddc6025477a9', type: "range", class: "slider__native-control", "data-cy": KulDataCyAttributes.INPUT, min: this.kulMin, max: this.kulMax, step: this.kulStep, value: this.value, disabled: this.kulDisabled, onBlur: (e) => {
                this.onKulEvent(e, 'blur');
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus');
            }, onInput: (e) => {
                this.value = +this.#input.value;
                this.onKulEvent(e, 'input');
            }, onPointerDown: (e) => {
                this.onKulEvent(e, 'pointerdown');
            }, ref: (el) => {
                if (el) {
                    this.#input = el;
                }
            } }), h("div", { key: '389bd05d56ac34661d4070760fc1eb0fa160f63e', class: "slider__track" }, h("div", { key: '20512967ba6787f8d99ac629b6ffee35a065a627', class: "slider__thumb-underlay" }, h("div", { key: '7363818661b9bc65339caacc4e7407e006493625', class: "slider__thumb", ref: (el) => {
                if (this.kulRipple) {
                    this.#rippleSurface = el;
                }
            } }))), h("span", { key: 'cc83eedcee1ffb04944e0044372c35ccb016a7d7', class: "slider__value" }, this.value)), h("label", { key: '51b63b8f07447b94c873c4b8370463bc379a07fc', class: "form-field__label" }, this.kulLabel)))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulSlider.style = KulSliderStyle0;

export { KulSlider as kul_slider };

//# sourceMappingURL=kul-slider.entry.js.map