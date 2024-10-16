import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps } from './kul-manager-57799b8b.js';
import { K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './GenericVariables-0efba181.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulSplashProps;
(function (KulSplashProps) {
    KulSplashProps["kulLabel"] = "The text displayed inside the badge.";
    KulSplashProps["kulStyle"] = "Custom style of the component.";
})(KulSplashProps || (KulSplashProps = {}));

const kulSplashCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_splash_label_color:var(\n    --kul-splash-label-color,\n    var(--kul-text-color)\n  );--kul_splash_font_family:var(\n    --kul-splash-font-family,\n    var(--kul-font-family)\n  );--kul_splash_font_size:var(--kul-splash-font-size, var(--kul-font-size));--kul_splash_background_color:var(\n    --kul-splash-background-color,\n    var(--kul-background-color)\n  );--kul_splash_label_display:var(--kul-splash-label-display, block);--kul_splash_widget_color:var(\n    --kul-splash-widget-color,\n    var(--kul-primary-color)\n  );--kul_splash_widget_height:var(--kul-splash-widget-height, 150px);--kul_splash_widget_width:var(--kul-splash-widget-width, 150px)}.modal{--kul-spinner-color:var(--kul_splash_widget_color);background:var(--kul_splash_background_color);display:flex;height:100dvh;left:0;opacity:1;position:fixed;top:0;transition:opacity 0.5s ease-out;width:100dvw;z-index:999}.modal.active{opacity:0}.wrapper{margin:auto}.widget{height:var(--kul_splash_widget_height);margin:auto;width:var(--kul_splash_widget_width)}.label{color:var(--kul_splash_label_color);display:var(--kul_splash_label_display);font-family:var(--kul_splash_font_family);font-size:var(--kul_splash_font_size);font-weight:bold;letter-spacing:2px;text-align:center}";
const KulSplashStyle0 = kulSplashCss;

const KulSplash = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-splash-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.state = 'initializing';
        this.kulLabel = 'Loading...';
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
        return getProps(this, KulSplashProps, descriptions);
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
    async unmount(ms = 575) {
        setTimeout(() => {
            this.state = 'unmounting';
            setTimeout(() => {
                this.onKulEvent(new CustomEvent('unmount'), 'unmount');
                this.rootElement.remove();
            }, 300);
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
        return (h(Host, { key: '5b6e27e2bb73290fcab5e7c6bc211f0faac7f416' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '1676da109f7475bad036dfb6a8075fd07f2321f0', id: KUL_WRAPPER_ID }, h("div", { key: 'd62b5c099426fd8331b08c3ac813efc51277ad3b', class: 'modal' +
                (this.state === 'unmounting' ? ' active' : '') }, h("div", { key: '8a7dd24f3924a16a1b1f3112bca9dfc65c33c642', class: "wrapper" }, h("div", { key: 'a6931e3d74bbb9a69bf3cf9490d69e91f27d5018', class: "widget" }, h("slot", { key: 'e03d18d3d3c2f27c72476df10f1504ba5eb664b6' })), h("div", { key: '9a062311121256d15ffb11a5e991599edd5d6b65', class: "label" }, this.state === 'unmounting'
            ? 'Ready!'
            : this.kulLabel))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulSplash.style = KulSplashStyle0;

export { KulSplash as kul_splash };

//# sourceMappingURL=kul-splash.entry.js.map