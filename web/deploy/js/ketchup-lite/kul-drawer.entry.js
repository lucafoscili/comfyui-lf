import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance } from './kul-manager-8d12091b.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulDrawerProps;
(function (KulDrawerProps) {
    KulDrawerProps["kulStyle"] = "Custom style of the component.";
})(KulDrawerProps || (KulDrawerProps = {}));

const kulDrawerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_drawer_backdrop:var(--kul-drawer-backdrop, rgba(0, 0, 0, 0.32));--kul_drawer_box_shadow:var(\n    --kul-drawer-box-shadow,\n    0 8px 10px -5px rgba(0, 0, 0, 0.2),\n    0 16px 24px 2px rgba(0, 0, 0, 0.14),\n    0 6px 30px 5px rgba(0, 0, 0, 0.12)\n  );--kul_drawer_permanent_border:var(\n    --kul-drawer-permanent-border,\n    1px solid var(--kul-border-color)\n  );--kul_drawer_slide_transition:var(--kul-drawer-slide-transition, 750ms);--kul_drawer_transition:var(--kul-drawer-transition, 250ms);box-shadow:var(--kul_drawer_box_shadow);display:block;font-size:var(--kul-font-size);height:100dvh;left:calc(var(--kul-drawer-width) * -1);position:fixed;top:0;transition:left var(--kul_drawer_slide_transition) cubic-bezier(0.4, 0, 0.2, 1), right var(--kul_drawer_slide_transition) cubic-bezier(0.4, 0, 0.2, 1);width:var(--kul-drawer-width);z-index:var(--kul-drawer-zindex)}#kul-component{height:100%;width:100%}.backdrop{background:var(--kul_drawer_backdrop);display:none;height:100%;left:0;position:fixed;top:0;width:100%;z-index:var(--kul-drawer-zindex)}.drawer{height:100%;position:fixed;width:var(--kul-drawer-width);z-index:calc(var(--kul-drawer-zindex) + 1)}.drawer__content{background-color:var(--kul-drawer-background-color);box-sizing:border-box;height:100%;overflow-y:auto;width:100%}.drawer ::slotted(*){--kul-button-primary-color:var(--kul-drawer-color);--kul-button-primary-color-rgb:var(--kul-drawer-color-rgb);--kul-button-primary-color-h:var(--kul-drawer-color-h);--kul-button-primary-color-s:var(--kul-drawer-color-s);--kul-button-primary-color-l:var(--kul-drawer-color-l);--kul-switch-label-color:var(--kul-drawer-color);--kul-switch-primary-color:var(--kul-drawer-color);--kul-switch-primary-color-rgb:var(--kul-drawer-color-rgb);--kul-textfield-color:var(--kul-drawer-color);--kul-textfield-color-rgb:var(--kul-drawer-color-rgb);--kul-textfield-primary-color:var(--kul-drawer-color);--kul-textfield-primary-color-rgb:var(--kul-drawer-color-rgb);--kul-tree-color:var(--kul-drawer-color);--kul-tree-color-rgb:var(--kul-drawer-color-rgb);--kul-tree-filter-background-color:var(--kul-drawer-background-color);--kul-tree-icon-color:var(--kul-drawer-color);color:var(--kul-drawer-color);fill:var(--kul-drawer-color)}:host([kul-opened]){left:0}:host([kul-opened]) .backdrop{display:block}:host(.kul-right){left:unset;right:-100%}:host([kul-opened].kul-right){right:0}:host(.kul-permanent){box-shadow:unset;transition:all 250ms}:host(.kul-permanent) .backdrop{display:none}:host(.kul-permanent) .drawer{position:relative}:host(.kul-permanent) .drawer__content{border-right:var(--kup_drawer_permanent_border)}";
const KulDrawerStyle0 = kulDrawerCss;

const KulDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-drawer-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.opened = false;
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
     * Describes event emitted by the component.
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
     * Closes the drawer.
     */
    async close() {
        this.opened = false;
        this.onKulEvent(new CustomEvent('close'), 'close');
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
        return getProps(this, KulDrawerProps, descriptions);
    }
    /**
     * Returns the state of the drawer.
     * @returns {Promise<boolean>} True when opened, false when closed.
     */
    async isOpened() {
        return this.opened;
    }
    /**
     * Opens the drawer.
     */
    async open() {
        this.opened = true;
        this.onKulEvent(new CustomEvent('open'), 'open');
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Opens the drawer when closed and vice-versa.
     */
    async toggle() {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
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
        return (h(Host, { key: 'eb6d0c1ba6840e30d98ed47bab2e2b1f575df06c', "kul-opened": this.opened }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'e823a1978e8726673dfcc1a3e9bdc636ecd1ffa5', class: "backdrop", onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, onPointerDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            }, onTouchStart: (e) => {
                e.preventDefault();
                e.stopPropagation();
            } }), h("div", { key: '9503210e84e73547095b56449056782984b91c3f', id: KUL_WRAPPER_ID }, h("div", { key: 'bbfc4c202d3db3f03d9f84d0b2c6148224722bc5', class: 'drawer' }, h("div", { key: '5bf61bb77832398a409c315cedd9af999a2f471f', class: `drawer__content` }, h("slot", { key: 'e98ac3547fff71fc2f838d8411410b7d69be4634' }))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulDrawer.style = KulDrawerStyle0;

export { KulDrawer as kul_drawer };

//# sourceMappingURL=kul-drawer.entry.js.map