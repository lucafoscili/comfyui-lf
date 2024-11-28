import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-7cf82e95.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-72505221.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulSplashProps;
(function (KulSplashProps) {
    KulSplashProps["kulLabel"] = "The text displayed inside the badge.";
    KulSplashProps["kulStyle"] = "Custom style of the component.";
})(KulSplashProps || (KulSplashProps = {}));
//#endregion

const kulSplashCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_splash_label_color:var(\n    --kul-splash-label-color,\n    var(--kul-text-color)\n  );--kul_splash_font_family:var(\n    --kul-splash-font-family,\n    var(--kul-font-family)\n  );--kul_splash_font_size:var(--kul-splash-font-size, var(--kul-font-size));--kul_splash_background_color:var(\n    --kul-splash-background-color,\n    var(--kul-background-color)\n  );--kul_splash_label_display:var(--kul-splash-label-display, block);--kul_splash_widget_color:var(\n    --kul-splash-widget-color,\n    var(--kul-primary-color)\n  );--kul_splash_widget_height:var(--kul-splash-widget-height, 150px);--kul_splash_widget_width:var(--kul-splash-widget-width, 150px)}.modal{--kul-spinner-color:var(--kul_splash_widget_color);background:var(--kul_splash_background_color);display:flex;height:100dvh;left:0;opacity:1;position:fixed;top:0;transition:opacity 0.5s ease-out;width:100dvw;z-index:999}.modal.active{opacity:0}.wrapper{margin:auto}.widget{height:var(--kul_splash_widget_height);margin:auto;width:var(--kul_splash_widget_width)}.label{color:var(--kul_splash_label_color);display:var(--kul_splash_label_display);font-family:var(--kul_splash_font_family);font-size:var(--kul_splash_font_size);font-weight:bold;letter-spacing:2px;text-align:center}";
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
    //#endregion
    //#region Internal variables
    #kulManager = kulManagerInstance();
    //#endregion
    //#region Events
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    //#endregion
    //#region Public methods
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
    //#endregion
    //#region Lifecycle hooks
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
        return (h(Host, { key: '62e74a9398dbbc28fb9e69849952a446c7a1e222' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'd7e96b6a5d8a79928f20c049cd5d87c69c272128', id: KUL_WRAPPER_ID }, h("div", { key: 'c3b6422d83abc78b1bbffb606339952f8683c7ad', class: 'modal' +
                (this.state === 'unmounting' ? ' active' : '') }, h("div", { key: 'f97028634fccdb1b8579dd8ea4da75e5cea492aa', class: "wrapper" }, h("div", { key: '37caef5319a388fca0484703a10d52a55ddad843', class: "widget" }, h("slot", { key: '9bf598f7599d54c1a2321f1cb38b113bea57cf54' })), h("div", { key: '9f6096e14d8967e237068928dbd9468fcebe2b5c', class: "label" }, this.state === 'unmounting'
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