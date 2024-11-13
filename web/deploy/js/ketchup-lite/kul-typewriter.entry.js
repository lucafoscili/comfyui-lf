import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, F as Fragment, H as Host } from './index-4ebcb21f.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-74b8aa66.js';
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

const KulTypewriter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-typewriter-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.displayedText = '';
        this.isDeleting = false;
        this.currentTextIndex = 0;
        this.kulCursor = true;
        this.kulDeleteSpeed = 50;
        this.kulLoop = false;
        this.kulPause = 500;
        this.kulSpeed = 50;
        this.kulStyle = '';
        this.kulValue = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #timeout;
    #texts = [];
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes the component's events.
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
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    initializeTexts() {
        this.#texts = Array.isArray(this.kulValue)
            ? this.kulValue
            : [this.kulValue];
    }
    startTyping() {
        const currentText = this.#texts[this.currentTextIndex] || '';
        if (this.isDeleting) {
            this.displayedText = currentText.substring(0, this.displayedText.length - 1);
        }
        else {
            this.displayedText = currentText.substring(0, this.displayedText.length + 1);
        }
        if (!this.isDeleting && this.displayedText === currentText) {
            this.#timeout = setTimeout(() => {
                if (this.kulLoop)
                    this.isDeleting = true;
            }, this.kulPause);
        }
        else if (this.isDeleting && this.displayedText === '') {
            this.isDeleting = false;
            this.currentTextIndex =
                (this.currentTextIndex + 1) % this.#texts.length;
        }
        else {
            const delay = this.isDeleting ? this.kulDeleteSpeed : this.kulSpeed;
            this.#timeout = setTimeout(() => this.startTyping(), delay);
        }
    }
    resetTyping() {
        clearTimeout(this.#timeout);
        this.displayedText = '';
        this.isDeleting = false;
        this.currentTextIndex = 0;
        this.startTyping();
    }
    #prepText() {
        return (h(Fragment, null, h("span", null, this.displayedText), this.kulCursor ? h("span", { class: "cursor" }, "|") : null));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.initializeTexts();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.startTyping();
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: 'f2e7a7397e2d1dee101ee0ab1c4127ac312c1ccf' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'ede2788cfa49db8eaeb3bb710abd6932cdc9769b', id: KUL_WRAPPER_ID }, this.#prepText())));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        clearTimeout(this.#timeout);
    }
    static get watchers() { return {
        "kulValue": ["handleKulValueChange"]
    }; }
};
KulTypewriter.style = KulTypewriterStyle0;

export { KulTypewriter as kul_typewriter };

//# sourceMappingURL=kul-typewriter.entry.js.map