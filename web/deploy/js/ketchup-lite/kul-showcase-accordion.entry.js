import { r as registerInstance, g as getElement, h, F as Fragment } from './index-9570d2db.js';
import { D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';
import { S as SHOWCASE_DOC, a as SHOWCASE_DYN_EXAMPLES } from './kul-showcase-utils-273884d4.js';

const component = 'accordion';
const kulData = {
    nodes: [
        {
            id: '0',
            value: 'Item 1',
            icon: 'filter_1',
        },
        {
            id: '1',
            value: 'Item 2',
            icon: 'filter_2',
        },
        {
            id: '2',
            value: 'Item 3',
            icon: 'filter_3',
        },
        {
            id: '3',
            value: 'Item 4',
            icon: 'filter_4',
        },
    ],
};
const ACCORDION_EXAMPLES = {
    simple: {
        ['data-description']: 'Simple accordion',
        kulData,
    },
    style: {
        ['data-description']: 'Accordion with custom style',
        ['data-dynamic']: 'custom',
        kulData,
    },
};
const ACCORDION_DOC = {
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
                                            value: 'KulAccordion',
                                        },
                                        {
                                            id: '0.0.0.0.2',
                                            value: ' component allows users to toggle between hiding and showing large amounts of content.',
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
                                            value: 'KulAccordion',
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
                                            value: ' property with the JSON structure representing the accordion items.',
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
                                                    value: '<kul-accordion></kul-accordion>',
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
                                    value: 'KulAccordionEventPayload',
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
                            value: 'kul-accordion-event',
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
            value: 'KulAccordion',
        },
    ],
};

const kulShowcaseAccordionCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--template-columns:1fr;display:block;height:100%;width:100%}kul-accordion{margin:auto}.slot-content{background:var(--kul-background-color);color:var(--kul-text-color);padding:0.75em;text-align:center}@media (min-width: 768px){:host{--template-columns:1fr 1fr}}";
const KulShowcaseAccordionStyle0 = kulShowcaseAccordionCss;

const KulShowcaseAccordion = class {
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
        for (const key in ACCORDION_EXAMPLES) {
            if (Object.prototype.hasOwnProperty.call(ACCORDION_EXAMPLES, key)) {
                const props = ACCORDION_EXAMPLES[key];
                elements.push(h("div", { class: "example", part: "example" }, h("div", { class: "description", part: "description" }, props['data-description']), h("div", { class: "comp-wrapper", part: "comp-wrapper" }, h("kul-accordion", { key: key, id: key, ref: (el) => {
                        if (el && props['data-dynamic']) {
                            this.#dynamicExamples.push(el);
                        }
                    }, ...props }, h("slot", { slot: '0' }, h("div", { class: "slot-content" }, "First slot")), h("slot", { slot: '1' }, h("div", { class: "slot-content" }, "Second slot")), h("slot", { slot: '2' }, h("div", { class: "slot-content" }, "Third slot"))))));
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
        return (h(Fragment, { key: 'ae2eab412bd702b67025d590f1fca6a2f5b5f953' }, h("kul-article", { key: '5c9f9d6a88f56fcb92a165c321aa1c93286caff1', kulData: ACCORDION_DOC }), h("div", { key: '3e2c8fe5dc879f553760315fb83204641ffb740d', class: "examples-title", part: "examples-title" }, "Examples"), h("div", { key: '464ae215361f3efb49bba744def9cee4697c17b2', class: "grid", "data-cy": "wrapper", part: "grid" }, this.#prepExamples())));
    }
    disconnectedCallback() {
        clearInterval(this.#interval);
    }
};
KulShowcaseAccordion.style = KulShowcaseAccordionStyle0;

export { KulShowcaseAccordion as kul_showcase_accordion };
