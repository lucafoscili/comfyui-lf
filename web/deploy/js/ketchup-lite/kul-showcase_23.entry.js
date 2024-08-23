import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host, a as getAssetPath, F as Fragment } from './index-9570d2db.js';
import { k as kulManagerInstance, g as getProps } from './kul-manager-18eb90c7.js';
import { K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './GenericVariables-0efba181.js';
import { K as KUL_DOC, a as KUL_SHOWCASE_COMPONENTS, b as KUL_SHOWCASE_FRAMEWORK, c as KUL_SHOWCASE_LAYOUT, d as KUL_SHOWCASE_UTILITIES, D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';
import { S as SHOWCASE_DOC, a as SHOWCASE_DYN_EXAMPLES, r as random2digitsNumber } from './kul-showcase-utils-273884d4.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';

var KulShowcaseProps;
(function (KulShowcaseProps) {
    KulShowcaseProps["kulStyle"] = "Custom style of the component.";
})(KulShowcaseProps || (KulShowcaseProps = {}));

const kulShowcaseCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{color:var(--kul-text-color);display:block;font-family:var(--kul-font-family);font-size:var(--kul-font-size);height:100%;width:100%}#kul-component{height:100%;width:100%}kul-article{-webkit-backdrop-filter:none;backdrop-filter:none;background:none}.link{padding:1em}kul-card{padding:1em 0}.link-wrapper{display:flex;justify-content:center}.showcase{--template-columns:repeat(1, 1fr);backface-visibility:hidden;box-sizing:border-box;transform:translateZ(0);width:100%}.flex-wrapper{display:flex;justify-content:space-evenly}.flex-wrapper--column{flex-direction:column}.flex-wrapper--responsive{flex-direction:row;flex-wrap:wrap}a{background-color:transparent;font-size:calc(var(--kul-font-size) * 2);letter-spacing:0.075em;padding:0.25em;text-transform:uppercase;transition:background-color 80ms, color 80ms;width:max-content}a:hover{background-color:rgba(var(--kul-primary-color-rgb), 0.2);color:var(--kul-primary-color)}h2,p{text-align:center;width:100%}h2{background-color:var(--kul-primary-color);color:var(--kul-text-on-primary-color);margin:0;padding:12px 0}p{margin-bottom:20px}.header{position:sticky;top:0;z-index:1}.navigation{--kul-button-border-radius:0;height:0;overflow:hidden;transition:height 175ms}.navigation.active{height:40px}::part(grid){display:grid;grid-template-columns:var(--template-columns);padding:var(--padding, 12px 0);width:100%}::part(grid-title){-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);background-color:rgba(var(--kul-primary-color-rgb), 0.1);font-size:1em;font-weight:bold;padding:24px;text-align:center;text-transform:capitalize}::part(examples-title){background-color:var(--kul-title-background-color);color:var(--kul-title-color);font-size:1.25em;padding:24px;text-align:center;text-transform:capitalize}::part(example){box-sizing:border-box;display:flex;flex-direction:column;max-width:100%;overflow:auto;padding:12px;position:relative;width:100%}::part(description){background-color:var(--kul-primary-color);color:var(--kul-text-on-primary-color);padding:12px 0;text-align:center}::part(comp-wrapper){border:1px solid var(--kul-primary-color);border-bottom-left-radius:4px;border-bottom-right-radius:4px;box-sizing:border-box;display:flex;height:100%;min-height:200px;padding:12px;width:100%}::part(code-word){color:var(--kul-primary-color);font-family:var(--kul-font-family-monospace);font-weight:600;word-break:break-word}@media (min-width: 768px){.showcase{--template-columns:repeat(2, 1fr);padding:20px 72px}.section{border:2px solid var(--kul-primary-color);border-radius:5px;margin:24px 0}kul-card{padding:24px}}@media (min-width: 1023px){.showcase{--template-columns:repeat(4, 1fr);padding:20px 72px}}@media (min-width: 1535px){.showcase{--template-columns:repeat(6, 1fr)}}";
const KulShowcaseStyle0 = kulShowcaseCss;

const KulShowcase = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-showcase-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.currentComponent = '';
        this.currentFramework = '';
        this.currentLayout = '';
        this.currentUtility = '';
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
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
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
        return getProps(this, KulShowcaseProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #comps(type) {
        const switchType = () => {
            switch (type) {
                case 'Components':
                    return this.currentComponent.toLowerCase();
                case 'Framework':
                    return this.currentFramework.toLowerCase();
                case 'Layout':
                    return this.currentLayout.toLowerCase();
                case 'Utilities':
                    return this.currentUtility.toLowerCase();
            }
        };
        const Tag = 'kul-showcase-' + switchType();
        return Tag ? h(Tag, null) : null;
    }
    #cards(type) {
        const cards = [];
        const dataset = type === 'Components'
            ? KUL_SHOWCASE_COMPONENTS
            : type === 'Framework'
                ? KUL_SHOWCASE_FRAMEWORK
                : type === 'Layout'
                    ? KUL_SHOWCASE_LAYOUT
                    : KUL_SHOWCASE_UTILITIES;
        dataset.nodes.forEach((node) => {
            const kulData = {
                nodes: [
                    {
                        cells: {
                            icon: { shape: 'image', value: node.icon },
                            text1: { value: node.value },
                            text2: { value: '' },
                            text3: { value: node.description },
                        },
                        id: node.id,
                    },
                ],
            };
            const onEvent = (e) => {
                if (e.detail.eventType === 'click') {
                    switch (type) {
                        case 'Components':
                            this.currentComponent = node.id;
                            console.log(`Selected component: `, this.currentComponent);
                            break;
                        case 'Framework':
                            this.currentFramework = node.id;
                            console.log(`Selected framework: `, this.currentFramework);
                            break;
                        case 'Layout':
                            this.currentLayout = node.id;
                            console.log(`Selected layout: `, this.currentLayout);
                            break;
                        case 'Utilities':
                            this.currentUtility = node.id;
                            console.log(`Selected utility: `, this.currentUtility);
                            break;
                    }
                }
            };
            cards.push(h("kul-card", { id: node.id, kulData: kulData, kulSizeX: "300px", kulSizeY: "300px", "onKul-card-event": onEvent }));
        });
        return cards;
    }
    #prepHeader(title) {
        const current = title === 'Components'
            ? this.currentComponent
            : title === 'Layout'
                ? this.currentLayout
                : title === 'Utilities'
                    ? this.currentUtility
                    : this.currentFramework;
        return (h("div", { class: "header" }, h("h2", null, current ? current : title), h("div", { class: `navigation ${current ? 'active' : ''}` }, h("kul-button", { class: 'kul-full-height kul-full-width', kulIcon: "home", onClick: () => {
                switch (title) {
                    case 'Components':
                        this.currentComponent = '';
                        break;
                    case 'Layout':
                        this.currentLayout = '';
                        break;
                    case 'Framework':
                        this.currentFramework = '';
                        break;
                    case 'Utilities':
                        this.currentUtility = '';
                        break;
                }
            } }))));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: 'cf16dba751556a92df2d0ac3f4fd0d8f3ad4e791' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '3d238b73d0ebf51baa4f24e690f75ef663dd6b48', id: KUL_WRAPPER_ID, onClick: (e) => this.onKulEvent(e, 'click') }, h("div", { key: '3f4c2f84955fdf7173f9fdeb52ee82490edfa923', class: "showcase" }, h("kul-article", { key: '8feada33c1a57fb3e0b92ed1c1d9ce40f078bda3', kulData: KUL_DOC }), h("div", { key: '5312b57297f89cb2333c72ef0eae5dd8a81322a5', class: "link-wrapper" }, h("kul-button", { key: '7619d3ba08edb1df98aa91a5b15035cf942a2af0', "aria-label": "Open GitHub Repository", class: 'link', kulIcon: "github", kulLabel: "GitHub", kulStyling: "floating", onClick: () => window.open('https://github.com/lucafoscili/ketchup-lite', '_blank'), title: "Open GitHub Repository" }), h("kul-button", { key: '29e8f636b9aa9ace3997d90d60a055ab23bddbc0', "aria-label": "Open npm Package", class: 'link', kulIcon: "npm", kulLabel: "npm", kulStyling: "floating", onClick: () => window.open('https://www.npmjs.com/package/ketchup-lite', '_blank'), title: "Open npm Package" })), h("div", { key: '42b7fa72e5630f3a564eca34a649d62616f67e0a', class: "section" }, this.#prepHeader('Components'), h("div", { key: '80559256e081b7521f35c4edaeb4cbadfb7dcb6d', class: "flex-wrapper flex-wrapper--responsive" }, this.currentComponent
            ? this.#comps('Components')
            : this.#cards('Components'))), h("div", { key: 'abe0faf82a3cc47cfc3561839dcf4953ae5c7b7b', class: "section" }, this.#prepHeader('Layout'), h("div", { key: 'd175f009060810531715c278bfe14475250efb34', class: "flex-wrapper flex-wrapper--responsive" }, this.currentLayout
            ? this.#comps('Layout')
            : this.#cards('Layout'))), h("div", { key: '4b21d84d020e74132e20495beea4118c74b31514', class: "section" }, this.#prepHeader('Framework'), h("div", { key: '0581f4f1be30f6a210d8c0794a2aa1403adbdd4d', class: "flex-wrapper flex-wrapper--responsive" }, this.currentFramework
            ? this.#comps('Framework')
            : this.#cards('Framework'))), h("div", { key: 'd872d7f81c6c1fce1cb19569a77fbb0d75ecdda5', class: "section" }, this.#prepHeader('Utilities'), h("div", { key: '338374a2a81832a5b9813cb3dd2a350f62c995da', class: "flex-wrapper flex-wrapper--responsive" }, this.currentUtility
            ? this.#comps('Utilities')
            : this.#cards('Utilities')))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get assetsDirs() { return ["assets/media"]; }
};
KulShowcase.style = KulShowcaseStyle0;

const component$h = 'article';
const kulData$5 = {
    nodes: [
        {
            id: '0',
            value: 'Artificial Intelligence: A Comprehensive Guide',
            children: [
                {
                    id: '1.1',
                    value: 'Introduction',
                    children: [
                        {
                            children: [
                                {
                                    cells: {
                                        kulImage: {
                                            shape: 'image',
                                            value: getAssetPath(`./assets/media/color_splash.jpg`),
                                        },
                                    },
                                    id: '1.1.1.1',
                                    value: '',
                                },
                            ],
                            id: '1.1.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '1.1.2.1',
                                    value: 'Artificial Intelligence (AI) is a rapidly evolving field that has the potential to revolutionize various aspects of our lives. This article aims to provide a comprehensive overview of AI, its applications, and the challenges it faces.',
                                },
                            ],
                            id: '1.1.2',
                            value: '',
                        },
                    ],
                },
                {
                    id: '1.2',
                    value: 'What is Artificial Intelligence?',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.2.1.1',
                                    value: 'Artificial Intelligence is a branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.',
                                },
                            ],
                            id: '1.2.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            kulLanguage: 'python',
                                            value: `def hello_world():\nprint("Hello, world!")`,
                                        },
                                    },
                                    id: '1.2.2.1',
                                    value: 'Artificial Intelligence is a branch of computer science that focuses on creating systems capable of performing tasks that typically require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.',
                                },
                            ],
                            id: '1.2.2',
                            value: ``,
                        },
                    ],
                },
                {
                    id: '1.3',
                    value: 'Applications of Artificial Intelligence',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.3.1.1',
                                    value: 'AI has a wide range of applications across various industries, including healthcare, finance, education, and transportation. For example, AI can help diagnose diseases, predict stock market trends, and personalize learning experiences.',
                                },
                            ],
                            id: '1.3.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    cells: {
                                        kulImage: {
                                            shape: 'image',
                                            value: getAssetPath(`./assets/media/color_splash.jpg`),
                                        },
                                    },
                                    id: '1.3.2.1',
                                    value: 'AI has a wide range of applications across various industries, including healthcare, finance, education, and transportation. For example, AI can help diagnose diseases, predict stock market trends, and personalize learning experiences.',
                                },
                            ],
                            id: '1.3.2',
                            value: '',
                        },
                    ],
                },
                {
                    id: '1.4',
                    value: 'Challenges and Ethical Considerations',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.4.1.1',
                                    value: 'While AI offers numerous benefits, it also presents several challenges, including privacy concerns, job displacement, and the risk of bias in AI systems. Ethical considerations are crucial in the development and deployment of AI technologies.',
                                },
                            ],
                            id: '1.4.1',
                            value: '',
                        },
                        {
                            id: '1.4.2',
                            value: '',
                        },
                    ],
                },
                {
                    id: '1.5',
                    value: 'Conclusion',
                    children: [
                        {
                            children: [
                                {
                                    value: 'Artificial Intelligence is poised to play a pivotal role in shaping the future of technology and society. As we continue to explore its potential, it is essential to address its challenges and ethical implications to ensure its responsible development and deployment.',
                                    id: '1.5.2.1',
                                },
                            ],
                            id: '1.5.1',
                            value: '',
                        },
                    ],
                },
            ],
        },
    ],
};
const ARTICLE_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple article',
        kulData: kulData$5,
    },
    style: {
        ['data-description']: 'Article with custom style',
        'data-dynamic': 'custom',
        kulData: kulData$5,
    },
};
const ARTICLE_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulArticle',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render articles based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulArticle',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the article.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-article></kul-article>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                code: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [{"value": "Article Title", "id": "0", "children": [{"value": "Section Title", "id": "0.1", "children": [{"value": "Paragraph title", "id": "0.1.1", "children": [{"value": "Text", "id": "0.1.1.1"}, {"value": "Strong text", "id": "0.1.1.2", "tagName": "strong"}]}]}]}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$h),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-article-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$h),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$h),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulArticle',
        },
    ],
};

const kulShowcaseArticleCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseArticleStyle0 = kulShowcaseArticleCss;

const KulShowcaseArticle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in ARTICLE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(ARTICLE_EXAMPLES, key)) {
                const props = ARTICLE_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-article", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '2f6371384b5fbdb470397a7a5cb9ea9350122165' }, h("kul-article", { key: '3db3a70d8aa86872762814c0d12693074817f894', kulData: ARTICLE_DOC }), h("div", { key: '1c85bc3f9e1233bab40b9c6e73f61e704a8edede', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '5b44ad6a0f9ed2bb930d906fc1ed07754946eb26', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseArticle.style = KulShowcaseArticleStyle0;

const component$g = 'badge';
const BADGE_EXAMPLES = {
    colors: {
        ['data-description']: 'Badge states colors',
        ['data-dynamic']: 'state-colors',
    },
    empty: {
        ['data-description']: 'Empty badge',
    },
    icon: {
        ['data-description']: 'Badge with icon',
        kulImageProps: {
            kulValue: 'notifications',
        },
    },
    image: {
        ['data-description']: 'Badge with image',
        kulImageProps: {
            kulValue: 'https://avatars.githubusercontent.com/u/45429703?v=4',
        },
    },
    label: {
        ['data-description']: 'Badge with text',
        kulLabel: random2digitsNumber().toString(),
    },
    position: {
        ['data-description']: 'Badge positions',
        ['data-dynamic']: 'positions',
    },
    style: {
        ['data-description']: 'Badge with custom style',
        ['data-dynamic']: 'custom',
    },
};
const BADGE_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulBadge',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a customizable and reusable web component designed to display badges.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulBadge',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and optionally provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulLabel',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' and ',
                                        },
                                        {
                                            id: '0.2.0.0.5',
                                            tagName: 'strong',
                                            value: 'kulImageProps',
                                        },
                                        {
                                            id: '0.2.0.0.6',
                                            value: " properties to customize the badge's content.",
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-badge></kul-badge>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "kulImageProps": { "kulValue": "notifications" } }',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$g),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    tagName: 'strong',
                                    value: 'KulEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'click',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.0.1',
                                                                    value: ': emitted when the component is clicked.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.1.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.1.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.1',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-badge-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$g),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$g),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulBadge',
        },
    ],
};

const kulShowcaseBadgeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}.badge-wrapper{border:1px solid var(--kul-border-color);height:72px;margin:auto;position:relative;text-align:center;width:72px}.badge-anchor{-webkit-backdrop-filter:blur(3.5px);backdrop-filter:blur(3.5px);line-height:72px;transform:translate3d(0, 0, 0)}";
const KulShowcaseBadgeStyle0 = kulShowcaseBadgeCss;

const KulShowcaseBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in BADGE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(BADGE_EXAMPLES, key)) {
                const props = BADGE_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("div", { class: "badge-wrapper" }, h("div", { class: "badge-anchor" }, "Simple div"), h("kul-badge", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props })))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                        case 'positions':
                            comp.className =
                                'hydrated ' +
                                    this.#dynamicExampleManager.position.get(comp.id);
                            break;
                        case 'state-colors':
                            comp.className =
                                'hydrated ' +
                                    this.#dynamicExampleManager.stateColors.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '52390c31c3b0d81ab5d79c53a8b97987ccf386cd' }, h("kul-article", { key: '7d1070d0080f2a507e37902daab018e0bdab9690', kulData: BADGE_DOC }), h("div", { key: 'adb6b8d38bfb1bb4077e84d387f361309440c253', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseBadge.style = KulShowcaseBadgeStyle0;

const component$f = 'button';
const kulData$4 = {
    nodes: [
        {
            children: [
                { id: '0.0', value: 'Child 1' },
                { id: '0.1', value: 'Child 2' },
            ],
            id: '0',
            value: 'Node 0',
        },
    ],
};
const BUTTON_EXAMPLES = {
    flat: {
        colors: {
            ['data-description']: 'Button states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'States colors',
        },
        disabled: {
            ['data-description']: 'Disabled button',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        dropdown: {
            ['data-description']: 'Dropdown button',
            kulData: kulData$4,
            kulLabel: 'Dropdown',
        },
        icon: {
            ['data-description']: 'Icon button',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'With label',
            kulLabel: 'With label',
        },
        labelIcon: {
            ['data-description']: 'With label and icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and icon',
        },
        large: {
            className: 'kul-large',
            ['data-description']: 'Large button',
            kulLabel: 'Large',
        },
        shaped: {
            className: 'kul-shaped',
            ['data-description']: 'Shaped button',
            kulLabel: 'Shaped',
        },
        slim: {
            className: 'kul-slim',
            ['data-description']: 'Slim button',
            kulLabel: 'Slim',
        },
        spinner: {
            ['data-description']: 'Button with spinner',
            kulLabel: 'With spinner',
            kulShowSpinner: true,
        },
        style: {
            ['data-description']: 'Button with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'With custom style',
        },
        trailingIcon: {
            ['data-description']: 'With label and trailing icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and trailing icon',
            kulTrailingIcon: true,
        },
    },
    floating: {
        colors: {
            ['data-description']: 'Button states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'States colors',
        },
        disabled: {
            ['data-description']: 'Disabled button',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        dropdown: {
            ['data-description']: 'Dropdown button',
            kulData: kulData$4,
            kulLabel: 'Dropdown',
        },
        icon: {
            ['data-description']: 'Icon button',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'With label',
            kulLabel: 'With label',
        },
        labelIcon: {
            ['data-description']: 'With label and icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and icon',
        },
        large: {
            className: 'kul-large',
            ['data-description']: 'Large button',
            kulLabel: 'Large',
        },
        shaped: {
            className: 'kul-shaped',
            ['data-description']: 'Shaped button',
            kulLabel: 'Shaped',
        },
        slim: {
            className: 'kul-slim',
            ['data-description']: 'Slim button',
            kulLabel: 'Slim',
        },
        spinner: {
            ['data-description']: 'Button with spinner',
            kulLabel: 'With spinner',
            kulShowSpinner: true,
        },
        style: {
            ['data-description']: 'Button with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'With custom style',
        },
        trailingIcon: {
            ['data-description']: 'With label and trailing icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and trailing icon',
            kulTrailingIcon: true,
        },
    },
    icon: {
        colors: {
            ['data-description']: 'Button states colors',
            ['data-dynamic']: 'state-colors',
            kulIcon: 'widgets',
        },
        disabled: {
            ['data-description']: 'Disabled button',
            kulDisabled: true,
            kulIcon: 'widgets',
        },
        dropdown: {
            ['data-description']: 'Dropdown button',
            kulData: kulData$4,
            kulIcon: 'widgets',
            kulLabel: 'Dropdown',
        },
        icon: {
            ['data-description']: 'Icon button',
            kulIcon: 'widgets',
        },
        large: {
            className: 'kul-large',
            ['data-description']: 'Large button',
            kulIcon: 'widgets',
        },
        pulsating: {
            className: 'kul-pulsating',
            ['data-description']: 'Toggable button with pulsating and kulIconOff',
            kulIcon: 'remove_red_eye',
            kulIconOff: 'eye-off',
            kulToggable: true,
            kulValue: true,
        },
        spinner: {
            ['data-description']: 'Button with spinner',
            kulIcon: 'widgets',
            kulShowSpinner: true,
        },
        slim: {
            className: 'kul-slim',
            ['data-description']: 'Slim button',
            kulIcon: 'widgets',
        },
        style: {
            ['data-description']: 'Button with custom style',
            ['data-dynamic']: 'custom',
            kulIcon: 'widgets',
        },
    },
    outlined: {
        colors: {
            ['data-description']: 'Button states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'States colors',
        },
        disabled: {
            ['data-description']: 'Disabled button',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        dropdown: {
            ['data-description']: 'Dropdown button',
            kulData: kulData$4,
            kulLabel: 'Dropdown',
        },
        icon: {
            ['data-description']: 'Icon button',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'With label',
            kulLabel: 'With label',
        },
        labelIcon: {
            ['data-description']: 'With label and icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and icon',
        },
        large: {
            className: 'kul-large',
            ['data-description']: 'Large button',
            kulLabel: 'Large',
        },
        shaped: {
            className: 'kul-shaped',
            ['data-description']: 'Shaped button',
            kulLabel: 'Shaped',
        },
        slim: {
            className: 'kul-slim',
            ['data-description']: 'Slim button',
            kulLabel: 'Slim',
        },
        spinner: {
            ['data-description']: 'Button with spinner',
            kulLabel: 'With spinner',
            kulShowSpinner: true,
        },
        style: {
            ['data-description']: 'Button with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'With custom style',
        },
        trailingIcon: {
            ['data-description']: 'With label and trailing icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and trailing icon',
            kulTrailingIcon: true,
        },
    },
    raised: {
        colors: {
            ['data-description']: 'Button states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'States colors',
        },
        disabled: {
            ['data-description']: 'Disabled button',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        dropdown: {
            ['data-description']: 'Dropdown button',
            kulData: kulData$4,
            kulLabel: 'Dropdown',
        },
        icon: {
            ['data-description']: 'Icon button',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'With label',
            kulLabel: 'With label',
        },
        labelIcon: {
            ['data-description']: 'With label and icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and icon',
        },
        large: {
            className: 'kul-large',
            ['data-description']: 'Large button',
            kulLabel: 'Large',
        },
        shaped: {
            className: 'kul-shaped',
            ['data-description']: 'Shaped button',
            kulLabel: 'Shaped',
        },
        slim: {
            className: 'kul-slim',
            ['data-description']: 'Slim button',
            kulLabel: 'Slim',
        },
        spinner: {
            ['data-description']: 'Button with spinner',
            kulLabel: 'With spinner',
            kulShowSpinner: true,
        },
        style: {
            ['data-description']: 'Button with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'With custom style',
        },
        trailingIcon: {
            ['data-description']: 'With label and trailing icon',
            kulIcon: 'widgets',
            kulLabel: 'With label and trailing icon',
            kulTrailingIcon: true,
        },
    },
};
const BUTTON_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulButton',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render buttons.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulButton',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the relevant props.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-button kul-label="Click me"></kul-button>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$f),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various button interactions. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulButtonEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'blur',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.0.1',
                                                                    value: ': emitted when the component loses focus.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.1.0',
                                                                    tagName: 'strong',
                                                                    value: 'click',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.1.1',
                                                                    value: ': emitted when the component is clicked.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.1',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.2.0',
                                                                    tagName: 'strong',
                                                                    value: 'focus',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.2.1',
                                                                    value: ': emitted when the component is focused.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.2',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.3.0',
                                                                    tagName: 'strong',
                                                                    value: 'pointerdown',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.3.1',
                                                                    value: ': emitted when as soon as the component is touched/clicked (before the click event).',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.3',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.4.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.4.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.4',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-button-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$f),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$f),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulButton',
        },
    ],
};

const kulShowcaseButtonCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-button{margin:auto}";
const KulShowcaseButtonStyle0 = kulShowcaseButtonCss;

const KulShowcaseButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const k1 in BUTTON_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(BUTTON_EXAMPLES, k1)) {
                const category = BUTTON_EXAMPLES[k1];
                const group = [];
                for (const k2 in category) {
                    if (Object.prototype.hasOwnProperty.call(category, k2)) {
                        const props = category[k2];
                        group.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-button", { key: k1 + '-' + k2, id: k1 + '-' + k2, ref: (el) => {
                                if (el && props['data-dynamic']) {
                                    this.#dynamicExamples.push(el);
                                }
                            }, ...props, kulStyling: k1 }, props.kulShowSpinner ? (h("kul-spinner", { kulDimensions: "2px", "kul-active": true, slot: "spinner" })) : undefined))));
                    }
                }
                elements.push(h("div", { class: "grid-container", part: "grid-container" }, h("div", { class: "grid-title", part: "grid-title" }, k1), h("div", { class: "grid", part: "grid" }, group)));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                        case 'state-colors':
                            comp.className =
                                'hydrated ' +
                                    this.#dynamicExampleManager.stateColors.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: 'db35ab8ef5aa6937d0cf50e86f6da81a7af46d99' }, h("kul-article", { key: 'ccf9cce2f2ad1bb34518bf7027f8f5ed70b9d1b3', kulData: BUTTON_DOC }), h("div", { key: '6ab5cecb5661dcfe115f020d31c8a07d428e3e6d', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'c8b709ca18812654eed12b7017b983785627e418', "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseButton.style = KulShowcaseButtonStyle0;

const component$e = 'card';
const CARD_EXAMPLES = {
    a: {
        image: {
            ['data-description']: 'Card with custom style',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: {
                nodes: [
                    {
                        cells: {
                            1: { value: 'Title' },
                            2: { value: 'Subtitle' },
                            3: { value: 'Description' },
                            kulImage: {
                                shape: 'image',
                                value: getAssetPath(`./assets/media/color_splash.jpg`),
                            },
                        },
                        id: '1',
                    },
                ],
            },
        },
        style: {
            ['data-description']: 'Card with custom style',
            ['data-dynamic']: 'custom',
            kulSizeX: '320px',
            kulSizeY: '320px',
            kulData: {
                nodes: [
                    {
                        cells: {
                            1: { value: 'Title' },
                            2: { value: 'Subtitle' },
                            3: { value: 'Description' },
                            kulImage: {
                                shape: 'image',
                                value: 'widgets',
                            },
                        },
                        id: '1',
                    },
                ],
            },
        },
    },
};
const CARD_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulCard',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render cards based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulCard',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the card. ',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-card></kul-card>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [ { "cells": { "icon": { "shape": "image", "value": "widgets" }, "text1": { "value": "Title" }, "text2": { "value": "Subtitle"            }, "text3": { "value": "Description." } }, "id": "card" } ] }',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.1.0.0',
                                            value: "You can customize the component's style by setting the ",
                                        },
                                        {
                                            id: '0.2.1.0.1',
                                            tagName: 'strong',
                                            value: 'kulStyle',
                                        },
                                        {
                                            id: '0.2.1.0.2',
                                            value: ' property. ',
                                        },
                                    ],
                                    id: '0.2.1.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-card kul-style="#kul-component card { max-height: 20vh; }"></kul-card>',
                                                },
                                            },
                                            id: '0.2.1.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.1.1',
                                },
                            ],
                            id: '0.2.1',
                            value: 'Custom Styling',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$e),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'click',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component is clicked.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.1.0',
                                                                    tagName: 'strong',
                                                                    value: 'kul-event',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.1.1',
                                                                    value: ': emitted by other kul-components wrapped inside the card.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.1',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.2.0',
                                                                    tagName: 'strong',
                                                                    value: 'pointerdown',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.2.1',
                                                                    value: ': emitted when as soon as the component is touched/clicked (before the click event).',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.2',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.3.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.3.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.3',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-showcase-card-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$e),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$e),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulCard',
        },
    ],
};

const kulShowcaseCardCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-card{margin:auto}";
const KulShowcaseCardStyle0 = kulShowcaseCardCss;

const KulShowcaseCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const k1 in CARD_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(CARD_EXAMPLES, k1)) {
                const layout = CARD_EXAMPLES[k1];
                const layoutWrapper = [];
                for (const k2 in layout) {
                    if (Object.prototype.hasOwnProperty.call(layout, k2)) {
                        const props = layout[k2];
                        layoutWrapper.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-card", { key: k2, id: k1 + '-' + k2, ref: (el) => {
                                if (el && props['data-dynamic']) {
                                    this.#dynamicExamples.push(el);
                                }
                            }, ...props }))));
                    }
                }
                elements.push(h("div", { class: "grid-container", part: "grid-container" }, h("div", { class: "grid-title", part: "grid-title" }, "Layout ", k1), h("div", { class: "grid", part: "grid" }, layoutWrapper)));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: 'a85bb2e827e8f93cd45cc016b8c2684451a469e0' }, h("kul-article", { key: 'bcfb44680450e6409ef382ba4ec50238072a8008', kulData: CARD_DOC }), h("div", { key: '3f353003df8982e7ddcb39d6c09edd2f0f77bcb8', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '2469715cee12fcbf67460c3575d5d53d41b71105', "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseCard.style = KulShowcaseCardStyle0;

const component$d = 'chart';
const kulData$3 = {
    columns: [
        {
            id: 'Axis',
            title: 'Department',
        },
        {
            id: 'Series_1',
            title: 'Current Budget',
        },
        {
            id: 'Series_2',
            title: 'Projected Budget',
        },
        {
            id: 'Series_3',
            title: 'Allocated Budget',
        },
        {
            id: 'Series_4',
            title: 'Expenditures',
        },
        {
            id: 'Series_5',
            title: 'Savings',
        },
    ],
    nodes: [
        {
            cells: {
                Axis: {
                    value: 'Digital Marketing',
                },
                Series_1: {
                    value: '15000',
                },
                Series_2: {
                    value: '16000',
                },
                Series_3: {
                    value: '15500',
                },
                Series_4: {
                    value: '14500',
                },
                Series_5: {
                    value: '500',
                },
            },
            id: '0',
        },
        {
            cells: {
                Axis: {
                    value: 'E-commerce Sales',
                },
                Series_1: {
                    value: '8000',
                },
                Series_2: {
                    value: '9000',
                },
                Series_3: {
                    value: '8500',
                },
                Series_4: {
                    value: '7500',
                },
                Series_5: {
                    value: '1000',
                },
            },
            id: '1',
        },
        {
            cells: {
                Axis: {
                    value: 'Administrative Services',
                },
                Series_1: {
                    value: '6000',
                },
                Series_2: {
                    value: '6500',
                },
                Series_3: {
                    value: '6250',
                },
                Series_4: {
                    value: '6000',
                },
                Series_5: {
                    value: '250',
                },
            },
            id: '2',
        },
        {
            cells: {
                Axis: {
                    value: 'Product Development',
                },
                Series_1: {
                    value: '20000',
                },
                Series_2: {
                    value: '22000',
                },
                Series_3: {
                    value: '21000',
                },
                Series_4: {
                    value: '20500',
                },
                Series_5: {
                    value: '9500',
                },
            },
            id: '3',
        },
        {
            cells: {
                Axis: {
                    value: 'Customer Support',
                },
                Series_1: {
                    value: '10000',
                },
                Series_2: {
                    value: '11000',
                },
                Series_3: {
                    value: '10500',
                },
                Series_4: {
                    value: '10000',
                },
                Series_5: {
                    value: '500',
                },
            },
            id: '4',
        },
    ],
};
const CHART_EXAMPLES = {
    area: {
        ['data-description']: 'Area',
        kulAxis: 'Axis',
        kulData: kulData$3,
        kulSizeY: '300px',
        kulTypes: ['area'],
    },
    bar: {
        ['data-description']: 'Bar',
        kulAxis: 'Axis',
        kulData: kulData$3,
        kulSeries: ['Series_1'],
        kulSizeY: '300px',
        kulTypes: ['bar'],
    },
    line: {
        ['data-description']: 'Line',
        kulAxis: 'Axis',
        kulData: kulData$3,
        kulSizeY: '300px',
    },
    pie: {
        ['data-description']: 'Pie',
        kulAxis: 'Axis',
        kulData: kulData$3,
        kulSizeY: '300px',
        kulTypes: ['pie'],
    },
    scatter: {
        ['data-description']: 'Scatter',
        kulAxis: 'Axis',
        kulData: kulData$3,
        kulSizeY: '300px',
        kulTypes: ['scatter'],
    },
    style: {
        ['data-description']: 'Bar',
        ['data-dynamic']: 'custom',
        kulAxis: 'Axis',
        kulData: kulData$3,
        kulSeries: ['Series_1'],
        kulSizeY: '300px',
        kulTypes: ['bar'],
    },
};
const CHART_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulChart',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render tab bars based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulChart',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the tab bar.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-chart></kul-chart>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: JSON.stringify(kulData$3),
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$d),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulChartEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'click',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the chart is clicked',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-chart-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$d),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$d),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulChart',
        },
    ],
};

const kulShowcaseChartCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseChartStyle0 = kulShowcaseChartCss;

const KulShowcaseChart = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in CHART_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(CHART_EXAMPLES, key)) {
                const props = CHART_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-chart", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: 'bed6589c959e4185aca7f8d78f0900bb0877a9e6' }, h("kul-article", { key: '9b9a5b8ea328dc3a7d0061ee71c4d556dca5a614', kulData: CHART_DOC }), h("div", { key: '366e3378f329f051e2f473505ac2a1a6de847250', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'f7900bddea8d641bd9a342b674ac560e22fd9bb0', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseChart.style = KulShowcaseChartStyle0;

const component$c = 'code';
const CODE_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple code component',
        kulValue: "const dom = document.documentElement;\ndom.ketchupLiteInit = {\n   theme: { name: 'night' },\n};",
    },
    style: {
        ['data-description']: 'Code with custom style',
        ['data-dynamic']: 'custom',
        kulValue: "const dom = document.documentElement;\ndom.ketchupLiteInit = {\n   theme: { name: 'night' },\n};",
    },
};
const CODE_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulCode',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a customizable web component designed to display code snippets with syntax highlighting.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulCode',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulValue',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the code snippet you wish to display.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-code kul-value="console.log(\'Hello, World!\');"></kul-code>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$c),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-code-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$c),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$c),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulCode',
        },
    ],
};

const kulShowcaseCodeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}";
const KulShowcaseCodeStyle0 = kulShowcaseCodeCss;

const KulShowcaseCode = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in CODE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(CODE_EXAMPLES, key)) {
                const props = CODE_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-code", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '1f62a9d409dc5aa26472ce54fff72016f5e307d7' }, h("kul-article", { key: 'c29f93e0ae4cb49fc331d824e8f208951cbc6c14', kulData: CODE_DOC }), h("div", { key: 'b482b3482bc2aad1346dcf11c59ab85e0dd78033', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '91b0de077f34f7e16f1ca9522195831503f170bd', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseCode.style = KulShowcaseCodeStyle0;

const DEBUG_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'This section is used to test a single component with a premade set of props. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: "Select a component through the dropdown button's list, then paste the object containing the components props in the textarea.",
                                        },
                                    ],
                                    id: '0.0.0.1',
                                },
                            ],
                            id: '0.0.0',
                        },
                        {
                            children: [
                                {
                                    cells: {
                                        kulButton: {
                                            kulData: {
                                                nodes: [
                                                    {
                                                        children: KUL_SHOWCASE_COMPONENTS.nodes,
                                                        id: 'component',
                                                        value: 'Component',
                                                    },
                                                ],
                                            },
                                            kulStyle: ':host { margin: auto }',
                                            shape: 'button',
                                            value: 'Component',
                                        },
                                    },
                                    id: '0.0.0.0.0',
                                    value: '',
                                },
                            ],
                            id: '0.0.0.1',
                        },
                    ],
                    id: '0.0',
                    value: 'Usage',
                },
            ],
            id: '0',
            value: 'Debug',
        },
    ],
};

const kulShowcaseDebugCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}.component-wrapper{height:100%;position:relative;width:100%}.grid{--padding:0}.placeholder{align-items:center;background:var(--kul-background-color);display:flex;height:100%;justify-content:center;text-align:center;width:100%}@media (min-width: 768px){:host{--template-columns:minmax(300px, 50%) 1fr}}";
const KulShowcaseDebugStyle0 = kulShowcaseDebugCss;

const KulShowcaseDebug = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentComponent = '';
        this.currentProps = undefined;
        this.invalidJson = false;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #propsTemplate = JSON.stringify(JSON.parse('{ "kulProp": "" }'), null, 2);
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepComponent() {
        const ComponentTag = this.currentComponent
            ? 'kul-' + this.currentComponent
            : undefined;
        return ComponentTag ? (h("div", { class: "component-wrapper" }, h(ComponentTag, { class: `component--${ComponentTag}`, key: `${Date.now()}-${Math.random()}`, ...this.currentProps }))) : (h("div", { class: "placeholder" }, h("div", { class: "placeholder__text" }, "The selected component will be displayed here")));
    }
    #prepTextarea() {
        return this.currentComponent ? (h("kul-textfield", { class: this.invalidJson ? 'kul-danger' : '', key: 'enabled', kulLabel: this.invalidJson ? 'Invalid JSON' : 'Props', "onKul-textfield-event": (e) => {
                if (e.detail.eventType === 'change') {
                    try {
                        const json = JSON.parse(e.detail.value);
                        this.currentProps = json;
                        this.invalidJson = false;
                    }
                    catch (error) {
                        this.invalidJson = true;
                    }
                }
            }, kulStyling: "textarea", kulValue: this.#propsTemplate })) : (h("kul-textfield", { key: 'disabled', kulDisabled: true, kulFullWidth: true, kulLabel: "Props", kulStyling: "textarea", kulValue: "Select a component from the dropdown menu." }));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: '922e29451720e1ad60becaf146c4f98805346f4c' }, h("div", { key: '07965278018e4d778e445f26a2987ce677ca0dce', id: KUL_WRAPPER_ID }, h("kul-article", { key: '984437d4ec2c05792ddee4eb89be1485d97936a5', kulData: DEBUG_DOC, "onKul-article-event": (e) => {
                const articleDetail = e.detail;
                const buttonDetail = articleDetail.originalEvent.detail;
                if (articleDetail.eventType === 'kul-event' &&
                    buttonDetail?.eventType === 'kul-event') {
                    const listDetail = buttonDetail.originalEvent.detail;
                    this.currentComponent =
                        listDetail.node.id.toLowerCase();
                }
            } }), h("div", { key: '9df400f16ea2448209c8a9898d0aa3d1e1fceacc', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, [this.#prepTextarea(), this.#prepComponent()]))));
    }
};
KulShowcaseDebug.style = KulShowcaseDebugStyle0;

const HEAD$1 = `
<head>
<meta charset="utf-8" />
<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
/>
<title>KulHeader</title>
<script type="module" src="/build/ketchup-lite.esm.js"></script>
<script nomodule src="/build/ketchup-lite.js"></script>
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html,
    body,
    #ketchup-lite-showcase {
        height: 100%;
        width: 100%;
    }
    html {
        background-color: var(--kul-background-color, black);
        color: var(--kul-text-color);
        font-family: var(--kul-font-family);
        font-size: var(--kul-font-size);
    }
    .flex-wrapper {
        align-items: center;
        display: flex;
        height: 100%;
        width: 100%;
    }
    .flex-wrapper__title {
        font-size: 24px;
    }
    .text-wrapper {    
        margin-left: var(--kul-drawer-width);
        padding: 12px;
    }
</style>
</head>`;
const TEXT$1 = `
<div class="text-wrapper">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut sapien nulla. Aenean ligula quam, pellentesque quis enim non, posuere feugiat velit. Proin ac ante nisi. Nullam gravida augue urna, venenatis efficitur elit condimentum vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut massa urna, maximus nec odio a, varius porttitor mi. Morbi venenatis, lorem eget accumsan finibus, purus tellus mattis augue, nec pretium purus lacus nec erat. In vel dolor ullamcorper, varius ipsum eu, blandit eros. Nulla ac ante condimentum, consequat odio at, vulputate velit. Proin vitae libero ac risus rutrum condimentum. Nunc congue libero eu vestibulum feugiat. Quisque sit amet tortor nibh. Integer eu aliquam diam.
    </p>
    <p>
        Morbi lobortis, eros in rhoncus finibus, nisi sem aliquam massa, ut viverra ex purus ut tortor. Cras mi odio, accumsan quis iaculis ac, porttitor eget eros. Mauris nec nunc nisl. Fusce a tempus felis. Curabitur ultricies suscipit magna, sit amet accumsan ligula lobortis non. Curabitur tincidunt dictum nisl at blandit. Proin consequat mi a ex dignissim accumsan. Ut felis urna, imperdiet sed orci sit amet, volutpat convallis dui. Ut efficitur nisl sit amet felis eleifend maximus. Aenean et odio ullamcorper, consectetur dui quis, varius massa. Sed scelerisque, purus pellentesque molestie bibendum, elit nunc accumsan augue, et lacinia metus nibh molestie mi.
    </p>
    <p>
        Pellentesque velit orci, scelerisque non ipsum vitae, molestie pretium sapien. Phasellus scelerisque in sem id tempor. Phasellus sollicitudin sit amet sem nec fringilla. Ut odio diam, tincidunt nec ligula sed, pretium consectetur eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla sed est justo. Maecenas at nisi nec enim consectetur blandit egestas ut erat. Vivamus tincidunt ipsum consectetur metus auctor, non aliquet felis tincidunt.
    </p>
    <p>
        Etiam a eros condimentum augue euismod porta. Curabitur neque justo, tincidunt ut elementum et, sodales id nulla. Etiam lacinia nibh libero, ultrices imperdiet metus maximus sollicitudin. Phasellus non lectus condimentum, dignissim tellus et, placerat turpis. Proin dapibus nisl purus, auctor mollis massa semper sed. Duis sed viverra ligula. Nunc cursus lectus non diam lobortis bibendum. Sed pretium rutrum nibh, ac pharetra augue tempus vitae. Suspendisse quis semper augue. In vehicula ante sed augue imperdiet mollis. Donec sit amet laoreet est. Quisque sit amet erat interdum, tincidunt odio non, egestas turpis. Duis vulputate fringilla lacus id euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </p>
    <p>
        Fusce a sodales augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac nisl sapien. Aliquam erat volutpat. Donec auctor orci erat, vel pharetra est condimentum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis sapien tortor, lobortis a suscipit vitae, semper id nunc. Fusce eu accumsan tortor. Nullam scelerisque diam vel dolor mattis dignissim. Nam sapien metus, volutpat eget urna sit amet, ultrices dictum arcu. Etiam blandit odio vitae erat sollicitudin auctor. Fusce at velit urna. Sed feugiat elit id imperdiet dapibus. Sed lobortis, lacus id ullamcorper dapibus, odio metus laoreet metus, vitae gravida nisi eros in est. Proin nulla augue, interdum cursus erat in, dapibus iaculis ex. Proin felis metus, elementum vitae tortor in, molestie mollis dolor.
    </p>
</div>`;
const SLOT$1 = `
    <div class="flex-wrapper">
        <div class="flex-wrapper__title">Simple drawer</div>
    </div>
`;
const SCRIPT = `
<script>
    const cb = (e) => {
        const detail = e.detail;
        if (detail.eventType === "ready") {
            detail.comp.open();
        }
    };
    document.addEventListener("kul-drawer-event", cb);
</script>
`;
const DRAWER_IFRAME_MOCK = `
<!DOCTYPE html>
<html dir="ltr" lang="en">
    ${HEAD$1}
    <body>
        ${SCRIPT}
        <div id="ketchup-lite-showcase">
        <kul-drawer class="kul-permanent">
            ${SLOT$1}
        </kul-drawer>
        ${TEXT$1}
        </div>
    </body>
</html>
`;
const DRAWER_IFRAME_MOCK_STYLE = `
<!DOCTYPE html>
<html dir="ltr" lang="en">
    ${HEAD$1}
    <body>
        ${SCRIPT}
        <div id="ketchup-lite-showcase">
        <kul-drawer class="kul-permanent" kul-style="#kul-component { opacity: 0.5 }">
            ${SLOT$1}
        </kul-drawer>
        ${TEXT$1}
        </div>
    </body>
</html>
`;

const DRAWER_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple drawer component',
        iframeProps: {
            height: '100%',
            srcDoc: DRAWER_IFRAME_MOCK,
            width: '100%',
        },
    },
    style: {
        ['data-description']: 'Drawer with custom style',
        ['data-dynamic']: 'custom',
        iframeProps: {
            height: '100%',
            srcDoc: DRAWER_IFRAME_MOCK_STYLE,
            width: '100%',
        },
    },
};
const DRAWER_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulDrawer',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a simple element designed to be a side menu in an application, it receives a ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'slot',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            value: ' and it will display its content.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.1.1.0',
                                    tagName: 'strong',
                                    value: 'Customizable Styling',
                                },
                                {
                                    id: '0.1.1.1',
                                    value: ": Offers the ability to customize the component's style through the ",
                                },
                                {
                                    id: '0.1.1.2',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.1.1.3',
                                    value: ' property.',
                                },
                            ],
                            id: '0.1.1',
                            tagName: 'li',
                        },
                    ],
                    id: '0.1',
                    value: 'Features',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulDrawer',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'slot',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' that must be displayed inside it.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-drawer>\n   <div class="slot">\n      <div class="title">Simple title</div>\n   </div>\n</kul-drawer>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.1.0.0',
                                            value: 'Type:',
                                        },
                                        {
                                            id: '0.3.1.0.1',
                                            tagName: 'strong',
                                            value: 'string',
                                        },
                                    ],
                                    id: '0.3.1.0',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.3.1.1.0',
                                            value: "Enables customization of the component's style. This property accepts a string of CSS styles that will be applied to the component.",
                                        },
                                    ],
                                    id: '0.3.1.1',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.3.1',
                            value: 'kulStyle',
                        },
                    ],
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-drawer-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.5.0.0',
                                    value: 'Closes the drawer.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.0',
                            tagName: 'strong',
                            value: 'close()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.0.0',
                                    value: 'Returns a promise that resolves to a ',
                                },
                                {
                                    id: '0.5.0.1',
                                    tagName: 'strong',
                                    value: 'KulDebugComponentInfo',
                                },
                                {
                                    id: '0.5.0.2',
                                    value: " object containing debug information about the component's rendering process.",
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.0',
                            tagName: 'strong',
                            value: 'getDebugInfo()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.1.0',
                                    value: 'Returns a promise that resolves to an object where each key is a property name, optionally with its description.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.1',
                            tagName: 'strong',
                            value: 'getProps(descriptions?: boolean)',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.0.0',
                                    value: 'Returns the state of the drawer.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.0',
                            tagName: 'strong',
                            value: 'isOpened()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.0.0',
                                    value: 'Opens the drawer.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.0',
                            tagName: 'strong',
                            value: 'open()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.2.0',
                                    value: 'Triggers a re-render of the component to reflect any state changes.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.2',
                            tagName: 'strong',
                            value: 'refresh()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.2.0',
                                    value: 'Opens the drawer when closed and vice-versa.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.2',
                            tagName: 'strong',
                            value: 'toggle()',
                        },
                    ],
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.7.0.0',
                                    value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                                },
                                {
                                    id: '0.7.0.1',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.7.0.2',
                                    value: ' property.',
                                },
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            kulLanguage: 'markup',
                                            value: '<kul-drawer kul-style="#kul-component { opacity: 0.5; }"></kul-drawer>',
                                        },
                                    },
                                    id: '0.7.0.3',
                                    value: '',
                                },
                            ],
                            id: '0.7.0',
                            tagName: 'strong',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-drawer-backdrop',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': sets the backdrop color of the drawer when in slide mode. Defaults to rgba(0, 0, 0, 0.32).',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-drawer-box-shadow',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': sets the box shadow of the drawer when in slide mode.  Defaults to a combination of shadows for depth.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-drawer-permanent-border',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': sets the border of the drawer in permanent mode. Defaults to a 1px solid border with the color defined by --kul-border-color.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-drawer-slide-transition',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': Sets the horizontal transition duration when in slide mode. Defaults to 750ms.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-drawer-transition',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': Sets the transition duration for the drawer. Defaults to 250ms.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                            ],
                            id: '0.7.1',
                            value: 'CSS Variables',
                        },
                    ],
                    id: '0.7',
                    value: 'Styling',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.8.0.0',
                                    value: 'The ',
                                },
                                {
                                    id: '0.8.0.1',
                                    tagName: 'strong',
                                    value: 'KulDrawer',
                                },
                                {
                                    id: '0.8.0.2',
                                    value: " component is a simple yet useful layouting tool to wrap your app's drawer content.",
                                },
                            ],
                            id: '0.8.0',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.8',
                    value: 'Conclusion',
                },
            ],
            id: '0',
            value: 'KulDrawer',
        },
    ],
};

const kulShowcaseDrawerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseDrawerStyle0 = kulShowcaseDrawerCss;

const KulShowcaseDrawer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in DRAWER_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(DRAWER_EXAMPLES, key)) {
                const props = DRAWER_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("iframe", { key: key, id: key, ...props.iframeProps }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: '93681229d74710b9d2f348bc9cfa02d731a659a1' }, h("kul-article", { key: 'a356ac7582cc80f6ac7093f69dde2281f4950bfb', kulData: DRAWER_DOC }), h("div", { key: '3dde7b6dc37f10c9b077db21c16def8bbce7528d', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '346aded646bcd9ceb74e8f815c0529456f77c152', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
};
KulShowcaseDrawer.style = KulShowcaseDrawerStyle0;

const HEAD = `
<head>
<meta charset="utf-8" />
<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
/>
<title>KulHeader</title>
<script type="module" src="/build/ketchup-lite.esm.js"></script>
<script nomodule src="/build/ketchup-lite.js"></script>
<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    html,
    body,
    #ketchup-lite-showcase {
        height: 100%;
        width: 100%;
    }
    html {
        background-color: var(--kul-background-color, black);
        color: var(--kul-text-color);
        font-family: var(--kul-font-family);
        font-size: var(--kul-font-size);
    }
    .flex-wrapper {
        align-items: center;
        display: flex;
        height: 100%;
        width: 100%;
    }
    .flex-wrapper__left {
        --kul-button-primary-color: var(--kul-header-color);
        --kul-button-primary-color-rgb: var(--kul-header-color-rgb);
        --kul-button-primary-color-h: var(--kul-header-color-h);
        --kul-button-primary-color-s: var(--kul-header-color-s);
        --kul-button-primary-color-l: var(--kul-header-color-l);

        align-items: center;
        display: flex;
        width: 60px;
    }
    .flex-wrapper__title {
        font-size: 24px;
    }
</style>
</head>`;
const TEXT = `
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ut sapien nulla. Aenean ligula quam, pellentesque quis enim non, posuere feugiat velit. Proin ac ante nisi. Nullam gravida augue urna, venenatis efficitur elit condimentum vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut massa urna, maximus nec odio a, varius porttitor mi. Morbi venenatis, lorem eget accumsan finibus, purus tellus mattis augue, nec pretium purus lacus nec erat. In vel dolor ullamcorper, varius ipsum eu, blandit eros. Nulla ac ante condimentum, consequat odio at, vulputate velit. Proin vitae libero ac risus rutrum condimentum. Nunc congue libero eu vestibulum feugiat. Quisque sit amet tortor nibh. Integer eu aliquam diam.
</p>
<p>
    Morbi lobortis, eros in rhoncus finibus, nisi sem aliquam massa, ut viverra ex purus ut tortor. Cras mi odio, accumsan quis iaculis ac, porttitor eget eros. Mauris nec nunc nisl. Fusce a tempus felis. Curabitur ultricies suscipit magna, sit amet accumsan ligula lobortis non. Curabitur tincidunt dictum nisl at blandit. Proin consequat mi a ex dignissim accumsan. Ut felis urna, imperdiet sed orci sit amet, volutpat convallis dui. Ut efficitur nisl sit amet felis eleifend maximus. Aenean et odio ullamcorper, consectetur dui quis, varius massa. Sed scelerisque, purus pellentesque molestie bibendum, elit nunc accumsan augue, et lacinia metus nibh molestie mi.
</p>
<p>
    Pellentesque velit orci, scelerisque non ipsum vitae, molestie pretium sapien. Phasellus scelerisque in sem id tempor. Phasellus sollicitudin sit amet sem nec fringilla. Ut odio diam, tincidunt nec ligula sed, pretium consectetur eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla sed est justo. Maecenas at nisi nec enim consectetur blandit egestas ut erat. Vivamus tincidunt ipsum consectetur metus auctor, non aliquet felis tincidunt.
</p>
<p>
    Etiam a eros condimentum augue euismod porta. Curabitur neque justo, tincidunt ut elementum et, sodales id nulla. Etiam lacinia nibh libero, ultrices imperdiet metus maximus sollicitudin. Phasellus non lectus condimentum, dignissim tellus et, placerat turpis. Proin dapibus nisl purus, auctor mollis massa semper sed. Duis sed viverra ligula. Nunc cursus lectus non diam lobortis bibendum. Sed pretium rutrum nibh, ac pharetra augue tempus vitae. Suspendisse quis semper augue. In vehicula ante sed augue imperdiet mollis. Donec sit amet laoreet est. Quisque sit amet erat interdum, tincidunt odio non, egestas turpis. Duis vulputate fringilla lacus id euismod. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
</p>
<p>
    Fusce a sodales augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac nisl sapien. Aliquam erat volutpat. Donec auctor orci erat, vel pharetra est condimentum vitae. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis sapien tortor, lobortis a suscipit vitae, semper id nunc. Fusce eu accumsan tortor. Nullam scelerisque diam vel dolor mattis dignissim. Nam sapien metus, volutpat eget urna sit amet, ultrices dictum arcu. Etiam blandit odio vitae erat sollicitudin auctor. Fusce at velit urna. Sed feugiat elit id imperdiet dapibus. Sed lobortis, lacus id ullamcorper dapibus, odio metus laoreet metus, vitae gravida nisi eros in est. Proin nulla augue, interdum cursus erat in, dapibus iaculis ex. Proin felis metus, elementum vitae tortor in, molestie mollis dolor.
</p>`;
const SLOT = `
    <div class="flex-wrapper">
        <div class="flex-wrapper__left">
            <kul-button kul-icon="menu" kul-styling="icon"></kul-button>
        </div>
        <div class="flex-wrapper__title">Header bar</div>
    </div>
`;
const HEADER_IFRAME_MOCK = `
<!DOCTYPE html>
<html dir="ltr" lang="en">
    ${HEAD}
    <body>
        <div id="ketchup-lite-showcase">
        <kul-header>
            ${SLOT}
        </kul-header>
        ${TEXT}
        </div>
    </body>
</html>
`;
const HEADER_IFRAME_MOCK_STYLE = `
<!DOCTYPE html>
<html dir="ltr" lang="en">
    ${HEAD}
    <body>
        <div id="ketchup-lite-showcase">
        <kul-header kul-style="#kul-component { opacity: 0.5 }">
            ${SLOT}
        </kul-header>
        ${TEXT}
        </div>
    </body>
</html>
`;

const HEADER_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple header component',
        iframeProps: {
            height: '100%',
            srcDoc: HEADER_IFRAME_MOCK,
            width: '100%',
        },
    },
    style: {
        ['data-description']: 'Header with custom style',
        ['data-dynamic']: 'custom',
        iframeProps: {
            height: '100%',
            srcDoc: HEADER_IFRAME_MOCK_STYLE,
            width: '100%',
        },
    },
};
const HEADER_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulHeader',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a simple element with a header styling which receives a .',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'slot',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            value: '.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.1.1.0',
                                    tagName: 'strong',
                                    value: 'Customizable Styling',
                                },
                                {
                                    id: '0.1.1.1',
                                    value: ": Offers the ability to customize the component's style through the ",
                                },
                                {
                                    id: '0.1.1.2',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.1.1.3',
                                    value: ' property.',
                                },
                            ],
                            id: '0.1.1',
                            tagName: 'li',
                        },
                    ],
                    id: '0.1',
                    value: 'Features',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulHeader',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'slot',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' that must be displayed inside it.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-header>\n   <div class="slot">\n      <kul-button kul-icon="menu" kul-styling="icon"></kul-button>\n   </div>\n</kul-header>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.3.1.0.0',
                                            value: 'Type:',
                                        },
                                        {
                                            id: '0.3.1.0.1',
                                            tagName: 'strong',
                                            value: 'string',
                                        },
                                    ],
                                    id: '0.3.1.0',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '0.3.1.1.0',
                                            value: "Enables customization of the component's style. This property accepts a string of CSS styles that will be applied to the component.",
                                        },
                                    ],
                                    id: '0.3.1.1',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.3.1',
                            value: 'kulStyle',
                        },
                    ],
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-header-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.5.0.0',
                                    value: 'Returns a promise that resolves to a ',
                                },
                                {
                                    id: '0.5.0.1',
                                    tagName: 'strong',
                                    value: 'KulDebugComponentInfo',
                                },
                                {
                                    id: '0.5.0.2',
                                    value: " object containing debug information about the component's rendering process.",
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.0',
                            tagName: 'strong',
                            value: 'getDebugInfo()',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.1.0',
                                    value: 'Returns a promise that resolves to an object where each key is a property name, optionally with its description.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.1',
                            tagName: 'strong',
                            value: 'getProps(descriptions?: boolean)',
                        },
                        {
                            children: [
                                {
                                    id: '0.5.2.0',
                                    value: 'Triggers a re-render of the component to reflect any state changes.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.5.2',
                            tagName: 'strong',
                            value: 'refresh()',
                        },
                    ],
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.7.0.0',
                                    value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                                },
                                {
                                    id: '0.7.0.1',
                                    tagName: 'strong',
                                    value: 'kulStyle',
                                },
                                {
                                    id: '0.7.0.2',
                                    value: ' property.',
                                },
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            kulLanguage: 'markup',
                                            value: '<kul-header kul-style="#kul-component { opacity: 0.5; }"></kul-header>',
                                        },
                                    },
                                    id: '0.7.0.3',
                                    value: '',
                                },
                            ],
                            id: '0.7.0',
                            tagName: 'strong',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-header-box-shadow',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': Box shadow of the component. Defaults to 0 2px 4px -1px rgba(128, 128, 128, 0.2), 0 4px 5px 0 rgba(128, 128, 128, 0.14), 0 1px 10px 0 rgba(128, 128, 128, 0.12).',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-header-padding',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': Padding of the component. Defaults to 8px 12px.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-header-position',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': CSS positioning of the component. Defaults to fixed.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-header-transition',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': Transition time of the component. Defaults to 250ms.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryH3,
                                            id: '0.7.1.0.0',
                                            tagName: 'strong',
                                            value: '--kul-header-width',
                                        },
                                        {
                                            id: '0.7.1.0.1',
                                            value: ': Width of the component. Defaults to 100%.',
                                        },
                                    ],
                                    id: '0.7.1.0',
                                    tagName: 'li',
                                    value: '',
                                },
                            ],
                            id: '0.7.1',
                            value: 'CSS Variables',
                        },
                    ],
                    id: '0.7',
                    value: 'Styling',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.8.0.0',
                                    value: 'The ',
                                },
                                {
                                    id: '0.8.0.1',
                                    tagName: 'strong',
                                    value: 'KulHeader',
                                },
                                {
                                    id: '0.8.0.2',
                                    value: " component is a simple yet useful layouting tool to wrap your app's header content.",
                                },
                            ],
                            id: '0.8.0',
                            tagName: 'strong',
                            value: '',
                        },
                    ],
                    id: '0.8',
                    value: 'Conclusion',
                },
            ],
            id: '0',
            value: 'KulHeader',
        },
    ],
};

const kulShowcaseHeaderCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseHeaderStyle0 = kulShowcaseHeaderCss;

const KulShowcaseHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in HEADER_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(HEADER_EXAMPLES, key)) {
                const props = HEADER_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("iframe", { key: key, id: key, ...props.iframeProps }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: 'd4f30e56a6625791397b41978187bdd7a8d07900' }, h("kul-article", { key: '22282b3cadc3f1bf041306e4fde0618e9fd98b3b', kulData: HEADER_DOC }), h("div", { key: 'd45b808f4f2faf3e01e1c106abbc3f1a92fc0567', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'b975b4dfbbda15dfef97fccd67ad82b801d08a8d', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
};
KulShowcaseHeader.style = KulShowcaseHeaderStyle0;

const component$b = 'image';
const image = getAssetPath(`./assets/media/color_splash.jpg`);
const IMAGE_EXAMPLES = {
    badge: {
        ['data-description']: 'Image with badge',
        kulBadgeProps: { kulLabel: random2digitsNumber().toString() },
        kulSizeX: '128px',
        kulSizeY: '128px',
        kulValue: image,
    },
    cover: {
        ['data-description']: 'Image set as cover of a container',
        className: 'kul-cover',
        kulSizeX: '128px',
        kulSizeY: '256px',
        kulValue: image,
    },
    fit: {
        ['data-description']: 'Image fitting a container',
        className: 'kul-fit',
        kulSizeX: '128px',
        kulSizeY: '256px',
        kulValue: image,
    },
    icon: {
        ['data-description']: 'Icon',
        kulSizeX: '256px',
        kulSizeY: '256px',
        kulValue: 'widgets',
    },
    image: {
        ['data-description']: 'Image',
        kulSizeX: '256px',
        kulSizeY: '256px',
        kulValue: image,
    },
    style: {
        ['data-description']: 'Icon with custom style',
        ['data-dynamic']: 'custom',
        kulSizeX: '256px',
        kulSizeY: '256px',
        kulValue: 'widgets',
    },
};
const IMAGE_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulImage',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render images or icons based on a provided source or CSS variable.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulImage',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulValue',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the source URL of the image or the CSS variable for the icon.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-image></kul-image>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "kulValue": "path/to/image.jpg" }',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$b),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'click',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component is clicked.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.1.0',
                                                                    tagName: 'strong',
                                                                    value: 'load',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.1.1',
                                                                    value: ": emitted when the image is loaded (unless it's an icon).",
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.1',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.2.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.2.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.2',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-image-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$b),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$b),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulImage',
        },
    ],
};

const kulShowcaseImageCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}";
const KulShowcaseImageStyle0 = kulShowcaseImageCss;

const KulShowcaseImage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in IMAGE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(IMAGE_EXAMPLES, key)) {
                const props = IMAGE_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-image", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '715949233f8aeaedbd48d8dcdf57c62048992ddd' }, h("kul-article", { key: '985e8a1769258887044fd3029bbc5ec138a4db1f', kulData: IMAGE_DOC }), h("div", { key: '1f5abf8040785a8041213c48785c7a103454a378', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '50fafbe3347b37a32b451a350e26bfb713c5966f', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseImage.style = KulShowcaseImageStyle0;

const MANAGER_DATA = {
    nodes: [
        {
            id: '0',
            value: 'KulManager',
            children: [
                {
                    id: '1',
                    value: 'Overview',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.1.1',
                                    tagName: 'strong',
                                    value: 'KulManager',
                                },
                                {
                                    id: '1.1.2',
                                    value: ' is a Javascript class which wraps quite a few functionalities and contains other manager classes - such as the theme one.',
                                },
                            ],
                            id: '1.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '1.2.1',
                                    tagName: 'strong',
                                    value: 'KulManager',
                                },
                                {
                                    id: '1.2.2',
                                    value: ' is automatically instanced as a singleton by the first component loaded inside the DOM.',
                                },
                            ],
                            id: '1.2',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '1.3.1',
                                    value: "There are a few default behaviors of the library which can be altered. In order to do so, it's possible to define a custom property on the ",
                                },
                                {
                                    id: '1.3.2',
                                    tagName: 'strong',
                                    value: 'documentElement',
                                },
                                {
                                    id: '1.3.3',
                                    value: ' named ',
                                },
                                {
                                    id: '1.3.4',
                                    tagName: 'strong',
                                    value: 'ketchupLiteInit',
                                },
                                {
                                    id: '1.3.5',
                                    value: ' before the body of the document.',
                                },
                            ],
                            id: '1.3',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '1.4.1',
                                    value: "For example, let's say you wish to load Ketchup Lite with the 'Night' theme enabled.",
                                },
                                {
                                    id: '1.4.2',
                                    tagName: 'strong',
                                    value: 'This is all you need to do inside a script tag contained by the head tag:',
                                },
                                {
                                    cells: {
                                        kulCode: {
                                            shape: 'code',
                                            value: "const dom = document.documentElement;\ndom.ketchupLiteInit = {\n   theme: { name: 'night' },\n};",
                                        },
                                    },
                                    id: '1.4.3',
                                },
                            ],
                            id: '1.4',
                            value: '',
                        },
                    ],
                },
                {
                    id: '2',
                    value: 'Initialization Settings',
                    children: [
                        {
                            children: [
                                {
                                    id: '2.1.1',
                                    cssStyle: DOC_STYLES.monoPrimaryContent,
                                    tagName: 'strong',
                                    value: 'assetsPath (string)',
                                },
                                {
                                    id: '2.1.2',
                                    value: ': sets the URL where static assets used by the library are located, such as SVGs.',
                                },
                            ],
                            id: '2.1',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '2.2.1',
                                    cssStyle: DOC_STYLES.monoPrimaryContent,
                                    tagName: 'strong',
                                    value: 'autoSetLocalization (boolean)',
                                },
                                {
                                    id: '2.2.2',
                                    value: ':  when true, the library automatically sets KulLanguage and KulMath locales to KulDates.',
                                },
                            ],
                            id: '2.2',
                            value: '',
                        },
                        {
                            children: [
                                {
                                    id: '2.3.1',
                                    value: '- ',
                                },
                                {
                                    cssStyle: DOC_STYLES.monoPrimaryContent,
                                    id: '2.3.2',
                                    tagName: 'strong',
                                    value: 'locale(string)',
                                },
                                {
                                    id: '2.3.3',
                                    value: ': sets the locale of the library in regard to time and dates.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3Large,
                            id: '2.3',
                            value: 'dates',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '2.4.1.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.4.1.2',
                                            tagName: 'strong',
                                            value: 'active(boolean)',
                                        },
                                        {
                                            id: '2.4.1.3',
                                            value: ': sets whether the debug is active or not.',
                                        },
                                    ],
                                    id: '2.4.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '2.4.2.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.4.2.2',
                                            tagName: 'strong',
                                            value: 'autoPrint(boolean)',
                                        },
                                        {
                                            id: '2.4.2.3',
                                            value: ': sets whether the debug widget automatically print new logs.',
                                        },
                                    ],
                                    id: '2.4.2',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '2.4.3.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.4.3.2',
                                            tagName: 'strong',
                                            value: 'logLimit(number)',
                                        },
                                        {
                                            id: '2.4.3.3',
                                            value: ': sets the maximum number of debug logs to store.',
                                        },
                                    ],
                                    id: '2.4.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3Large,
                            id: '2.4',
                            value: 'debug',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '2.5.1.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.5.1.2',
                                            tagName: 'strong',
                                            value: 'list(JSON)',
                                        },
                                        {
                                            id: '2.5.1.3',
                                            value: ': sets a custom list of languages.',
                                        },
                                    ],
                                    id: '2.5.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '2.5.2.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.5.2.2',
                                            tagName: 'strong',
                                            value: 'name(string)',
                                        },
                                        {
                                            id: '2.5.2.3',
                                            value: ": sets the library's current language.",
                                        },
                                    ],
                                    id: '2.5.2',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3Large,
                            id: '2.6',
                            value: 'language',
                        },
                        {
                            children: [
                                {
                                    id: '2.3.1',
                                    value: '- ',
                                },
                                {
                                    cssStyle: DOC_STYLES.monoPrimaryContent,
                                    id: '2.3.2',
                                    tagName: 'strong',
                                    value: 'locale(string)',
                                },
                                {
                                    id: '2.3.3',
                                    value: ':  sets the locale of the library in regard to math and amounts.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3Large,
                            id: '2.3',
                            value: 'math',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '2.6.1.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.6.1.2',
                                            tagName: 'strong',
                                            value: 'delay(number)',
                                        },
                                        {
                                            id: '2.6.1.3',
                                            value: ': sets the delay after which the scroll on hover starts.',
                                        },
                                    ],
                                    id: '2.6.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '2.6.2.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.6.2.2',
                                            tagName: 'strong',
                                            value: 'step(number)',
                                        },
                                        {
                                            id: '2.6.2.3',
                                            value: ': sets the step size in pixel of each scroll.',
                                        },
                                    ],
                                    id: '2.6.2',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3Large,
                            id: '2.7',
                            value: 'scrollOnHover',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '2.7.1.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.7.1.2',
                                            tagName: 'strong',
                                            value: 'list(JSON)',
                                        },
                                        {
                                            id: '2.7.1.3',
                                            value: ': sets a custom list of themes.',
                                        },
                                    ],
                                    id: '2.7.1',
                                    value: '',
                                },
                                {
                                    children: [
                                        {
                                            id: '2.7.2.1',
                                            value: '- ',
                                        },
                                        {
                                            cssStyle: DOC_STYLES.monoPrimaryContent,
                                            id: '2.7.2.2',
                                            tagName: 'strong',
                                            value: 'name(string)',
                                        },
                                        {
                                            id: '2.7.2.3',
                                            value: ': sets the initial theme of the library.',
                                        },
                                    ],
                                    id: '2.7.2',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3Large,
                            id: '2.8',
                            value: 'theme',
                        },
                    ],
                },
            ],
        },
    ],
};

const kulShowcaseKulmanagerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}.text-section{line-height:1.6;margin:0 auto;margin-bottom:20px;max-width:800px}.text-paragraph{margin-bottom:10px}.text-sub{display:block;margin-bottom:5px;font-size:1.275em}.code-word{padding:2px 4px;border-radius:3px}code.flat{display:block;padding:10px;border-radius:5px;white-space:pre-wrap;overflow-x:auto}code.flat{background:none;border-radius:0;box-shadow:0 0 2px 0px rgb(128, 128, 128);color:var(--kul-primary-color);display:flex;font-family:var(--kul-font-family-monospace);font-size:16px;font-weight:500;margin:40px auto;max-width:100%;padding:20px 10px;width:max-content}";
const KulShowcaseKulmanagerStyle0 = kulShowcaseKulmanagerCss;

const KulShowcaseKulmanager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: '7b27b97fb713698b09cb7d1e3b3cc2746e582ffb' }, h("div", { key: '7e5ac7205e4b8499b1f05da7dd7d84687edfc2e8', id: KUL_WRAPPER_ID }, h("kul-article", { key: '6fb68e927ad80ea1f435a6c9d3dadb65af61a0f4', kulData: MANAGER_DATA }))));
    }
};
KulShowcaseKulmanager.style = KulShowcaseKulmanagerStyle0;

const component$a = 'lazy';
const LAZY_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple tab bar',
        kulComponentName: 'kul-button',
        kulComponentProps: { kulLabel: 'Button' },
    },
    style: {
        ['data-description']: 'Tab bar with custom style',
        'data-dynamic': 'custom',
        kulComponentName: 'kul-button',
        kulComponentProps: { kulLabel: 'Button' },
    },
};
const LAZY_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulLazy',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: " component's main purpose is to prevent long page loading times, displaying a placeholder until it's relevant to switch to the actual component.",
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulLazy',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the name of the inner component through the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulComponentName',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property and its related properties through ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulComponentProps',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: '.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-lazy></kul-lazy>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$a),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulLazyEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'load',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the inner component is loaded.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-lazy-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$a),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$a),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulLazy',
        },
    ],
};

const kulShowcaseLazyCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseLazyStyle0 = kulShowcaseLazyCss;

const KulShowcaseLazy = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in LAZY_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(LAZY_EXAMPLES, key)) {
                const props = LAZY_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-lazy", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '32f42deb9bfed643cce16457000861942febde74' }, h("kul-article", { key: '2ddb624ee33ed474991980d7d79c1354ba37db43', kulData: LAZY_DOC }), h("div", { key: 'b06fe39ea3366a9593e0c7e298896dabda15a1e7', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '45319c3ebf30b05287ec1786d608693f6c8c0aac', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseLazy.style = KulShowcaseLazyStyle0;

const component$9 = 'list';
const kulData$2 = {
    nodes: [
        { id: '0', value: 'First item' },
        {
            description: 'Second item (subtitle)',
            id: '1',
            value: 'Second item (title)',
        },
        { icon: 'widgets', id: '2', value: 'Third item (icon)' },
    ],
};
const LIST_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple list',
        kulData: kulData$2,
    },
    style: {
        ['data-description']: 'List with custom style',
        'data-dynamic': 'custom',
        kulData: kulData$2,
    },
};
const LIST_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulList',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is used to display a list of items vertically. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulList',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the list bar.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-list></kul-list>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [{"value": "Item 1", "id": "1"}, {"value": "Item 2", "id": "2"}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$9),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulListEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'blur',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when an item loses focus.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'click',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when an item is clicked.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'focus',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when an item is focused.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'pointerdown',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when as soon as an item is touched/clicked (before the click event).',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-list-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$9),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$9),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulList',
        },
    ],
};

const kulShowcaseListCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseListStyle0 = kulShowcaseListCss;

const KulShowcaseList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in LIST_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(LIST_EXAMPLES, key)) {
                const props = LIST_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-list", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '776ca0d25fd9547154391d6467e983ca68a160f8' }, h("kul-article", { key: 'f6030b574e856c38fc02d7c2eb447a707541bc42', kulData: LIST_DOC }), h("div", { key: 'ea3231c08699be760944d311237b2314abdc4e2c', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '020cc126c9b8ef057585f67edd9c3041cea33f20', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseList.style = KulShowcaseListStyle0;

const component$8 = 'photoframe';
const placeholder = getAssetPath(`./assets/media/blur_color_splash.jpg`);
const value = getAssetPath(`./assets/media/color_splash.jpg`);
const kulPlaceholder = {
    alt: null,
    src: placeholder,
};
const kulValue = {
    alt: null,
    src: value,
};
const PHOTOFRAME_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple photoframe',
        kulPlaceholder,
        kulValue,
    },
    style: {
        ['data-description']: 'Photoframe with custom style',
        'data-dynamic': 'custom',
        kulPlaceholder,
        kulValue,
    },
};
const PHOTOFRAME_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulPhotoframe',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: " component's function is to display a photo only when it enters the viewport. Until then, a placeholder is displayed.",
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulPhotoframe',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulPlaceholder',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            value: ' and ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulValue',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' properties, which should contain respectively the placeholder image and the actual image you want to display.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-photoframe></kul-photoframe>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$8),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulPhotoframeEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'load',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when either the placeholder or the image are loaded. The difference is made by the ',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'isPlaceholder',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            value: ' boolean flag inside the ',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'detail',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            value: ' of the event.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-photoframe-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$8),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$8),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulPhotoframe',
        },
    ],
};

const kulShowcasePhotoframeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcasePhotoframeStyle0 = kulShowcasePhotoframeCss;

const KulShowcasePhotoframe = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in PHOTOFRAME_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(PHOTOFRAME_EXAMPLES, key)) {
                const props = PHOTOFRAME_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-photoframe", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '37119fad9c7126e918758f582150424a0238ae20' }, h("kul-article", { key: '2664915024f3c629a5a596635cd72591129ca155', kulData: PHOTOFRAME_DOC }), h("div", { key: '7d55575aa70512d30a9fea76b3b9a5371f8b1302', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '1982e24dd75f39f84fcfc17d95773db87903cafa', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcasePhotoframe.style = KulShowcasePhotoframeStyle0;

const SPINNER_EXAMPLES_KEYS = ['spinner', 'spinnerActive', 'style'];

const component$7 = 'spinner';
function createSpinnerData(barLayouts, widgetsLayouts) {
    const spinnerData = {
        bar: {},
        widget: {},
    };
    for (let i = 1; i <= barLayouts; i++) {
        SPINNER_EXAMPLES_KEYS.forEach((exampleType) => {
            if (!spinnerData.bar[i]) {
                spinnerData.bar[i] = {};
            }
            switch (exampleType) {
                case 'spinner':
                    spinnerData.bar[i][exampleType] = {
                        ['data-description']: 'Inactive',
                        kulActive: false,
                        kulBarVariant: true,
                        kulLayout: i,
                    };
                    break;
                case 'spinnerActive':
                    spinnerData.bar[i][exampleType] = {
                        ['data-description']: 'Active',
                        kulActive: true,
                        kulBarVariant: true,
                        kulLayout: i,
                    };
                    break;
                case 'style':
                    spinnerData.bar[i][exampleType] = {
                        'data-description': 'Custom style',
                        'data-dynamic': 'custom',
                        kulActive: true,
                        kulBarVariant: true,
                        kulLayout: i,
                    };
                    break;
            }
        });
    }
    for (let i = 1; i <= widgetsLayouts; i++) {
        SPINNER_EXAMPLES_KEYS.forEach((exampleType) => {
            if (!spinnerData.widget[i]) {
                spinnerData.widget[i] = {};
            }
            switch (exampleType) {
                case 'spinner':
                    spinnerData.widget[i][exampleType] = {
                        ['data-description']: 'Inactive',
                        kulActive: false,
                        kulLayout: i,
                    };
                    break;
                case 'spinnerActive':
                    spinnerData.widget[i][exampleType] = {
                        ['data-description']: 'Active',
                        kulActive: true,
                        kulLayout: i,
                    };
                    break;
                case 'style':
                    spinnerData.widget[i][exampleType] = {
                        'data-description': 'Custom style',
                        'data-dynamic': 'custom',
                        kulActive: true,
                        kulLayout: i,
                    };
                    break;
            }
        });
    }
    return spinnerData;
}
const SPINNER_EXAMPLES = createSpinnerData(2, 14);
const SPINNER_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulSpinner',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render spinners based on a JSON structure.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulSpinner',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the spinner.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-spinner></kul-spinner>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [{"value": "Spinner Title", "id": "0", "children": [{"value": "Section Title", "id": "0.1", "children": [{"value": "Paragraph title", "id": "0.1.1", "children": [{"value": "Text", "id": "0.1.1.1"}, {"value": "Strong text", "id": "0.1.1.2", "tagName": "strong"}]}]}]}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$7),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.2.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-spinner-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$7),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$7),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulSpinner',
        },
    ],
};

const kulShowcaseSpinnerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}.comp-wrapper{height:200px;margin:auto;width:200px}";
const KulShowcaseSpinnerStyle0 = kulShowcaseSpinnerCss;

const KulShowcaseSpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #interval;
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        // Iterate over each example category in SPINNER_EXAMPLES
        for (const k1 in SPINNER_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(SPINNER_EXAMPLES, k1)) {
                const type = SPINNER_EXAMPLES[k1];
                // Iterate over each spinner type
                for (const k2 in type) {
                    if (Object.prototype.hasOwnProperty.call(type, k2)) {
                        const layout = type[k2];
                        const layoutWrapper = [];
                        // Iterate over each layout number
                        for (const k3 in layout) {
                            if (Object.prototype.hasOwnProperty.call(layout, k3)) {
                                const props = layout[k3];
                                layoutWrapper.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-spinner", { key: k2, id: k1 + '-' + k3, ...props, ref: (el) => {
                                        if (el &&
                                            props['data-dynamic']) {
                                            this.#dynamicExamples.push(el);
                                        }
                                    } }))));
                            }
                        }
                        elements.push(h("div", { class: "grid-container", part: "grid-container" }, h("div", { class: "grid-title", part: "grid-title" }, k1, " (Layout ", k2, ")"), h("div", { class: "grid", part: "grid" }, layoutWrapper)));
                    }
                }
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: 'e4744d3b855791ad1b334c8e3a224f7718c9fcb6' }, h("kul-article", { key: 'ec47dfde88e05de38196618e6495c9964379eddd', kulData: SPINNER_DOC }), h("div", { key: 'b9cd063425a227dad9ba20bb920ae373a3b24ec4', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'b39f8c0c84bcd07b5714441c23cb755391b37641', "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseSpinner.style = KulShowcaseSpinnerStyle0;

const component$6 = 'splash';
const SPLASH_EXAMPLES = {
    label: {
        ['data-description']: 'Splash with custom label',
        kulLabel: 'This is a custom label!',
    },
    style: {
        ['data-description']: 'Splash with custom style',
        kulStyle: `.wrapper { animation: pulse 1.275s infinite; } @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.25; } 100% { opacity: 1; } }`,
    },
};
const SPLASH_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulSplash',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render splash screens based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulSplash',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: " component, include it in your HTML. Keep in mind that it's a component designed to cover the whole page.",
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-splash></kul-splash>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$6),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.1.0',
                                                            tagName: 'strong',
                                                            value: 'unmount',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.1.1',
                                                            value: ': emitted when the component is removed from the DOM.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.1',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-splash-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$6),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$6),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulSplash',
        },
    ],
};

const kulShowcaseSplashCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-button{margin:auto}";
const KulShowcaseSplashStyle0 = kulShowcaseSplashCss;

const KulShowcaseSplash = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in SPLASH_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(SPLASH_EXAMPLES, key)) {
                const props = SPLASH_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-button", { id: key + '-trigger', kulLabel: "Splash!", onClick: () => {
                        const splash = document.createElement('kul-splash');
                        splash.id = key;
                        splash.kulLabel =
                            props.kulLabel || 'Click to close...';
                        splash.kulStyle = props.kulStyle;
                        splash.addEventListener('click', () => {
                            splash.remove();
                        });
                        const spinner = document.createElement('kul-spinner');
                        spinner.kulActive = true;
                        spinner.kulDimensions = '7px';
                        spinner.kulLayout = 7;
                        splash.appendChild(spinner);
                        document.body.appendChild(splash);
                    } }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: 'ea319f1f30951ed445527bf1d0ea7a6303aca33f' }, h("kul-article", { key: '153f5f2187a3ac9c5df82de85b0bebffb2c41baa', kulData: SPLASH_DOC }), h("div", { key: '3fbe975bd74a5207079ab281fb480dbfcd1b2a61', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '121f5e814d9453c4767a13fc0f92a1d52d201112', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
};
KulShowcaseSplash.style = KulShowcaseSplashStyle0;

const component$5 = 'switch';
const SWITCH_EXAMPLES = {
    colors: {
        ['data-description']: 'Switch states colors',
        ['data-dynamic']: 'state-colors',
        kulLabel: 'States colors',
        kulDisabled: false,
        kulValue: true,
    },
    disabled: {
        ['data-description']: 'Disabled switch',
        kulDisabled: true,
        kulLabel: 'Disabled',
    },
    simple: {
        ['data-description']: 'Switch with leading label',
        kulLabel: 'Leading label',
        kulLeadingLabel: true,
    },
    style: {
        ['data-description']: 'Icon with custom style',
        ['data-dynamic']: 'custom',
        kulLabel: 'Custom style',
    },
};
const SWITCH_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulSwitch',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component can be used as a simpler toggler.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulSwitch',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-switch></kul-switch>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$5),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'blur',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component is blurred.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'change',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ": emitted when the component' state changes.",
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'focus',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.0.1',
                                                                    value: ': emitted when the component is blurred.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.2.0.0.2.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.2.0.0.2.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.2.0.0.2',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.2.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-switch-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$5),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$5),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulSwitch',
        },
    ],
};

const kulShowcaseSwitchCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-switch{margin:auto}";
const KulShowcaseSwitchStyle0 = kulShowcaseSwitchCss;

const KulShowcaseSwitch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in SWITCH_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(SWITCH_EXAMPLES, key)) {
                const props = SWITCH_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-switch", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                        case 'state-colors':
                            comp.className =
                                'hydrated ' +
                                    this.#dynamicExampleManager.stateColors.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: 'f21b3b2145e8dea889f6c929f8a9034f2960a279' }, h("kul-article", { key: '8465249589774807a1f0d2f1e51836454b9ae902', kulData: SWITCH_DOC }), h("div", { key: '815e75c9733a0cc6fd12c61eab0e4f3d0b9211b4', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'f1b546f619432643f7eeac9071f07af26e1d0fa3', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseSwitch.style = KulShowcaseSwitchStyle0;

const component$4 = 'tabbar';
const kulData$1 = {
    nodes: [
        { id: '0', value: 'First tab' },
        {
            description: 'Second tab (title)',
            id: '1',
            value: 'Second tab (title)',
        },
        { icon: 'widgets', id: '2', value: 'Third tab (icon)' },
    ],
};
const TABBAR_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple tab bar',
        kulData: kulData$1,
    },
    style: {
        ['data-description']: 'Tab bar with custom style',
        'data-dynamic': 'custom',
        kulData: kulData$1,
    },
};
const TABBAR_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulTabbar',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render tab bars based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulTabbar',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the tab bar.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-tabbar></kul-tabbar>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [{"value": "Tab 1", "id": "0"}, {"value": "Tab 2", "id": "1"}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$4),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulTabbarEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'click',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when a tab is clicked.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'pointerdown',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when as soon as the component is touched/clicked (before the click event).',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-tabbar-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$4),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$4),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulTabbar',
        },
    ],
};

const kulShowcaseTabbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseTabbarStyle0 = kulShowcaseTabbarCss;

const KulShowcaseTabbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in TABBAR_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(TABBAR_EXAMPLES, key)) {
                const props = TABBAR_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-tabbar", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '222dbb86d3d74a859424e2cfc01457af0745ddb8' }, h("kul-article", { key: 'a6d55e820b9ff7df85d8fd3d2edd97ee80c8536b', kulData: TABBAR_DOC }), h("div", { key: '9fefc96e26de7d4eaa5750fb0f85078bb9cc1069', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'a5fa926020809511d88f017becb6746a270f1a21', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseTabbar.style = KulShowcaseTabbarStyle0;

const component$3 = 'textfield';
const TEXTFIELD_EXAMPLES = {
    flat: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledIcon: {
            ['data-description']: 'Disabled textfield with icon',
            kulDisabled: true,
            kulIcon: 'widgets',
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        disabledFullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulDisabled: true,
            kulFullWidth: true,
            kulLabel: 'Full width label (disabled)',
        },
        disabledFullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulDisabled: true,
            kulFullWidth: true,
            kulValue: 'Full width value (disabled)',
        },
        fullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulFullWidth: true,
            kulLabel: 'Full width label',
        },
        fullWidthIcon: {
            ['data-description']: 'Full width textfield with icon',
            kulFullWidth: true,
            kulIcon: 'widgets',
            kulLabel: 'Full width with icon',
        },
        fullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulFullWidth: true,
            kulValue: 'Value',
        },
        icon: {
            ['data-description']: 'Textfield with icon',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        labelIcon: {
            ['data-description']: 'Textfield with label and icon',
            kulIcon: 'widgets',
            kulLabel: 'Textfield with label and icon',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
    outlined: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledIcon: {
            ['data-description']: 'Disabled textfield with icon',
            kulDisabled: true,
            kulIcon: 'widgets',
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        icon: {
            ['data-description']: 'Textfield with icon',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        labelIcon: {
            ['data-description']: 'Textfield with label and icon',
            kulIcon: 'widgets',
            kulLabel: 'Textfield with label and icon',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
    raised: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledIcon: {
            ['data-description']: 'Disabled textfield with icon',
            kulDisabled: true,
            kulIcon: 'widgets',
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        disabledFullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulDisabled: true,
            kulFullWidth: true,
            kulLabel: 'Full width label (disabled)',
        },
        disabledFullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulDisabled: true,
            kulFullWidth: true,
            kulValue: 'Full width value (disabled)',
        },
        fullWidthLabel: {
            ['data-description']: 'Full width textfield with label',
            kulFullWidth: true,
            kulLabel: 'Full width label',
        },
        fullWidthIcon: {
            ['data-description']: 'Full width textfield with icon',
            kulFullWidth: true,
            kulIcon: 'widgets',
            kulLabel: 'Full width with icon',
        },
        fullWidthValue: {
            ['data-description']: 'Full width textfield with value',
            kulFullWidth: true,
            kulValue: 'Value',
        },
        icon: {
            ['data-description']: 'Textfield with icon',
            kulIcon: 'widgets',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        labelIcon: {
            ['data-description']: 'Textfield with label and icon',
            kulIcon: 'widgets',
            kulLabel: 'Textfield with label and icon',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
    textarea: {
        colors: {
            ['data-description']: 'Textfield states colors',
            ['data-dynamic']: 'state-colors',
            kulLabel: 'State colors',
            kulValue: 'Value',
        },
        disabled: {
            ['data-description']: 'Disabled textfield',
            kulDisabled: true,
            kulLabel: 'Disabled',
        },
        disabledValue: {
            ['data-description']: 'Disabled textfield with value',
            kulDisabled: true,
            kulLabel: 'Disabled',
            kulValue: 'Value',
        },
        label: {
            ['data-description']: 'Textfield with label',
            kulLabel: 'Textfield with label',
        },
        style: {
            ['data-description']: 'Textfield with custom style',
            ['data-dynamic']: 'custom',
            kulLabel: 'Textfield with custom style',
        },
    },
};
const TEXTFIELD_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulTextfield',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a customizable and reusable web component to input text.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulTextfield',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and optionally provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulLabel',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' and ',
                                        },
                                        {
                                            id: '0.2.0.0.5',
                                            tagName: 'strong',
                                            value: 'kulImageProps',
                                        },
                                        {
                                            id: '0.2.0.0.6',
                                            value: " properties to customize the textfield's content.",
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-textfield></kul-textfield>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$3),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    tagName: 'strong',
                                    value: 'KulEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.0.0',
                                                                    tagName: 'strong',
                                                                    value: 'click',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.0.1',
                                                                    value: ': emitted when the component is clicked.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                        {
                                                            children: [
                                                                {
                                                                    id: '0.4.0.3.0.0.1.0',
                                                                    tagName: 'strong',
                                                                    value: 'ready',
                                                                },
                                                                {
                                                                    id: '0.4.0.3.0.0.1.1',
                                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                                },
                                                            ],
                                                            id: '0.4.0.3.0.0.1',
                                                            tagName: 'li',
                                                            value: '',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-textfield-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$3),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$3),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulTextfield',
        },
    ],
};

const kulShowcaseTextfieldCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-textfield{margin:auto}";
const KulShowcaseTextfieldStyle0 = kulShowcaseTextfieldCss;

const KulShowcaseTextfield = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const k1 in TEXTFIELD_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(TEXTFIELD_EXAMPLES, k1)) {
                const category = TEXTFIELD_EXAMPLES[k1];
                const group = [];
                for (const k2 in category) {
                    if (Object.prototype.hasOwnProperty.call(category, k2)) {
                        const props = category[k2];
                        group.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-textfield", { key: k1 + '-' + k2, id: k1 + '-' + k2, ref: (el) => {
                                if (el && props['data-dynamic']) {
                                    this.#dynamicExamples.push(el);
                                }
                            }, ...props, kulStyling: k1 }))));
                    }
                }
                elements.push(h("div", { class: "grid-container", part: "grid-container" }, h("div", { class: "grid-title", part: "grid-title" }, k1), h("div", { class: "grid", part: "grid" }, group)));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                        case 'state-colors':
                            comp.className =
                                'hydrated ' +
                                    this.#dynamicExampleManager.stateColors.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '40e0fd88a1ab72e35b8ee9adaf32e7dcf798c929' }, h("kul-article", { key: 'f03722548e361843ce091570394887c2bf7df3fa', kulData: TEXTFIELD_DOC }), h("div", { key: '3ab68308c3989784b3fde6858d5426c5ae0ea37e', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '5b37b531cc2e0069ff83ba0ab8937dd58c25036a', "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseTextfield.style = KulShowcaseTextfieldStyle0;

const component$2 = 'toast';
const TOAST_EXAMPLES = {
    icon: {
        ['data-description']: 'Toast with custom label',
    },
    style: {
        ['data-description']: 'Toast with custom style',
        ['data-dynamic']: 'custom',
    },
};
const TOAST_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulToast',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to display toast notifications. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulToast',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: " component, include it in your HTML. You can customize the toast's message, icon, and auto-dismissal behavior.",
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-toast kul-message="Your message here"></kul-toast>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$2),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.1.0',
                                                            tagName: 'strong',
                                                            value: 'unmount',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.1.1',
                                                            value: ': emitted when the component is removed from the DOM.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.1',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            value: '',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$2),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$2),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulToast',
        },
    ],
};

const kulShowcaseToastCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-button{margin:auto}";
const KulShowcaseToastStyle0 = kulShowcaseToastCss;

const KulShowcaseToast = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in TOAST_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(TOAST_EXAMPLES, key)) {
                const props = TOAST_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-toast", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '1d944d24db42300c17eec2bd097f3ab17ae63a22' }, h("kul-article", { key: '012e51565dc3448c7b4950286a06a5eb4dc05cd5', kulData: TOAST_DOC }), h("div", { key: 'd7318fc15b592846b27e32ae4b6d872e4514105d', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '39e0d29d7f2815eae3ae06023d6c87615cb99175', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseToast.style = KulShowcaseToastStyle0;

const component$1 = 'tree';
const kulData = {
    nodes: [
        {
            id: '0001',
            value: 'Depth 0 (0)',
            icon: 'filter_1',
            children: [
                {
                    id: '0002',
                    value: 'Depth 1 (0)',
                    icon: 'filter_2',
                    children: [
                        {
                            id: '00021',
                            value: 'Depth 2 (0)',
                            icon: 'filter_3',
                            children: [
                                {
                                    id: '000211',
                                    value: 'Depth 3 (0)',
                                    icon: 'filter_4',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: '00022',
            value: 'Depth 0 (1)',
            icon: 'filter_2',
            children: [
                {
                    id: '000221',
                    value: 'Depth 1 (0)',
                    icon: 'filter_3',
                    children: [
                        {
                            id: '000222',
                            value: 'Depth 2 (0)',
                            icon: 'filter_4',
                        },
                    ],
                },
            ],
        },
        {
            id: '0003',
            value: 'Depth 0 (2)',
            icon: 'filter_2',
            children: [
                {
                    id: '00031',
                    value: 'Depth 1 (0)',
                    icon: 'filter_3',
                },
            ],
        },
        {
            id: '0004',
            value: 'Depth 0 (3)',
            icon: 'filter_2',
            children: [
                {
                    id: '00041',
                    value: 'Depth 1 (0)',
                    icon: 'filter_3',
                    children: [
                        {
                            id: '000411',
                            value: 'Depth 2 (0)',
                            icon: 'filter_4',
                            children: [
                                {
                                    id: '0004111',
                                    value: 'Depth 3 (0)',
                                    icon: 'filter_5',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};
const TREE_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple tree',
        kulData,
    },
    style: {
        ['data-description']: 'Tree with custom style',
        ['data-dynamic']: 'custom',
        kulData,
    },
};
const TREE_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulTree',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a versatile and customizable web component designed to render a tree based on a JSON structure. ',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulTree',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and provide the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulData',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: ' property with the JSON structure representing the tree.',
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-tree></kul-tree>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'json',
                                                    value: '{ "nodes": [{"value": "Node 1", "id": "0"}, {"value": "Node 2", "id": "1"}]}',
                                                },
                                            },
                                            id: '0.2.0.1.1',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component$1),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulTreeEventPayload',
                                },
                                {
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component, its state and the event type.',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'click',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when a node is clicked.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'pointerdown',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when as soon as a node is touched/clicked (before the click event).',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                                {
                                                    children: [
                                                        {
                                                            id: '0.4.0.3.0.0.0',
                                                            tagName: 'strong',
                                                            value: 'ready',
                                                        },
                                                        {
                                                            id: '0.4.0.3.0.0.1',
                                                            value: ': emitted when the component completes its first complete lifecycle.',
                                                        },
                                                    ],
                                                    id: '0.4.0.3.0.0',
                                                    tagName: 'li',
                                                    value: '',
                                                },
                                            ],
                                            id: '0.4.0.3.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.3',
                                    value: '',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-tree-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component$1),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component$1),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulTree',
        },
    ],
};

const kulShowcaseTreeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseTreeStyle0 = kulShowcaseTreeCss;

const KulShowcaseTree = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in TREE_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(TREE_EXAMPLES, key)) {
                const props = TREE_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-tree", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: '547412dbac4237ad1fcd4ad19ea5c0fc4b3aec5d' }, h("kul-article", { key: '6ce43772e4d89055e77a44d43e2bbf8947c2a65c', kulData: TREE_DOC }), h("div", { key: '42a89e09616f2d6b40637d70a2de569c41f04573', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'df64acc12d51e21453fbce45faef3220d67af0b1', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseTree.style = KulShowcaseTreeStyle0;

const component = 'upload';
const UPLOAD_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple upload component',
    },
    style: {
        ['data-description']: 'Upload component with custom style',
        ['data-dynamic']: 'custom',
    },
};
const UPLOAD_DOC = {
    nodes: [
        {
            children: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.0.0.0.0',
                                            value: 'The ',
                                        },
                                        {
                                            id: '0.0.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulUpload',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component is a customizable and reusable web component designed to handle file uploads.',
                                        },
                                    ],
                                    id: '0.0.0.0',
                                },
                            ],
                            id: '0.0.0',
                        },
                    ],
                    id: '0.0',
                    value: 'Overview',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            id: '0.2.0.0.0',
                                            value: 'To use the ',
                                        },
                                        {
                                            id: '0.2.0.0.1',
                                            tagName: 'strong',
                                            value: 'KulUpload',
                                        },
                                        {
                                            id: '0.2.0.0.2',
                                            value: ' component, include it in your HTML and optionally set the ',
                                        },
                                        {
                                            id: '0.2.0.0.3',
                                            tagName: 'strong',
                                            value: 'kulLabel',
                                        },
                                        {
                                            id: '0.2.0.0.4',
                                            value: " property to customize the button's label.",
                                        },
                                    ],
                                    id: '0.2.0.0',
                                },
                                {
                                    children: [
                                        {
                                            cells: {
                                                kulCode: {
                                                    shape: 'code',
                                                    kulLanguage: 'markup',
                                                    value: '<kul-upload></kul-upload>',
                                                },
                                            },
                                            id: '0.2.0.1.0',
                                            value: '',
                                        },
                                    ],
                                    id: '0.2.0.1',
                                },
                            ],
                            id: '0.2.0',
                            value: 'Basic Usage',
                        },
                    ],
                    id: '0.2',
                    value: 'Usage',
                },
                {
                    children: SHOWCASE_DOC.get.props(component),
                    id: '0.3',
                    value: 'Properties',
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '0.4.0.0',
                                    value: 'This event is emitted during various lifecycle stages of the component. It carries a payload of type ',
                                },
                                {
                                    id: '0.4.0.1',
                                    value: 'KulUploadEventPayload',
                                },
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    id: '0.4.0.2.0.0',
                                                    tagName: 'strong',
                                                    value: 'pointerdown',
                                                },
                                                {
                                                    id: '0.4.0.2.0.1',
                                                    value: ': emitted when as soon as the component is touched/clicked (before the click event).',
                                                },
                                            ],
                                            id: '0.4.0.2.0',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    id: '0.4.0.2.1.0',
                                                    tagName: 'strong',
                                                    value: 'ready',
                                                },
                                                {
                                                    id: '0.4.0.2.1.1',
                                                    value: ': emitted when the component completes its first complete lifecycle.',
                                                },
                                            ],
                                            id: '0.4.0.2.1',
                                            tagName: 'li',
                                            value: '',
                                        },
                                        {
                                            children: [
                                                {
                                                    id: '0.4.0.2.2.0',
                                                    tagName: 'strong',
                                                    value: 'upload',
                                                },
                                                {
                                                    id: '0.4.0.2.2.1',
                                                    value: ': emitted when new files are uploaded.',
                                                },
                                            ],
                                            id: '0.4.0.2.2',
                                            tagName: 'li',
                                            value: '',
                                        },
                                    ],
                                    id: '0.4.0.2',
                                    value: ', which includes information about the component and the event type.',
                                },
                            ],
                            cssStyle: DOC_STYLES.monoPrimaryH3,
                            id: '0.4.0',
                            tagName: 'strong',
                            value: 'kul-upload-event',
                        },
                    ],
                    id: '0.4',
                    value: 'Events',
                },
                {
                    children: SHOWCASE_DOC.get.methods(component),
                    id: '0.5',
                    value: 'Methods',
                },
                {
                    children: SHOWCASE_DOC.get.styles(component),
                    id: '0.7',
                    value: 'Styling',
                },
            ],
            id: '0',
            value: 'KulUpload',
        },
    ],
};

const kulShowcaseUploadCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}kul-upload{margin:auto}";
const KulShowcaseUploadStyle0 = kulShowcaseUploadCss;

const KulShowcaseUpload = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #dynamicExamples = [];
    #dynamicExampleManager = SHOWCASE_DYN_EXAMPLES;
    #interval;
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #prepExamples() {
        const elements = [];
        for (const key in UPLOAD_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(UPLOAD_EXAMPLES, key)) {
                const props = UPLOAD_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-upload", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }))));
            }
        }
        return elements;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentDidLoad() {
        if (this.#dynamicExamples.length > 0) {
            this.#interval = setInterval(() => {
                this.#dynamicExamples.forEach((comp) => {
                    switch (comp.dataset.dynamic) {
                        case 'custom':
                            comp.kulStyle =
                                this.#dynamicExampleManager.custom.get(comp.id);
                            break;
                    }
                });
            }, 500);
        }
    }
    render() {
        return (h(Fragment, { key: 'ec4d89ce33d7d7e4ae8265c73d227e5ed3c6d1a0' }, h("kul-article", { key: 'cb4d5380a6361a45a48d64731b4a56173f61bb08', kulData: UPLOAD_DOC }), h("div", { key: '80a65f65a07245473643b53ab445c5e2919c7e32', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: 'eac7633a1de144551db25a5968a0340d5689a4c8', class: "grid", "data-cy": KulDataCyAttributes.SHOWCASE_GRID_WRAPPER, part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseUpload.style = KulShowcaseUploadStyle0;

export { KulShowcase as kul_showcase, KulShowcaseArticle as kul_showcase_article, KulShowcaseBadge as kul_showcase_badge, KulShowcaseButton as kul_showcase_button, KulShowcaseCard as kul_showcase_card, KulShowcaseChart as kul_showcase_chart, KulShowcaseCode as kul_showcase_code, KulShowcaseDebug as kul_showcase_debug, KulShowcaseDrawer as kul_showcase_drawer, KulShowcaseHeader as kul_showcase_header, KulShowcaseImage as kul_showcase_image, KulShowcaseKulmanager as kul_showcase_kulmanager, KulShowcaseLazy as kul_showcase_lazy, KulShowcaseList as kul_showcase_list, KulShowcasePhotoframe as kul_showcase_photoframe, KulShowcaseSpinner as kul_showcase_spinner, KulShowcaseSplash as kul_showcase_splash, KulShowcaseSwitch as kul_showcase_switch, KulShowcaseTabbar as kul_showcase_tabbar, KulShowcaseTextfield as kul_showcase_textfield, KulShowcaseToast as kul_showcase_toast, KulShowcaseTree as kul_showcase_tree, KulShowcaseUpload as kul_showcase_upload };
