import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement, F as Fragment } from './index-64e8bec6.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulTypewriterProps;
(function (KulTypewriterProps) {
    KulTypewriterProps["kulCursor"] = "Enables or disables the blinking cursor.";
    KulTypewriterProps["kulDeleteSpeed"] = "Sets the deleting speed in milliseconds.";
    KulTypewriterProps["kulLoop"] = "Enables or disables looping of the text.";
    KulTypewriterProps["kulPause"] = "Sets the duration of the pause after typing a complete text.";
    KulTypewriterProps["kulSpeed"] = "Sets the typing speed in milliseconds.";
    KulTypewriterProps["kulStyle"] = "Custom style of the component.";
    KulTypewriterProps["kulValue"] = "Sets the text or array of texts to display with the typewriter effect.";
})(KulTypewriterProps || (KulTypewriterProps = {}));

const kulTypewriterCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul-typewriter-text-color:var(\n    --kul-typewriter-text-color,\n    var(--kul-typewriter-text-color)\n  );--kul-typewriter-cursor-width:var(--kul-typewriter-cursor-width, 3px);--kul-typewriter-cursor-color:var(\n    --kul-typewriter-cursor-color,\n    var(--kul-typewriter-text-color)\n  );--kul-typewriter-font-size:var(\n    --kul-typewriter-font-size,\n    var(--kul-font-size)\n  );--kul-typewriter-font-family:var(\n    --kul-typewriter-font-family,\n    var(--kul-font-family)\n  );align-items:center;display:inline-flex;color:var(--kul-typewriter-text-color);font-size:var(--kul-typewriter-font-size);font-family:var(--kul-typewriter-font-family)}.cursor{display:inline-block;width:var(--kul-typewriter-cursor-width);background-color:var(--kul-typewriter-cursor-color);margin-left:2px;animation:blink 0.8s infinite}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}";
const KulTypewriterStyle0 = kulTypewriterCss;

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m")
        throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulTypewriter_instances, _KulTypewriter_kulManager, _KulTypewriter_timeout, _KulTypewriter_texts, _KulTypewriter_prepText;
const KulTypewriter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-typewriter-event", 6);
        _KulTypewriter_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulTypewriter_kulManager.set(this, kulManagerInstance());
        _KulTypewriter_timeout.set(this, void 0);
        _KulTypewriter_texts.set(this, []);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.displayedText = "";
        this.isDeleting = false;
        this.currentTextIndex = 0;
        this.kulCursor = true;
        this.kulDeleteSpeed = 50;
        this.kulLoop = false;
        this.kulPause = 500;
        this.kulSpeed = 50;
        this.kulStyle = "";
        this.kulValue = "";
    }
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
    handleKulValueChange() {
        this.initializeTexts();
        this.resetTyping();
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
        return getProps(this, KulTypewriterProps, descriptions);
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
            this.onKulEvent(new CustomEvent("unmount"), "unmount");
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    initializeTexts() {
        __classPrivateFieldSet(this, _KulTypewriter_texts, Array.isArray(this.kulValue)
            ? this.kulValue
            : [this.kulValue], "f");
    }
    startTyping() {
        const currentText = __classPrivateFieldGet(this, _KulTypewriter_texts, "f")[this.currentTextIndex] || "";
        if (this.isDeleting) {
            this.displayedText = currentText.substring(0, this.displayedText.length - 1);
        }
        else {
            this.displayedText = currentText.substring(0, this.displayedText.length + 1);
        }
        if (!this.isDeleting && this.displayedText === currentText) {
            __classPrivateFieldSet(this, _KulTypewriter_timeout, setTimeout(() => {
                if (this.kulLoop)
                    this.isDeleting = true;
            }, this.kulPause), "f");
        }
        else if (this.isDeleting && this.displayedText === "") {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % __classPrivateFieldGet(this, _KulTypewriter_texts, "f").length;
        }
        else {
            const delay = this.isDeleting ? this.kulDeleteSpeed : this.kulSpeed;
            __classPrivateFieldSet(this, _KulTypewriter_timeout, setTimeout(() => this.startTyping(), delay), "f");
        }
    }
    resetTyping() {
        clearTimeout(__classPrivateFieldGet(this, _KulTypewriter_timeout, "f"));
        this.displayedText = "";
        this.isDeleting = false;
        this.currentTextIndex = 0;
        this.startTyping();
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulTypewriter_kulManager, "f").theme.register(this);
        this.initializeTexts();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        this.startTyping();
        __classPrivateFieldGet(this, _KulTypewriter_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulTypewriter_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulTypewriter_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        return (h(Host, { key: 'e110d77929d30da29c59c7b56496a53b6bff9db9' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulTypewriter_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: '941353991533e700eada58e307a0247ece76fea6', id: KUL_WRAPPER_ID }, __classPrivateFieldGet(this, _KulTypewriter_instances, "m", _KulTypewriter_prepText).call(this))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulTypewriter_kulManager, "f").theme.unregister(this);
        clearTimeout(__classPrivateFieldGet(this, _KulTypewriter_timeout, "f"));
    }
    get rootElement() { return getElement(this); }
    static get watchers() { return {
        "kulValue": ["handleKulValueChange"]
    }; }
};
_KulTypewriter_kulManager = new WeakMap(), _KulTypewriter_timeout = new WeakMap(), _KulTypewriter_texts = new WeakMap(), _KulTypewriter_instances = new WeakSet(), _KulTypewriter_prepText = function _KulTypewriter_prepText() {
    return (h(Fragment, null, h("span", null, this.displayedText), this.kulCursor ? h("span", { class: "cursor" }, "|") : null));
};
KulTypewriter.style = KulTypewriterStyle0;

export { KulTypewriter as kul_typewriter };

//# sourceMappingURL=kul-typewriter.entry.js.map