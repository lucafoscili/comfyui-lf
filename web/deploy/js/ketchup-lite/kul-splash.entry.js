import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance } from './kul-manager-8d12091b.js';
import { g as getProps } from './componentUtils-a994b230.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';

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
        return (h(Host, { key: '7d4ab47e92e4c5ed32820ed766db52b21a22c7a5' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'c860adebac9a46ec420400889c812d88e310e8b3', id: KUL_WRAPPER_ID }, h("div", { key: 'ccb1d9b5bf8f9157bc394b4312efdf51bed6da2c', class: 'modal' +
                (this.state === 'unmounting' ? ' active' : '') }, h("div", { key: 'a5a3ce70a03f368b7451588f0669cff1bd507c69', class: "wrapper" }, h("div", { key: '0b90e6df936e1d240d36b511254df4fe1468459f', class: "widget" }, h("slot", { key: 'b8201708fba2e3a96a4800fe0e2a4f50fc900eb8' })), h("div", { key: 'b7eb459a86f8433643a4653d86251f5341ee5b18', class: "label" }, this.state === 'unmounting'
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