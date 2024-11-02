import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, F as Fragment, H as Host } from './index-4d533537.js';
import { k as kulManagerInstance, b as KulLanguageGeneric } from './kul-manager-26d0782a.js';
import { g as getProps } from './componentUtils-a994b230.js';
import { K as KUL_WRAPPER_ID, c as KUL_STYLE_ID } from './GenericVariables-f3380974.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulArticleProps;
(function (KulArticleProps) {
    KulArticleProps["kulData"] = "Actual data of the article";
    KulArticleProps["kulStyle"] = "Custom style of the component.";
})(KulArticleProps || (KulArticleProps = {}));

const kulArticleCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_article_content_color:var(\n    --kul-article-content-color,\n    var(--kul-text-color)\n  );--kul_article_content_font_family:var(\n    --kul-article-content-font-family,\n    var(--kul-font-family)\n  );--kul_article_content_font_size:var(\n    --kul-article-content-font-size,\n    var(--kul-font-size)\n  );--kul_article_h1_color:var(--kul-article-h1-color, var(--kul-text-color));--kul_article_h1_font_family:var(\n    --kul-article-h1-font-family,\n    var(--kul-font-family)\n  );--kul_article_h1_font_size:var(\n    --kul-article-h1-font-size,\n    calc(var(--kul-font-size) * 1.25)\n  );--kul_article_h2_color:var(--kul-article-h2-color, var(--kul-text-color));--kul_article_h2_font_family:var(\n    --kul-article-h2-font-family,\n    var(--kul-font-family)\n  );--kul_article_h2_font_size:var(\n    --kul-article-h2-font-size,\n    calc(var(--kul-font-size) * 1.125)\n  );--kul_article_h3_color:var(--kul-article-h3-color, var(--kul-text-color));--kul_article_h3_font_family:var(\n    --kul-article-h3-font-family,\n    var(--kul-font-family)\n  );--kul_article_h3_font_size:var(--kul-article-h3-font-size, 1.5em);--kul_article_margin:var(--kul-article-margin, auto);--kul_article_max_width:var(--kul-article-max-width, 1200px);--kul_article_padding:var(--kul-article-padding, 40px);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);background-color:rgba(var(--kul-background-color-rgb), 0.375);display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}.article{margin:var(--kul_article_margin);max-width:var(--kul_article_max_width);padding:var(--kul_article_padding)}.content{color:var(--kul_article_content_color);font-family:var(--kul_article_content_font_family);font-size:var(--kul_article_content_font_size)}h1{color:var(--kul_article_h1_color);font-family:var(--kul_article_h1_font_family);font-size:var(--kul_article_h1_font_size);font-size:2.375em;font-weight:600;line-height:1.2;margin-bottom:1.25em;word-break:break-word}h2{color:var(--kul_article_h2_color);font-family:var(--kul_article_h2_font_family);font-size:var(--kul_article_h2_font_size);font-size:2em;font-weight:500;line-height:1.2;margin-bottom:0.375em}h3{color:var(--kul_article_h3_color);font-family:var(--kul_article_h3_font_family);font-size:var(--kul_article_h3_font_size);font-weight:300;line-height:1.2;margin:0.5em 0}.empty-data{align-items:center;display:flex;justify-content:center;height:100%;width:100%}[data-component=KulCode]{max-width:max-content;margin:auto;padding:1.75em 0}";
const KulArticleStyle0 = kulArticleCss;

const KulArticle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-article-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulData = null;
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
        return getProps(this, KulArticleProps, descriptions);
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
    async unmount(ms = 0) {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #recursive(node, depth) {
        switch (depth) {
            case 0:
                return this.#articleTemplate(node, depth);
            case 1:
                return this.#sectionTemplate(node, depth);
            case 2:
                return this.#paragraphTemplate(node, depth);
            default:
                return node.children?.length
                    ? this.#wrapperTemplate(node, depth)
                    : this.#contentTemplate(node, depth);
        }
    }
    #articleTemplate(node, depth) {
        return (h(Fragment, null, h("article", { class: "article", "data-depth": depth.toString(), style: node.cssStyle }, node.value ? h("h1", null, node.value) : undefined, node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null)));
    }
    #sectionTemplate(node, depth) {
        return (h(Fragment, null, h("section", { class: "section", "data-depth": depth.toString(), style: node.cssStyle }, node.value ? h("h2", null, node.value) : undefined, node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null)));
    }
    #wrapperTemplate(node, depth) {
        const ComponentTag = node.children?.some((child) => child.tagName === 'li')
            ? 'ul'
            : node.tagName
                ? node.tagName
                : 'div';
        return (h(Fragment, null, node.value ? h("div", null, node.value) : '', h(ComponentTag, { class: "content-wrapper", "data-depth": depth.toString(), style: node.cssStyle }, node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null)));
    }
    #paragraphTemplate(node, depth) {
        return (h(Fragment, null, h("p", { class: "paragraph", "data-depth": depth.toString(), style: node.cssStyle }, node.value ? h("h3", null, node.value) : undefined, node.children
            ? node.children.map((child) => this.#recursive(child, depth + 1))
            : null)));
    }
    #contentTemplate(node, depth) {
        const decorator = kulManagerInstance().data.cell.shapes.decorate;
        const key = node?.cells && Object.keys(node.cells)[0];
        const cell = node?.cells?.[key];
        if (cell) {
            const shape = decorator(cell.shape, [cell], async (e) => this.onKulEvent(e, 'kul-event'));
            return shape.element[0];
        }
        else {
            const ComponentTag = node.tagName ? node.tagName : 'span';
            return (h(ComponentTag, { class: `content content--${ComponentTag}`, "data-depth": depth.toString(), style: node.cssStyle }, node.value));
        }
    }
    #prepArticle() {
        const elements = [];
        const nodes = this.kulData.nodes;
        for (let index = 0; index < nodes.length; index++) {
            const node = nodes[index];
            elements.push(this.#recursive(node, 0));
        }
        return h(Fragment, null, elements);
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
        return (h(Host, { key: '803a6bd92fc955ba165609621cd9a193d92b8131' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '77bdeeaf8479b2d7dce7c13d3c2298235e57eae7', id: KUL_WRAPPER_ID }, this.kulData?.nodes?.length ? (this.#prepArticle()) : (h("div", { class: "empty-data" }, h("div", { class: "empty-data__text" }, this.#kulManager.language.translate(KulLanguageGeneric.EMPTY_DATA)))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get assetsDirs() { return ["assets/fonts"]; }
};
KulArticle.style = KulArticleStyle0;

export { KulArticle as kul_article };

//# sourceMappingURL=kul-article.entry.js.map