import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, a as getAssetPath, h, H as Host } from './index-4d533537.js';
import { a as KulDataCyAttributes, K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';
import { k as kulManagerInstance } from './kul-manager-8d12091b.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulAccordionProps;
(function (KulAccordionProps) {
    KulAccordionProps["kulData"] = "Actual data of the accordion.";
    KulAccordionProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulAccordionProps["kulStyle"] = "Sets a custom CSS style for the component.";
})(KulAccordionProps || (KulAccordionProps = {}));

const kulAccordionCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_accordion_backdrop_filter:var(\n    --kul-accordion-backdrop-filter,\n    blur(3.5px)\n  );--kul_accordion_background_color:var(\n    --kul-accordion-background-color,\n    var(--kul-background-color)\n  );--kul_accordion_border:var(\n    --kul-accordion-border,\n    1px solid var(--kul-border-color)\n  );--kul_accordion_border_radius:var(--kul-accordion-border-radius, 4px);--kul-accordion_dropdown_icon_color:var(\n    --kul-accordion-dropdown-icon-color,\n    var(--kul-text-color)\n  );--kul_accordion_font_family:var(\n    --kul-accordion-font-family,\n    var(--kul-font-family)\n  );--kul_accordion_font_size:var(\n    --kul-accordion-font-size,\n    var(--kul-font-size)\n  );--kul_accordion_background_color_hover:var(\n    --kul-accordion-background-color-hover,\n    rgba(var(--kul-text-color-rgb), 0.175)\n  );--kul_accordion_color_hover:var(\n    --kul-accordion-color-hover,\n    var(--kul-text-color)\n  );--kul_accordion_padding:var(--kul-accordion-padding, 1em 1.5em);--kul_accordion_primary_color:var(\n    --kul-accordion-primary-color,\n    var(--kul-primary-color)\n  );--kul_accordion_primary_color_rgb:var(\n    --kul-accordion-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_accordion_text_color:var(\n    --kul-accordion-text-color,\n    var(--kul-text-color)\n  );--kul_accordion_text_on_primary_color:var(\n    --kul-accordion-text-on-primary-color,\n    var(--kul-text-on-primary-color)\n  );--kul_accordion_transition:var(--kul-accordion-transition, 80ms);display:block;font-family:var(--kul_accordion_font_family);font-size:var(--kul_accordion_font_size)}.accordion{-webkit-backdrop-filter:var(--kul_accordion_backdrop_filter);backdrop-filter:var(--kul_accordion_backdrop_filter);background-color:var(--kul_accordion_background_color);border-bottom:var(--kul_accordion_border);border-radius:var(--kul_accordion_border_radius);border-top:var(--kul_accordion_border);display:flex;flex-wrap:wrap;flex-direction:column;width:100%}.node{border-left:var(--kul_accordion_border);border-right:var(--kul_accordion_border);box-sizing:border-box;width:100%}.node:not(:first-of-type){border-top:var(--kul_accordion_border)}.node__header{align-items:center;border:none;box-sizing:border-box;color:var(--kul_accordion_text_color);cursor:pointer;display:flex;line-height:1.75em;outline:none;padding:var(--kul_accordion_padding);position:relative;text-align:left;transition:background-color var(--kul_accordion_transition), color var(--kul_accordion_transition);width:100%}.node__header:hover:not(.node__header--selected){color:var(--kul_accordion_color_hover);background-color:var(--kul_accordion_background_color_hover)}.node__header--expanded{color:var(--kul_accordion_color_hover);background-color:var(--kul_accordion_background_color_hover)}.node__header--expanded .node__dropdown{transform:rotate(-180deg)}.node__header--selected{background-color:rgba(var(--kul_accordion_primary_color_rgb), 0.175)}.node__text{margin-right:0.5em;overflow:hidden;text-overflow:ellipsis;white-space:pre}.node__text--highlighted{color:var(--kul_accordion_text_on_primary_color);background-color:var(--kul_accordion_primary_color)}.node__dropdown,.node__expand,.node__icon{background-color:var(--kul_accordion_text_color);height:1.5em;margin:0;width:1.5em}.node__icon{margin-left:0;margin-right:0.5em}.node__expand{margin-left:auto;-webkit-mask:var(--kul-dropdown-icon);mask:var(--kul-dropdown-icon);overflow:hidden;transition:transform 125ms ease}.node__expand:hover{transform:scale(1.25)}.node__expand--expanded{-webkit-mask:var(--kul-expanded-icon);mask:var(--kul-expanded-icon);transform:rotate(180deg)}.node__expand--expanded:hover{transform:rotate(-180deg) scale(1.25)}.node__expand--placeholder{visibility:hidden}.node__dropdown{background-color:var(--kul-accordion_dropdown_icon_color);height:1.5em;margin-left:auto;margin-right:0;min-width:1.5em;width:1.5em;transition:transform var(--kul_accordion_transition)}.node__content{animation:fade-in-block 0.25s ease-out}:host(.kul-borderless){--kul-accordion-border:none}:host(.kul-full-height){height:100%}:host(.kul-full-width){width:100%}:host(.kul-danger){--kul-accordion-primary-color:var(--kul-danger-color);--kul-accordion-primary-color-rgb:var(--kul-danger-color-rgb);--kul-accordion-text-on-primary-color:white}:host(.kul-info){--kul-accordion-primary-color:var(--kul-info-color);--kul-accordion-primary-color-rgb:var(--kul-info-color-rgb);--kul-accordion-text-on-primary-color:white}:host(.kul-secondary){--kul-accordion-primary-color:var(--kul-secondary-color);--kul-accordion-primary-color-rgb:var(--kul-secondary-color-rgb);--kul-accordion-text-on-primary-color:var(--kul-text-on-secondary-color)}:host(.kul-success){--kul-accordion-primary-color:var(--kul-success-color);--kul-accordion-primary-color-rgb:var(--kul-success-color-rgb);--kul-accordion-text-on-primary-color:white}:host(.kul-warning){--kul-accordion-primary-color:var(--kul-warning-color);--kul-accordion-primary-color-rgb:var(--kul-warning-color-rgb);--kul-accordion-text-on-primary-color:white}";
const KulAccordionStyle0 = kulAccordionCss;

const KulAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-accordion-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.expandedNodes = new Set();
        this.selectedNodes = new Set();
        this.kulData = null;
        this.kulRipple = true;
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #rippleSurface = {};
    #slotsNames = [];
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, node) {
        switch (eventType) {
            case 'pointerdown':
                if (this.kulRipple) {
                    this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface[node.id]);
                }
                break;
        }
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
     * Used to retrieve component's properties and descriptions.
     * @param {boolean} descriptions - When true, includes descriptions for each property.
     * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
     */
    async getProps(descriptions) {
        return getProps(this, KulAccordionProps, descriptions);
    }
    /**
     * Returns the selected nodes.
     * @returns {Promise<KulDataNode[]>} Selected nodes.
     */
    async getSelectedNodes() {
        return this.selectedNodes;
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * This method activates or deactivates an node.
     * @param {string} id - Id of the node.
     */
    async toggleNode(id, e) {
        const node = this.kulData.nodes.find((n) => n.id === id);
        if (!node) {
            return;
        }
        if (this.#isExpandible(node)) {
            if (this.#isExpanded(node)) {
                this.expandedNodes.delete(node);
            }
            else {
                this.expandedNodes.add(node);
            }
        }
        else if (this.#isSelected(node)) {
            this.selectedNodes.delete(node);
        }
        else {
            this.selectedNodes.add(node);
        }
        if (!this.#isExpandible(node)) {
            this.onKulEvent(e || new CustomEvent('click'), 'click');
        }
        this.refresh();
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
    #isExpanded(node) {
        return this.expandedNodes.has(node);
    }
    #isExpandible(node) {
        return this.#slotsNames.includes(node.id);
    }
    #isSelected(node) {
        return this.selectedNodes.has(node);
    }
    #prepIcon(icon) {
        const path = getAssetPath(`./assets/svg/${icon}.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return h("div", { class: 'node__icon', style: style });
    }
    #prepAccordion() {
        const nodes = [];
        const slots = Array.prototype.slice.call(this.rootElement.children, 0);
        this.#slotsNames = [];
        for (let index = 0; index < slots.length; index++) {
            const slot = slots[index];
            this.#slotsNames.push(slot.slot);
        }
        for (let i = 0; i < this.kulData.nodes.length; i++) {
            const node = this.kulData.nodes[i];
            const isExpanded = this.#isExpanded(node);
            const isExpandible = this.#isExpandible(node);
            const isSelected = this.#isSelected(node);
            const headerClassName = {
                node__header: true,
                'node__header--selected': !isExpandible && isSelected ? true : false,
                'node__header--expanded': isExpandible && isExpanded ? true : false,
            };
            const contentClassname = {
                node__content: true,
                'node__content--selected': isSelected ? true : false,
            };
            nodes.push(h("div", { class: "node" }, h("div", { tabindex: "1", title: node.description, class: headerClassName, "data-cy": isExpandible
                    ? undefined
                    : KulDataCyAttributes.BUTTON, onClick: (e) => this.toggleNode(node.id, e), onPointerDown: (e) => {
                    this.onKulEvent(e, 'pointerdown', node);
                } }, h("div", { ref: (el) => {
                    if (el && this.kulRipple) {
                        this.#rippleSurface[node.id] = el;
                    }
                } }), node.icon ? this.#prepIcon(node.icon) : null, h("span", { class: "node__text" }, node.value), isExpandible ? (h("div", { class: `node__expand ${isExpanded ? 'node__expand--expanded' : ''} ` })) : null), isExpanded ? (h("div", { class: contentClassname }, h("slot", { name: node.id }))) : null));
        }
        return nodes;
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
        if (Object.keys(this.#rippleSurface).length) {
            for (const key in this.#rippleSurface) {
                if (Object.prototype.hasOwnProperty.call(this.#rippleSurface, key)) {
                    const surface = this.#rippleSurface[key];
                    this.#kulManager.theme.ripple.setup(surface);
                }
            }
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        this.#rippleSurface = {};
        return (h(Host, { key: '51e0579637b4d70fc882c43afa30e3a8ea948610' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '0bcf7ba149a4fc2952fe1674e589c7a7f01585af', id: KUL_WRAPPER_ID }, h("div", { key: 'a33784bc3e08d5dd5e23413e8b07d24de75928c1', class: "accordion" }, this.#prepAccordion()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulAccordion.style = KulAccordionStyle0;

export { KulAccordion as kul_accordion };

//# sourceMappingURL=kul-accordion.entry.js.map