import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement, F as Fragment } from './index-5c52ec0e.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, f as KulLanguageGeneric, b as KUL_STYLE_ID } from './kul-manager-c48a993d.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulArticleProps;
(function (KulArticleProps) {
    KulArticleProps["kulData"] = "Actual data of the article";
    KulArticleProps["kulStyle"] = "Custom style of the component.";
})(KulArticleProps || (KulArticleProps = {}));
//#endregion

const kulArticleCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_article_content_color:var(\n    --kul-article-content-color,\n    var(--kul-text-color)\n  );--kul_article_content_font_family:var(\n    --kul-article-content-font-family,\n    var(--kul-font-family)\n  );--kul_article_content_font_size:var(\n    --kul-article-content-font-size,\n    var(--kul-font-size)\n  );--kul_article_h1_color:var(--kul-article-h1-color, var(--kul-text-color));--kul_article_h1_font_family:var(\n    --kul-article-h1-font-family,\n    var(--kul-font-family)\n  );--kul_article_h1_font_size:var(\n    --kul-article-h1-font-size,\n    calc(var(--kul-font-size) * 1.25)\n  );--kul_article_h2_color:var(--kul-article-h2-color, var(--kul-text-color));--kul_article_h2_font_family:var(\n    --kul-article-h2-font-family,\n    var(--kul-font-family)\n  );--kul_article_h2_font_size:var(\n    --kul-article-h2-font-size,\n    calc(var(--kul-font-size) * 1.125)\n  );--kul_article_h3_color:var(--kul-article-h3-color, var(--kul-text-color));--kul_article_h3_font_family:var(\n    --kul-article-h3-font-family,\n    var(--kul-font-family)\n  );--kul_article_h3_font_size:var(--kul-article-h3-font-size, 1.5em);--kul_article_margin:var(--kul-article-margin, auto);--kul_article_max_width:var(--kul-article-max-width, 1200px);--kul_article_padding:var(--kul-article-padding, 40px);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);background-color:rgba(var(--kul-background-color-rgb), 0.375);display:block;height:100%;width:100%}#kul-component{height:100%;width:100%}.article{margin:var(--kul_article_margin);max-width:var(--kul_article_max_width);padding:var(--kul_article_padding)}.content{color:var(--kul_article_content_color);font-family:var(--kul_article_content_font_family);font-size:var(--kul_article_content_font_size)}h1{color:var(--kul_article_h1_color);font-family:var(--kul_article_h1_font_family);font-size:var(--kul_article_h1_font_size);font-size:2.375em;font-weight:600;line-height:1.2;margin-bottom:1.25em;word-break:break-word}h2{color:var(--kul_article_h2_color);font-family:var(--kul_article_h2_font_family);font-size:var(--kul_article_h2_font_size);font-size:2em;font-weight:500;line-height:1.2;margin-bottom:0.375em}h3{color:var(--kul_article_h3_color);font-family:var(--kul_article_h3_font_family);font-size:var(--kul_article_h3_font_size);font-weight:300;line-height:1.2;margin:0.5em 0}.empty-data{align-items:center;display:flex;justify-content:center;height:100%;width:100%}[data-component=KulCode]{max-width:max-content;margin:auto;padding:1.75em 0}";
const KulArticleStyle0 = kulArticleCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulArticle_instances, _KulArticle_kulManager, _KulArticle_recursive, _KulArticle_articleTemplate, _KulArticle_sectionTemplate, _KulArticle_wrapperTemplate, _KulArticle_paragraphTemplate, _KulArticle_contentTemplate, _KulArticle_prepArticle;
const KulArticle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-article-event", 6);
        _KulArticle_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulArticle_kulManager.set(this, kulManagerInstance());
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulData = null;
        this.kulStyle = "";
    }
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
            this.onKulEvent(new CustomEvent("unmount"), "unmount");
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulArticle_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulArticle_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulArticle_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulArticle_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        return (h(Host, { key: '759b562745a19dfb0fa5109d28180d436285de29' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulArticle_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: '63093b1af3b121f46929bdf3f78c5d691628a70f', id: KUL_WRAPPER_ID }, this.kulData?.nodes?.length ? (__classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_prepArticle).call(this)) : (h("div", { class: "empty-data" }, h("div", { class: "empty-data__text" }, __classPrivateFieldGet(this, _KulArticle_kulManager, "f").language.translate(KulLanguageGeneric.EMPTY_DATA)))))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulArticle_kulManager, "f").theme.unregister(this);
    }
    static get assetsDirs() { return ["assets/fonts"]; }
    get rootElement() { return getElement(this); }
};
_KulArticle_kulManager = new WeakMap(), _KulArticle_instances = new WeakSet(), _KulArticle_recursive = function _KulArticle_recursive(node, depth) {
    switch (depth) {
        case 0:
            return __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_articleTemplate).call(this, node, depth);
        case 1:
            return __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_sectionTemplate).call(this, node, depth);
        case 2:
            return __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_paragraphTemplate).call(this, node, depth);
        default:
            return node.children?.length
                ? __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_wrapperTemplate).call(this, node, depth)
                : __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_contentTemplate).call(this, node, depth);
    }
}, _KulArticle_articleTemplate = function _KulArticle_articleTemplate(node, depth) {
    return (h(Fragment, null, h("article", { class: "article", "data-depth": depth.toString(), style: node.cssStyle }, node.value ? h("h1", null, node.value) : undefined, node.children
        ? node.children.map((child) => __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_recursive).call(this, child, depth + 1))
        : null)));
}, _KulArticle_sectionTemplate = function _KulArticle_sectionTemplate(node, depth) {
    return (h(Fragment, null, h("section", { class: "section", "data-depth": depth.toString(), style: node.cssStyle }, node.value ? h("h2", null, node.value) : undefined, node.children
        ? node.children.map((child) => __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_recursive).call(this, child, depth + 1))
        : null)));
}, _KulArticle_wrapperTemplate = function _KulArticle_wrapperTemplate(node, depth) {
    const ComponentTag = node.children?.some((child) => child.tagName === "li")
        ? "ul"
        : node.tagName
            ? node.tagName
            : "div";
    return (h(Fragment, null, node.value ? h("div", null, node.value) : "", h(ComponentTag, { class: "content-wrapper", "data-depth": depth.toString(), style: node.cssStyle }, node.children
        ? node.children.map((child) => __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_recursive).call(this, child, depth + 1))
        : null)));
}, _KulArticle_paragraphTemplate = function _KulArticle_paragraphTemplate(node, depth) {
    return (h(Fragment, null, h("p", { class: "paragraph", "data-depth": depth.toString(), style: node.cssStyle }, node.value ? h("h3", null, node.value) : undefined, node.children
        ? node.children.map((child) => __classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_recursive).call(this, child, depth + 1))
        : null)));
}, _KulArticle_contentTemplate = function _KulArticle_contentTemplate(node, depth) {
    const decorator = kulManagerInstance().data.cell.shapes.decorate;
    const key = node?.cells && Object.keys(node.cells)[0];
    const cell = node?.cells?.[key];
    if (cell) {
        const shape = decorator(cell.shape, [cell], async (e) => this.onKulEvent(e, "kul-event"));
        return shape.element[0];
    }
    else {
        const ComponentTag = node.tagName ? node.tagName : "span";
        return (h(ComponentTag, { class: `content content--${ComponentTag}`, "data-depth": depth.toString(), style: node.cssStyle }, node.value));
    }
}, _KulArticle_prepArticle = function _KulArticle_prepArticle() {
    const elements = [];
    const nodes = this.kulData.nodes;
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        elements.push(__classPrivateFieldGet(this, _KulArticle_instances, "m", _KulArticle_recursive).call(this, node, 0));
    }
    return h(Fragment, null, elements);
};
KulArticle.style = KulArticleStyle0;

export { KulArticle as kul_article };

//# sourceMappingURL=kul-article.entry.js.map